"use client";

import React, { useEffect } from "react";
import { urlToJson } from "../services/common.service";
import { postApi } from "../services/axios.service";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const GoogleRedirect = () => {
  const { login } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const payload = urlToJson(location.search);
        const response = await postApi("/auth/google/auth", payload);
        login(response.data);
        window.location.href = "/";
      } catch (e: any) {
        console.log(e);
        toast.error(e?.response?.data?.message || "Something went wrong!");
        window.location.href = "/";
      }
    })();
  }, [location, login]);

  return <div>Hello World redirect</div>;
};

export default GoogleRedirect;
