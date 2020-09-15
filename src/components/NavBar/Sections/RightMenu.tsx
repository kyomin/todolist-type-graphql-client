import React, { Fragment, useEffect, useState } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";

function RightMenu(props: any) {
  const onLogoutHandler = () => {
    localStorage.removeItem("token");
  };

  // 로그인 한 사람들
  if (localStorage.getItem("token")) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="update">
          <a href="/update">비밀번호 변경</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={onLogoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    // 로그인 안 한 사람들
    return <Fragment></Fragment>;
  }
}

export default withRouter(RightMenu);
