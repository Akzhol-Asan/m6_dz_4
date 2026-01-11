import { Button, Card, Masonry } from "antd";
import { useProductsStore } from "../store/productsStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function ProductsPage() {
  const { products, getProducts, isLoading, error } = useProductsStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <Button
        onClick={goBack}
        className="go_back"
        type="primary"
        icon={<ArrowLeftOutlined />}
      >
        Go back
      </Button>
      <div className="products">
        {products.map((product) => (
          <Card
            className="product_card"
            key={product.id}
            size="small"
            cover={
              <img
                src={
                  product.image ||
                  "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
                }
                alt={product.title}
              />
            }
          >
            <h3>{product.title}</h3>
            <span>{product.categories?.title || "no category"}</span>
            <p>Описание: {product.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
