import useDetectScroll from "hooks/useDetectScroll";
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Nav from "./gnb/Nav";
import Logo from "./Logo";
import Utils from "./Utils";

const HeaderStyle = styled.header<{ $isShowNav: boolean; $path: string; $scrollHeight: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.$isShowNav ? "360px" : "80px")};
  display: flex;
  justify-content: center;
  align-items: baseline;
  z-index: 2;
  overflow-y: hidden;
  background-color: ${(props) =>
    props.$isShowNav ? "#fff" : props.$path !== "/" ? "#000" : props.$scrollHeight > 100 ? "#000" : "transparent"};
  transition:
    height 0.25s ease-in-out,
    background-color 0.25s ease-in-out;
`;

const HeaderInnerStyle = styled.div<{ $isShowNav: boolean }>`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: baseline;
  justify-content: space-around;
  gap: 20px;
  &::after {
    content: "";
    position: absolute;
    top: 76px;
    left: 0;
    width: 100%;
    height: 1px;
    border-bottom: ${(props) => (props.$isShowNav ? "1px solid rgba(0, 0, 0, 0.1)" : "0")};
  }
`;

const Header = () => {
  const $path = useLocation().pathname;
  const [$isShowNav, setIsShowNav] = useState(false);
  const { $scrollHeight } = useDetectScroll();

  const debounce = useCallback((func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  }, []);

  const onMouseOverHandler = useCallback(
    debounce(() => {
      setIsShowNav(true);
    }, 60),
    []
  );

  const onMouseOutHandler = useCallback(
    debounce(() => {
      setIsShowNav(false);
    }, 60),
    []
  );

  return (
    <HeaderStyle
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      $isShowNav={$isShowNav}
      $path={$path}
      $scrollHeight={$scrollHeight}>
      <HeaderInnerStyle $isShowNav={$isShowNav}>
        <Logo $isShowNav={$isShowNav} />
        <Nav $isShowNav={$isShowNav} />
        <Utils $isShowNav={$isShowNav} />
      </HeaderInnerStyle>
    </HeaderStyle>
  );
};

export default React.memo(Header);
