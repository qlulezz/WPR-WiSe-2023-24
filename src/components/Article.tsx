import styles from "./Article.module.css";
import { BASE_URL } from "../services/api/axios";
import { ArticleType, CategoryType, SubcategoryType } from "../types/database";
import { splitNumberDecimal } from "../utils/formatting";
import { CartItem, RootState, addArticleToCart } from "../services/state/reducer";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "./CartButton";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

export default function Article(props: ArticleType) {
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();

  const categories: CategoryType[] = useSelector((state: RootState) => {
    return state.categories;
  });
  const subcategories: SubcategoryType[] = useSelector((state: RootState) => {
    return state.subcategories;
  });
  const cart: CartItem[] = useSelector((state: RootState) => {
    return state.cart;
  });

  const addToCart = () => {
    dispatch(addArticleToCart(props));
  };

  return (
    <div className={styles.article}>
      <div className={styles.content}>
        <div className={styles.img_container}>
          <img src={`${BASE_URL}/images/shop/${props.href}`} alt={props.name} />
        </div>
        <div className={styles.intro}>
          <h1>{props.name}</h1>
          <p className={styles.sub}>
            in {categories.find((cat) => cat._id === props.categoryId)?.name}
            {props.subcategory
              ? " - " + subcategories.find((cat) => cat._id === props.subcategory)?.name
              : ""}
          </p>
          <p className={styles.short}>{props.shortdescription}</p>
        </div>
        <div className={styles.to_cart}>
          <p className={`${styles.title} ${styles.price}`}>
            {splitNumberDecimal(props.price).before}
            <sup>{splitNumberDecimal(props.price).after}€</sup>
          </p>
          <p>Noch {props.quantity} verfügbar.</p>
          {!cart.find((article) => article.article._id === props._id) ? (
            <CartButton onClick={addToCart} />
          ) : (
            <Link to="/cart">
              <Button type="primary">Im Warenkorb ansehen</Button>
            </Link>
          )}
        </div>
      </div>
      <p>{props.description}</p>
    </div>
  );
}
