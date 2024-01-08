import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { RootState, User, loadArticles, loadOrders } from "../services/state/reducer";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { ArticleType, OrderType } from "../types/database";
import OrderPreview from "../components/OrderPreview";

export default function OrderScreen() {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();
  const user: User = useSelector((state: RootState) => {
    return state.user;
  });
  const orders: OrderType[] = useSelector((state: RootState) => {
    return state.orders;
  });
  const articles: ArticleType[] = useSelector((state: RootState) => {
    return state.articles;
  });

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
    dispatch(loadArticles());
    dispatch(loadOrders());
  }, [navigate, user.email, dispatch]);

  return (
    <div className="layout">
      <Navbar />
      <h1>Deine Bestellungen</h1>
      <div className="user_container">
        <p>Angemeldet als: {user.email}</p>
        <Button type="secondary">
          <Link to="/logout">Abmelden</Link>
        </Button>
      </div>
      <div className="article_container">
        {orders.length > 0 && articles.length > 0 && (
          <OrderPreview orders={orders} articles={articles} />
        )}
      </div>
    </div>
  );
}
