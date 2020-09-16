import React, { Fragment } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

function RightMenu(props: any) {
  /* 
    리덕스 스토어에 저장된 데이터 key 네임은 서버 리졸버의 이름을 참조한다.
    해당 데이터를 가져오려면 state.User.userData.auth로 가져와야 한다.
    참고로 userData는 User리듀서에서 지정해서 return한 것이다.
    단, undefined일 경우 참조하는 것은 오류를 발생하므로 조건 분기를 정확히 한다.
  */
  const userState: any = useSelector((state: RootState) => state.User);
  const userData: any = userState.userData;

  const onLogoutHandler = async () => {
    await localStorage.removeItem("token");
    await alert("로그아웃 되었습니다.");
    document.location.href = "/login";
  };

  // 로그인 한 사람들
  if (userData) {
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
