import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button } from "antd";
import { RootState } from "../../../reducers";
import { UserInfo } from "../../../types/interface/User";
import { GET_ALL_USERS } from "../../../queries/User";
import { DELETE_USER } from "../../../mutations/User";

import {
  getAllUsers,
  deleteUserAction,
} from "../../../actions/User/userAction";

import "./UserList.scss";

const { Title } = Typography;

function UserList() {
  const { error, data } = useQuery(GET_ALL_USERS);
  const [deleteUser] = useMutation(DELETE_USER); // make mutation function
  const dispatch = useDispatch();
  const userState: any = useSelector((state: RootState) => state.User);
  const userList: UserInfo[] | undefined = userState.allUsers;

  useEffect(() => {
    if (data) {
      dispatch(getAllUsers(data.allUsers));
    }
  }, [data]);

  // user 목록 불러오기 실패 !!
  if (error) {
    console.error(error);
    if (error.graphQLErrors[0]) alert(error.graphQLErrors[0].message);
  }

  const drawUserList = () => {
    if (userList) {
      return userList.map((user: UserInfo, idx: number) => {
        return (
          <div key={idx} className="user_wrap">
            <span className="user_id">{user.id}</span>
            <div className="user_email">{user.email}</div>
            <div className="user_name">{user.name}</div>
            <Button
              className="delete_btn"
              onClick={() => handleDelete(user.id)}
            >
              삭제
            </Button>
          </div>
        );
      });
    } else {
      return <Fragment></Fragment>;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (typeof id === "string")
        await dispatch(deleteUserAction(parseFloat(id), deleteUser));
      else await dispatch(deleteUserAction(id, deleteUser));

      window.location.reload(false);
    } catch (err) {
      console.error(err);
      alert("user 삭제에 실패했습니다 !");
    }
  };

  return (
    <div>
      <div className="admin_user_list_wrap">
        <div className="container">
          <Title level={2} style={{ color: "#40a9ff", textAlign: "center" }}>
            User Delete Management
          </Title>
          {drawUserList()}
        </div>
      </div>
    </div>
  );
}

export default withRouter(UserList);
