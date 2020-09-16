import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { Form, Input, Typography, Button } from "antd";
import { LoginSubmit } from "../../types/interface/User";
import { LOGIN } from "../../mutations/User";
import { loginUser } from "../../actions/User/userAction";

import "./LoginPage.scss";

const { Title } = Typography;

function LoginPage(props: any) {
  const [login] = useMutation(LOGIN); //  make mutation function
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (e: any) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e: any) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    try {
      /* Validation Check In Client */
      if (password.length < 8) {
        alert("패스워드가 너무 짧습니다. 8자 이상 입력해 주십시오.");
        return;
      }

      if (password.length > 20) {
        alert("패스워드가 너무 깁니다. 20자 이내로 작성해 주십시오.");
        return;
      }

      const dataToSubmit: LoginSubmit = {
        email,
        password,
      };

      await dispatch(loginUser(dataToSubmit, login));
      if (localStorage.getItem("token")) document.location.href = "/";
    } catch (err) {
      alert(err.graphQLErrors[0].message);
      console.error(err);
    }
  };

  return (
    <div className="login_page_wrap">
      <div className="login_container">
        <Title level={2} style={{ color: "#40a9ff" }}>
          Log In
        </Title>
        <form className="login_form" onSubmit={onSubmitHandler}>
          <Form.Item>
            <label>Email</label>
            <Input
              id="email"
              placeholder="이메일을 입력하십시오!"
              type="email"
              value={email}
              onChange={onEmailHandler}
              required
            />
          </Form.Item>

          <Form.Item>
            <label>Password</label>
            <Input
              id="password"
              placeholder="비밀번호를 입력하십시오!"
              type="password"
              value={password}
              onChange={onPasswordHandler}
              required
            />
          </Form.Item>
          <br />

          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </form>

        <a style={{ textDecoration: "none" }} href="/register">
          <Button className="register_btn">회원가입</Button>
        </a>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
