import { Breadcrumb, Button } from "antd";
import { useAuthStore } from "../../store/authStore";
import {
  DownOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.scss";
import Products from "../../components/Products/Products";

export default function MainPage() {
  const navigate = useNavigate();

  const { user, logout, isLoading } = useAuthStore();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className={styles.main_page}>
      <div className={styles.navigation}>
        <h3>Navigation</h3>

        <div className={styles.category}>
          <p>No categories yet</p>
        </div>
      </div>

      <div className={styles.main_bock}>
        <div className={styles.header}>
          <span>{user?.email}</span>
          <UserOutlined />
          <LogoutOutlined onClick={onLogout} className={styles.logout} />
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
            <h3 className={styles.products_sighn}>Products</h3>
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
}
