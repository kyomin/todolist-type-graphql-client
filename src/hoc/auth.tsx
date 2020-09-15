import React from "react";
import { useQuery } from "@apollo/client";
import { AUTH } from "../queries/User";

/*
    매개변수 adminRoute의 기본값을 null로 정의. 인자로 안 넘겨주면 디폴트로 null을 갖는다.
    option == null  => 아무나 출입이 가능한 페이지
    option == ture  => 로그인한 유저만 출입이 가능한 페이지 (LandingPage, UpdatePage 등등)
    option == false => 로그인한 유저는 출입이 불가능한 페이지 (RegisterPage, LoginPage 등등)

    adminRoute를 추가적으로 이용하자. 
    관리자 페이지의 경우 adminRoute는 true일 것이고,
    서버에 getAuth 쿼리를 날려 받아온 role 유형을 가지고 분기를 하자.
    => 팔요 없다. 어차피 로그인 여부를 위해 auth를 날리면 그 정보에 role이 담겨오기 때문이다.
*/
export default function (
  SpecificComponent: any,
  option: boolean,
  adminRoute: any = null
) {
  function AuthenticationCheck(props: any) {
    /* 
        인증 과정 로직을 작성한다.

        loading : 쿼리 진행중
        error : 인증 실패
        data : 성공적으로 로그인한 USER 데이터 가져옴
    */
    const { loading, error, data } = useQuery(AUTH);

    // 서버 응답 대기
    if (loading) return <div>loading...</div>;

    // 인증 실패 => 로그인하지 않은 상태
    if (error) {
      // 로그인 안 했는데, 로그인한 유저만 출입이 가능한 페이지로 들어왔다면
      if (option) {
        alert(error.graphQLErrors[0].message);
        props.history.push("/login");
      }
    } else {
      // 로그인 한 상태이다.
      // 로그인을 했는데 로그인 페이지나 회원가입 페이지로 들어왔다면
      if (!option) props.history.push("/");
    }

    // 위의 인증을 다 거친 경우에만 해당 컴포넌트를 랜더링한다.
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
