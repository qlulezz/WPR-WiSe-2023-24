import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { CartItem, RootState, changeQuantity } from "../services/state/reducer";
import styles from "./QuantitySelector.module.css";
import { useDispatch } from "react-redux";

export default function QuantitySelector(props: CartItem) {
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (newValue) {
      dispatch(
        changeQuantity({
          article: props.article,
          quantity: parseInt(e.target.value),
        })
      );
      return;
    }
  };

  return (
    <div className={styles.content}>
      <label htmlFor="quantity">Menge:</label>
      <input
        type="number"
        name="quantity"
        className={styles.input}
        value={props.quantity}
        onChange={handleChange}
        min={1}
        max={999}
        onKeyDown={(event) => {
          event.preventDefault();
        }}
      />
    </div>
  );
}
