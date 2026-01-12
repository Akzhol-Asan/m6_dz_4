import { Card } from "antd";
import { useEffect } from "react";
import { useProductsStore } from "../../store/productsStore";
import styles from "./Products.module.scss";

export default function Products() {
  const { products, getProducts, isLoading, error } = useProductsStore();

  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      <div className={styles.products}>
        {products.map((product) => (
          <Card
            className={styles.product_card}
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
