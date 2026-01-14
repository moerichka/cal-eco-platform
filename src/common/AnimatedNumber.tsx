import React from "react";
// import { useSpring, animated } from "react-spring";

const AnimatedNumber: React.FC<{
  n: number;
  from: number;
  decimals: number;
}> = ({ n, from, decimals }) => {
  // TODO: Enable animations
  // const { number } = useSpring({
  //   from: { number: from },
  //   number: n,
  //   delay: 200,
  //   config: { mass: 1, tension: 20, friction: 10 },
  // });
  // return (
  //   <animated.div>{number.to((num) => num.toFixed(decimals))}</animated.div>
  // );
  return <div>{n.toFixed(decimals)}</div>;
};

export default AnimatedNumber;
