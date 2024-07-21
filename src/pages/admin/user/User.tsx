import { Table } from "react-bootstrap";
import "./User.scss";
import { useEffect, useState } from "react";
import api from "@/api";
import type { User } from "../../../interface/User";
import Pagination from "@mui/material/Pagination";

export default function User() {
  //hien thi danh sach user
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    api.users.getAll().then((res) => {
      console.log("da vao", res.data);
      setUsers(res.data);
    });
  }, []);

  //sap xep user theo ten tang dang
  const userAscending = () => {
    api.users.userAscending().then((res) => {
      // console.log("da  asdadavao", res.data);
      setUsers(res.data);
    });
  };
  //sap xep user theo ten giam dan
  const userDescending = () => {
    api.users.userDescending().then((res) => {
      // console.log("da vao", res.data);
      setUsers(res.data);
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(event: any) {
    const value = event.target.value;
    if (value === "ascending") {
      userAscending();
    } else if (value === "descending") {
      userDescending();
    }
  }

  //tim kiem user theo ten
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any) => {
    setSearch(event.target.value);
  };
  const handleSearch = () => {
    api.users.userSearch(search).then((res) => {
      setUsers(res.data);
      // console.log("Search results:", res.data);
    });
  };
  //phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    api.users.userPagination(currentPage, 2).then((res) => {
      // console.log("da vao", res.data);
      setUsers(res.data.content);
      setTotalPage(res.data.totalPages);
      // console.log("totalPage", totalPage);
    });
  }, [currentPage]);
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  //chan user
  const userBlock = (id: number, roleName: string) => {
    if (roleName === "ROLE_ADMIN") {
      alert("Admin không thể chặn chính mình");
      return; // Dừng hàm nếu là admin
    }
    const isConfirm = window.confirm(
      "Bạn có chắc chắn muốn chặn user này không?"
    );
    if (!isConfirm) {
      return;
    }
    api.users
      .userBlock(id)
      .then((res) => {
        console.log("da vao", res.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div className="user_container">
      <select onChange={handleChange}>
        <option value="none">Sắp xếp</option>
        <option value="ascending"> Sắp xếp từ A-Z</option>
        <option value="descending"> Sắp xếp từ Z-A</option>
      </select>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleInputChange} // Update the search state as you type
        />
        <button onClick={handleSearch}>Search</button>
      </div>

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
              <td>{user.roles[0].roleName}</td>
              <td>{user.status ? "Active" : "Inactive"}</td>

              <td>{new Date(user.created_at).toLocaleDateString("en-GB")}</td>
              <td>{new Date(user.updated_at).toLocaleDateString("en-GB")}</td>
              <td>
                <button>Manager</button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => userBlock(user.id, user.roles[0].roleName)}
                >
                  {user.status ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        count={totalPage} // Use the calculated total pages
        page={currentPage} // Current page
        onChange={handlePageChange} // Handle page change
        shape="rounded"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </div>
  );
}
