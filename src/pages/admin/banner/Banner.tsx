import { useEffect, useState } from "react";
import "./Banner.scss";
import { Table } from "react-bootstrap";
import api from "@/api";
import type { Banner } from "@/interface/banner.interface";
import { Modal } from "antd";
import { fireBaseFn } from "@/firebase/firebase";

export default function Banner() {
  //hien thi danh sach banner
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  null;
  useEffect(() => {
    api.banner.getAll().then((res) => {
      setBanners(res.data);
    });
  }, []);
  //   console.log("banners", banners);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = {
      bannerName: formData.get("name") as string,
      image: await fireBaseFn.uploadToStorage(formData.get("image") as File),
      description: formData.get("description") as string,
    };

    if (currentBanner) {
      // Edit existing banner
      api.banner
        .editBanner(data, currentBanner.id)
        .then((res) => {
          setBanners(
            banners.map((banner) =>
              banner.id === currentBanner.id ? res.data : banner
            )
          );
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add new banner
      api.banner
        .addBanner(data)
        .then((res) => {
          setBanners([...banners, res.data]);
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showModal = () => {
    setCurrentBanner(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (banner: Banner) => {
    setCurrentBanner(banner);
    setIsModalOpen(true);
  };
  const handleChangeStatus = (id: number) => {
    api.banner
      .changeStatusBanner(id)
      .then(() => {
        setBanners(
          banners.map((banner) =>
            banner.id === id ? { ...banner, status: !banner.status } : banner
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id: number) => {
    window.confirm("Bạn có chắc chắn muốn xóa banner này không?");
    api.banner
      .deleteBanner(id)
      .then(() => {
        setBanners(banners.filter((banner) => banner.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="banner_container">
        <h1>Banner</h1>

        <button className="btn btn-primary" onClick={showModal}>
          Thêm banner mới
        </button>
        <Modal
          title={currentBanner ? "Edit Banner" : "Thêm banner mới"}
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <form onSubmit={handleSubmit}>
            <div className="modal-form">
              <div>
                <label htmlFor="name">Tên banner</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={currentBanner?.bannerName || ""}
                />
              </div>
              <div>
                <label htmlFor="image">Hình ảnh</label>
                <input type="file" id="image" name="image" />
              </div>
              <div>
                <label htmlFor="description">Mô tả</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  defaultValue={currentBanner?.description || ""}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </Modal>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Banner name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Create at</th>
              <th>Status</th>
              <th>tools</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{banner.bannerName}</td>
                <td>
                  <img
                    src={banner.image}
                    style={{
                      width: "150px",
                      height: "70px",
                    }}
                  />
                </td>
                <td>{banner.description}</td>
                <td>
                  {new Date(banner.created_at).toLocaleDateString("en-GB")}
                </td>
                <td>
                  <button
                    onClick={() => handleChangeStatus(banner.id)}
                    className={`btn ${
                      banner.status ? "btn-success" : "btn-danger"
                    }`}
                  >
                    {banner.status ? "Hiện" : "Ẩn"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(banner)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(banner.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
