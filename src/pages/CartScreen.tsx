import { useSelector } from "react-redux";
import { CartItem, RootState } from "../services/state/reducer";
import Navbar from "../components/Navbar";
import ArticlePreview from "../components/ArticlePreview";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import axios from "../services/api/axios";

export default function CartScreen() {
  const navigate = useNavigate();
  const cart: CartItem[] = useSelector((state: RootState) => {
    return state.cart;
  });

  const handleCheckout = async () => {
    const articles = cart.map((article) => ({
      articleId: article.article._id,
      quantity: article.quantity,
      price: article.article.price * article.quantity,
    }));
    await axios.post("/shop/order", articles, { withCredentials: true });
    navigate("/orders");
  };

  return (
    <div className="layout">
      <Navbar />
      <h1>{cart.length} Artikel im Warenkorb</h1>
      <div className="article_container">
        {cart.map((article) => (
          <ArticlePreview inCart article={article.article} key={article.article._id} />
        ))}
      </div>
      {cart.length > 0 ? (
        <>
          <hr />
          <div className="checkout">
            <h2>
              Preis insgesamt:{" "}
              {cart
                .map((article) => article.article.price * article.quantity)
                .reduce((total, current) => total + current, 0)
                .toFixed(2)}{" "}
              €
            </h2>
            <Button type="primary" onClick={handleCheckout}>
              Diese Artikel bestellen
            </Button>
          </div>
        </>
      ) : (
        <p>Du hast noch keine Artikel im Warenkorb.</p>
      )}
    </div>
  );
}
