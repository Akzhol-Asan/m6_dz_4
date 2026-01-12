import { FrownOutlined } from "@ant-design/icons";
import { useAuthStore } from "../store/authStore";
import { Alert, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, isLoading, error } = useAuthStore();

  const navigate = useNavigate();

  const submit = async (values) => {
    const success = await register(values);
    if (success) navigate("/");
  };

  const onLogin = async () => {
    navigate("/login");
  };

  return (
    <div className="form">
      <h2>Register</h2>

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
        <Form.Item
          layout="vertical"
          label="username"
          name="username"
          rules={[{ required: true, message: "User name is Required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label="email"
          name="email"
          rules={[{ required: true, message: "Email is Required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label="password"
          name="password"
          rules={[{ required: true, message: "Passowrd is Required" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            className="button"
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Register
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            style={{ width: "100%", textAlign: "center" }}
            onClick={onLogin}
          >
            I have an account, Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
