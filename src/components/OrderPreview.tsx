import styles from "./OrderPreview.module.css";
import { ArticleType, OrderType } from "../types/database";
import { Link } from "react-router-dom";
import { BASE_URL } from "../services/api/axios";

interface OrderPreviewProps {
  orders: OrderType[];
  articles: ArticleType[];
}

export default function OrderPreview(props: OrderPreviewProps) {
  return (
    <>
      {props.orders.map((order) => (
        <div className={styles.order}>
          <h2>
            {order.orderNr} - Bestellung vom{" "}
            {new Date(order.orderDate).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </h2>
          <div className={styles.articles}>
            {order.articles.map((item) => {
              const article = props.articles.find((artcl) => artcl._id === item.articleId)!;
              return (
                <div className={styles.article}>
                  <Link to={"/article/" + article._id} className={styles.image}>
                    <img src={`${BASE_URL}/images/shop/${article.href}`} alt={article.name} />
                  </Link>
                  <h3>{article.name}</h3>
                  <p>Menge: {item.quantity}</p>
                  <p>Preis: {item.price} €</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
