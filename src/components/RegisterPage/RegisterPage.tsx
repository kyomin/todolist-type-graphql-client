import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { Form, Input, Typography, Button } from "antd";
import { registerUser } from "../../actions/User/userAction";
import { RegisterSubmit } from "../../interface/User";
import { REGISTER } from "../../mutations/User";

import "./RegisterPage.scss";

const { Title } = Typography;

function RegisterPage(props: any) {
  /* make mutation function */
  const [register] = useMutation(REGISTER);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e: any) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e: any) => {
    setPassword(e.currentTarget.value);
  };

  const onNameHandler = (e: any) => {
    setName(e.currentTarget.value);
  };

  const onConfirmPasswordHandler = (e: any) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();

    try {
      /* Validation Check In Client */
      if (name.length < 1) {
        alert("이름은 1글자 이상 입력해야 합니다.");
        return;
      }

      if (password.length < 8) {
        alert("패스워드가 너무 짧습니다. 8자 이상 입력해 주십시오.");
        return;
      }

      if (password.length > 20) {
        alert("패스워드가 너무 깁니다. 20자 이내로 작성해 주십시오.");
        return;
      }

      if (password !== confirmPassword) {
        alert("비밀번호 확인을 정확히 해주십시오!");
        return;
      }

      const dataToSubmit: RegisterSubmit = {
        email,
        password,
        name,
      };

      const result = await dispatch(registerUser(dataToSubmit, register));

      alert(
        `${result.payload.name}님 반갑습니다. \n 회원가입을 성공적으로 마쳤습니다.`
      );
      props.history.push("/");
    } catch (err) {
      alert(err.graphQLErrors[0].message);
      console.error(err);
    }
  };

  return (
    <div className="register_page_wrap">
      <div className="register_container">
        <Title level={2} style={{ color: "#40a9ff" }}>
          Register
        </Title>
        <form className="register_form" onSubmit={onSubmitHandler}>
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
            <label>Name</label>
            <Input
              id="name"
              placeholder="이름을 입력하십시오!"
              type="text"
              value={name}
              onChange={onNameHandler}
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

          <Form.Item>
            <label>Confirm Password</label>
            <Input
              id="confirm_password"
              placeholder="비밀번호를 확인하십시오!"
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
              required
            />
          </Form.Item>
          <br />

          <Button type="primary" htmlType="submit">
            회원가입
          </Button>
        </form>

        <a style={{ textDecoration: "none" }} href="/login">
          <Button className="cancel_btn">취소</Button>
        </a>
      </div>
    </div>
  );
}

export default withRouter(RegisterPage);
