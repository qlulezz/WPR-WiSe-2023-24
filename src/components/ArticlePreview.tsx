import styles from "./ArticlePreview.module.css";
import type { ArticleType, CategoryType, SubcategoryType } from "../types/database";
import { BASE_URL } from "../services/api/axios";
import { splitNumberDecimal } from "../utils/formatting";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import {
  CartItem,
  RootState,
  addArticleToCart,
  removeArticleFromCart,
} from "../services/state/reducer";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import QuanititySelector from "./QuantitySelector";

interface ArticlePreviewProps {
  article: ArticleType;
  inCart?: boolean;
  inOrders?: boolean;
}

export default function ArticlePreview(props: ArticlePreviewProps) {
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
    dispatch(addArticleToCart(props.article));
  };

  const removeFromCart = () => {
    dispatch(removeArticleFromCart(props.article));
  };

  const price = splitNumberDecimal(props.article.price);
  return (
    <div className={styles.article}>
      <Link to={"/article/" + props.article._id} className={styles.image}>
        <img src={`${BASE_URL}/images/shop/${props.article.href}`} alt={props.article.name} />
      </Link>

      <div className={styles.content}>
        <div className={styles.info}>
          <Link to={"/article/" + props.article._id} className={styles.title}>
            <p>{props.article.name}</p>
          </Link>
          {/* <p>{props.rating} / 5 Sterne</p> */}
          <p className={styles.description}>{props.article.shortdescription}</p>
          <p className={styles.sub}>
            in {categories.find((cat) => cat._id === props.article.categoryId)?.name}
            {props.article.subcategory
              ? " - " + subcategories.find((cat) => cat._id === props.article.subcategory)?.name
              : ""}
          </p>
        </div>
        <div className={styles.to_cart}>
          <p className={styles.price}>
            {price.before}
            <sup>{price.after}</sup> €
          </p>
          {props.inCart ? (
            <>
              <QuanititySelector
                {...cart.find((article) => article.article._id === props.article._id)!}
              />
              <CartButton onClick={removeFromCart} remove />
            </>
          ) : props.inOrders ? (
            <></>
          ) : (
            <>
              <p>Noch {props.article.quantity} verfügbar.</p>
              <CartButton
                onClick={addToCart}
                override={cart.find((article) => article.article._id === props.article._id)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
