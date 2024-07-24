/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "./Category.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import AddModal from "./add/CategoryAdd";
import {categoryActions} from "@/store/slices/category.slice";
import type { Category } from "@/store/slices/category.slice";
import api from "@/api";
import { Modal } from "antd";


export default function Category() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedCategory, setSelectedCategory] = useState <Category | null>(null);
  const categoryStore = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch(); 

  const handleAddCategory = () => {
    setModalMode("add");
    setSelectedCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category : Category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleSetCategory = (id: number) => {
    api.categories.setStatusCategory(id)
    .then(() => {
      dispatch(categoryActions.fecthCategories() as any);
    })
    .catch((err) => {
      console.log(err);
    });
  }


  return (
    <>
     
       <div className="category-list">
       <AddModal 
         show={showModal}
         handleClose={() => setShowModal(false)}
         mode={modalMode}
         category={selectedCategory}
      />
      <div className="search-bar">
        
        <h1>Category</h1>
        <div>
          <input type="text" placeholder="Search for category" />
          <button
          className="search-btn btn btn-primary"
            style={{
              marginLeft: "10px",
            }}
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <h2>All Categories</h2>

      <button className="add-category-btn"
      onClick={handleAddCategory}
      >Add Category</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            categoryStore.data?.map(
              (category,index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td >
                    <img src={category.image} alt={category.name}  style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}/>
                  </td>
                  <td>{category.status ? "Đang bán" : "Ngừng bán"}</td>
                  <td>
                    <button className="edit-btn"
                    onClick={() => handleEditCategory(category)}>Edit</button>
                    {
                      category.status ? (
                        <button className="delete-btn"  
                    onClick={() => {
                     Modal.confirm({
                      title: 'Delete category',
                      content: 'Bạn có chắc muốn xóa category?',
                      onOk() {
                        handleSetCategory(category.id);
                        dispatch(categoryActions.fecthCategories() as any);
                      },
                      onCancel() {
                        console.log('Cancel');
                      },
                    });
                    }}
                    >Delete</button>
                      ) : (
                        <button className="btn btn-success"  onClick={
                          () => handleSetCategory(category.id)
                        }>Enable</button>
                      )
                    }
                    
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <button>Prev</button>
        <span> Page 1 of 10 </span>
        <button>Next</button>
      </div>
    </div>
   
    </>
 
  );
}
