const jwt = require('jsonwebtoken');
const ethUtil = require('ethereumjs-util');
const bcrypt = require('bcrypt');
const config = require('../config');
const UserModel = require('../models/user.model');
const {
  successResponse,
  errorResponse,
  validationErrorResponse,
} = require('../utils/response');
const logger = require('../utils/logger');

const LOGIN_MESSAGE = 'Login Quant Fund';
const SALT_ROUNDS = 12;

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user.id, address: user.address, email: user.email },
    config.JWT_SECRET_KEY,
    { expiresIn: config.SESSION_EXPIRES_IN }
  );
  return token;
};

const verifyWalletAddress = async (
  publicAddress,
  signature,
  message = LOGIN_MESSAGE
) => {
  try {
    const msgBuffer = Buffer.from(message, 'utf8');
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(signature);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
    const publicKey = ethUtil.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s
    );
    const addressBuffer = ethUtil.publicToAddress(publicKey);
    const address = ethUtil.bufferToHex(addressBuffer);
    return address.toLowerCase() === publicAddress.toLowerCase();
  } catch (error) {
    logger.error('Wallet verification error:', error);
    return false;
  }
};

exports.loginWithSignature = async (req, res, next) => {
  try {
    const { address, signature, referral_address } = req.body;

    if (!address || !signature) {
      const { response, statusCode } = validationErrorResponse(
        'Address and signature are required'
      );
      return res.status(statusCode).json(response);
    }

    // Check if address is blocked
    if (config.blockedAddresses.includes(address.toLowerCase())) {
      const { response, statusCode } = errorResponse(
        'This address is blocked',
        403
      );
      return res.status(statusCode).json(response);
    }

    const isValid = await verifyWalletAddress(address, signature);
    if (!isValid) {
      const { response, statusCode } = errorResponse(
        'Wallet signature verification failed',
        401
      );
      return res.status(statusCode).json(response);
    }

    let users = await UserModel.getUsersDetailsAddress({ address });

    if (users.length === 0) {
      let referralId = null;
      if (referral_address) {
        const refUsers = await UserModel.getUserDetailsByAddress(
          referral_address
        );
        if (refUsers.length === 0) {
          const { response, statusCode } = validationErrorResponse(
            'Invalid referral code'
          );
          return res.status(statusCode).json(response);
        }
        referralId = refUsers[0].id;
      }

      const referralCode =
        'REF' + Math.random().toString(36).substr(2, 5).toUpperCase();
      const saved = await UserModel.saveUserAddressDetails({
        address,
        referral_id: referralId,
        referral_code: referralCode,
      });
      users = [
        {
          id: saved.insertId,
          address,
          referral_code: referralCode,
          is_admin: 0,
        },
      ];
    }

    const user = users[0];
    const token = generateToken(user);

    const { response, statusCode } = successResponse(
      {
        id: user.id,
        address: user.address,
        email: user.email,
        referral_code: user.referral_code,
        authToken: token,
        is_admin: user.is_admin,
      },
      'Login successful'
    );

    return res.status(statusCode).json(response);
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  let user = await UserModel.createUser({
    email,
    first_name: firstName,
    last_name: lastName,
    password: hashedPassword,
  });

  const { response, statusCode } = successResponse(
    user,
    'Registration successful'
  );
  return res.status(statusCode).json(response);
};

exports.loginWithPassword = async (req, res, next) => {
  const { email, password } = req.body;

  const users = await UserModel.getUsersByEmail(email);
  const user = users[0];

  if (!user) {
    const { response, statusCode } = errorResponse('User not found', 404);
    return res.status(statusCode).json(response);
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const { response, statusCode } = errorResponse('Invalid password', 401);
    return res.status(statusCode).json(response);
  }

  const token = generateToken(user);
  const { response, statusCode } = successResponse(
    {
      id: user.id,
      address: user.address,
      email: user.email,
      referral_code: user.referral_code,
      authToken: token,
      is_admin: user.is_admin,
    },
    'Login successful'
  );
  return res.status(statusCode).json(response);
};

exports.me = async (req, res, next) => {
  try {
    const { response, statusCode } = successResponse({
      id: req.user_id,
      address: req.address,
    });
    return res.status(statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (_req, res) => {
  const { response, statusCode } = errorResponse('Not implemented', 501);
  return res.status(statusCode).json(response);
};

exports.logout = async (_req, res) => {
  const { response, statusCode } = successResponse(null, 'Logout successful');
  return res.status(statusCode).json(response);
};
