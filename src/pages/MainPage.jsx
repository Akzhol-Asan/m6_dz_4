import { Button } from "antd";
import { useAuthStore } from "../store/authStore";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const { user, logout, isLoading } = useAuthStore();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="main_page">
      <div>
        <span>Welcome</span>
        <span className="user_name">{user?.username}</span>
      </div>
      <Button
        className="button"
        type="primary"
        danger
        loading={isLoading}
        onClick={onLogout}
      >
        Logout <LogoutOutlined />
      </Button>
    </div>
  );
}
