import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Form, Input, Typography, Button } from "antd";
import { UPDATE_PASSWORD } from "../../mutations/User";

import "./UpdatePage.scss";

const { Title } = Typography;

function UpdatePage(props: any) {
  /* make mutation function */
  const [update] = useMutation(UPDATE_PASSWORD);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const onNewPasswordHandler = (e: any) => {
    setNewPassword(e.currentTarget.value);
  };

  const onConfirmNewPasswordHandler = (e: any) => {
    setConfirmNewPassword(e.currentTarget.value);
  };

  //    클라이언트에서 기존 계정으로 접속했던 토큰을 삭제한다.
  const onLogoutHandler = () => {
    localStorage.removeItem("token");
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    try {
      /* Validation Check In Client */
      if (newPassword !== confirmNewPassword) {
        alert("새 비밀번호 확인을 정확히 해주십시오!");
        return;
      }

      if (newPassword.length < 8) {
        alert("패스워드가 너무 짧습니다. 8자 이상 입력해 주십시오.");
        return;
      }

      if (newPassword.length > 20) {
        alert("패스워드가 너무 깁니다. 20자 이내로 작성해 주십시오.");
        return;
      }

      const response = await update({
        variables: {
          newPassword: newPassword,
        },
      });

      onLogoutHandler();
      alert(
        "비밀번호 변경이 완료되었습니다. \n 새 비밀번호로 다시 로그인 해 주십시오!"
      );
      props.history.push("/login");
    } catch (err) {
      alert(err.graphQLErrors[0].message);
      console.error(err);
      props.history.push("/login");
    }
  };

  return (
    <div className="update_page_wrap">
      <div className="update_container">
        <Title level={2} style={{ color: "#40a9ff" }}>
          비밀번호 변경
        </Title>
        <form className="update_form" onSubmit={onSubmitHandler}>
          <Form.Item>
            <label>새 비밀번호</label>
            <Input
              id="new_password"
              placeholder="새 비밀번호를 입력하십시오!"
              type="password"
              value={newPassword}
              onChange={onNewPasswordHandler}
              required
            />
          </Form.Item>

          <Form.Item>
            <label>새 비밀번호 확인</label>
            <Input
              id="confirm_new_password"
              placeholder="새 비밀번호를 다시 입력하십시오!"
              type="password"
              value={confirmNewPassword}
              onChange={onConfirmNewPasswordHandler}
              required
            />
          </Form.Item>
          <br />

          <Button type="primary" htmlType="submit">
            비밀번호 변경
          </Button>
        </form>

        <a style={{ textDecoration: "none" }} href="/">
          <Button className="cancel_btn">취소</Button>
        </a>
      </div>
    </div>
  );
}

export default withRouter(UpdatePage);
