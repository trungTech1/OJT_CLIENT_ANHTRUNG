import { Table } from "react-bootstrap";
import "./User.scss";

export default function User() {
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
            <th>isVerified</th>
            <th>createAt</th>
            <th>updateAt</th>
            <th>Permisson</th>
            <th>tools</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>JohnDoe</td>
            <td>johndoe@example.com</td>
            <td>1234567890</td>
            <td>
              <img
                src="avatar_url_here"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            </td>
            <td>admin</td>
            <td>hoạt động</td>
            <td>đã xác thực mail</td>
            <td>1 - 1 - 2023</td>
            <td>2 - 1 - 2023</td>
            <td>
              <button>Manager</button>
            </td>
            <td>
              <button className="btn btn-danger">block</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>JohnDoe</td>
            <td>johndoe@example.com</td>
            <td>1234567890</td>
            <td>
              <img
                src="avatar_url_here"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            </td>
            <td>admin</td>
            <td>hoạt động</td>
            <td>đã xác thực mail</td>
            <td>1 - 1 - 2023</td>
            <td>2 - 1 - 2023</td>
            <td>
              <button>Manager</button>
            </td>
            <td>
              <button className="btn btn-danger">block</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>JohnDoe</td>
            <td>johndoe@example.com</td>
            <td>1234567890</td>
            <td>
              <img
                src="avatar_url_here"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            </td>
            <td>admin</td>
            <td>hoạt động</td>
            <td>đã xác thực mail</td>
            <td>1 - 1 - 2023</td>
            <td>2 - 1 - 2023</td>
            <td>
              <button>Manager</button>
            </td>
            <td>
              <button className="btn btn-danger">block</button>
            </td>
          </tr>
          {/* <!-- Add more rows as needed with static data --> */}
        </tbody>
      </Table>
    </div>
  );
}
