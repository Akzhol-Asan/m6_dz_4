import { Breadcrumb, Button, Modal, Popconfirm } from "antd";
import { useAuthStore } from "../../store/authStore";
import {
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.scss";
import Products from "../../components/Products/Products";
import NewProductForm from "../../components/NewProductForm/NewProductForm";
import { useState } from "react";

export default function MainPage() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onAddNewProduct = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.main_page}>
      <div className={styles.navigation}>
        <div className={styles.navigations_sighn}>
          <h3>Navigation</h3>
        </div>

        <div className={styles.category}>
          <p>No categories yet</p>
        </div>
      </div>

      <div className={styles.main_bock}>
        <div className={styles.header}>
          <span>{user?.email}</span>
          <UserOutlined />
          <Popconfirm
            title="Logout"
            description="Are you sure you want to logout?"
            onConfirm={onLogout}
            okText="Yes"
            cancelText="no"
          >
            <LogoutOutlined className={styles.logout} />
          </Popconfirm>
        </div>

        <div className={styles.products_block}>
          <Breadcrumb
            items={[
              { href: "#", title: <HomeOutlined /> },
              { href: "#", title: "MainPage" },
              { title: "Products" },
            ]}
          />

          <div className={styles.products_list}>
            <div className={styles.products_list_header}>
              <h3 className={styles.products_sighn}>Products</h3>
              <Button
                onClick={onAddNewProduct}
                type="primary"
                icon={<PlusOutlined />}
              >
                Add new Product
              </Button>
            </div>
            <Products />
          </div>
        </div>
      </div>

      <Modal
        title="Add new Product"
        open={isModalOpen}
        onCancel={onCloseModal}
        footer={null}
      >
        <NewProductForm onSuccess={onCloseModal} />
      </Modal>
    </div>
  );
}
