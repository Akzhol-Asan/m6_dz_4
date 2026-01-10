import { Alert, Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, logout } = useAuthStore();

  const submit = async (values) => {
    const success = await login(values);
    if (success) {
      navigate("/");
    }
  };

  const onRegisterNewAccount = async () => {
    await logout();
    navigate("/register");
  };

  return (
    <div className="form">
      <h2>Login</h2>
      {error && (
        <Alert
          showIcon
          style={{ textAlign: "center", marginBottom: "20px" }}
          title={
            <span>
              {error} <FrownOutlined />
            </span>
          }
          type="error"
        />
      )}
      <Form name="basic" onFinish={submit} autoComplete="off">
        <FormItem
          label="email"
          layout="vertical"
          name="email"
          rules={[{ required: true, message: "email is required" }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label="password"
          layout="vertical"
          name="password"
          rules={[{ required: true, message: "password is required" }]}
        >
          <Input.Password />
        </FormItem>

        <FormItem>
          <Button
            className="button"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Login
          </Button>
        </FormItem>

        <FormItem>
          <Button
            type="link"
            style={{ width: "100%", textAlign: "center" }}
            onClick={onRegisterNewAccount}
          >
            Register new account
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
