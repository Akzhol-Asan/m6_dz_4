import { Alert, Button, Form, Input, Select } from "antd";
import { useProductsStore } from "../../store/productsStore";
import { useEffect } from "react";
const { Option } = Select;

export default function NewProductForm({ onSuccess }) {
  const [form] = Form.useForm();
  const {
    isLoading,
    error,
    addProduct,
    getProducts,
    getCategories,
    categories,
  } = useProductsStore();

  useEffect(() => {
    getCategories();
  }, []);

  const submit = async (values) => {
    const success = await addProduct(values);
    if (success) {
      await getProducts();
      form.resetFields();
      onSuccess();
    }
  };
  return (
    <div>
      {error && (
        <Alert
          showIcon
          style={{ textAlign: "center", marginBottom: "20px" }}
          title={
            <span>
              {error} <FrownOutlined />
            </span>
          }
        />
      )}
      <Form form={form} name="basic" onFinish={submit} autoComplete="off">
        <Form.Item
          label="Product title"
          layout="vertical"
          name="title"
          rules={[{ required: true, message: "Fill the title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product description"
          layout="vertical"
          name="description"
          rules={[{ required: true, message: "Fill the description" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product category"
          layout="vertical"
          name="categoriesId"
        >
          <Select>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            className="button"
            type="primary"
            loading={isLoading}
            htmlType="submit"
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
