import React from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { AUTH } from "../queries/User";
import { authUser } from "../actions/User/userAction";
import { RoleStatus } from "../types/enum/User";

export default function (SpecificComponent: any) {
  function AdminCheck() {
    const { error, data } = useQuery(AUTH);
    const dispatch = useDispatch();

    // 인증 실패 => 로그인하지 않은 상태
    if (error) {
      console.error(error);
      alert(error.graphQLErrors[0].message);
      document.location.href = "/login";
    }

    /* 
        쿼리가 성공적으로 서버로부터 데이터를 불러왔다.
        그리고 이는 곧 로그인을 한 상태이다.
        리덕스 스토어에 해당 유저 데이터를 저장해 주자.
    */
    if (data) {
      dispatch(authUser(data.auth));

      // 로그인을 했으며, 관리자 페이지로 들어왔는데 관리자가 아니라면
      if (data.auth.role !== RoleStatus.ADMIN) {
        alert("접근 권한이 없습니다");
        document.location.href = "/";
      }
    }

    // 위의 인증을 다 거친 경우에만 해당 컴포넌트를 랜더링한다.
    return <SpecificComponent />;
  }

  return AdminCheck;
}
