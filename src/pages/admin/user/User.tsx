import { Table } from "react-bootstrap";
import "./User.scss";
import { useEffect, useState } from "react";
import api from "@/api";
import type { User } from "../../interface/User";
export default function User() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    api.user.getAll().then((res) => {
      console.log("da vao", res.data);
      setUsers(res.data);
    });
  }, []);
  return (
    <div className="user_container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Avatar</th>
            <th>Role</th>
            <th>Status</th>
            <th>createAt</th>
            <th>updateAt</th>
            <th>Permisson</th>
            <th>tools</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <img
                  src={user.avatar}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{user.roles}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>

              <td>{new Date(user.created_at).toLocaleDateString("en-GB")}</td>
              <td>{new Date(user.updated_at).toLocaleDateString("en-GB")}</td>
              <td>
                <button>Manager</button>
              </td>
              <td>
                <button className="btn btn-danger">block</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
