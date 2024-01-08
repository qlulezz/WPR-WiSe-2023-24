import { useEffect, useState } from "react";
import styles from "./CartButton.module.css";
import Button from "./ui/Button";
import { CartItem } from "../services/state/reducer";

interface CartButtonProps {
  onClick: () => void;
  override?: CartItem;
  remove?: boolean;
}

export default function CartButton(props: CartButtonProps) {
  const [activated, setActivated] = useState<boolean>(false);

  useEffect(() => {
    if (props.override) {
      setActivated(true);
    }
  }, [props.override]);

  const handleClick = () => {
    setActivated(true);
    props.onClick();
  };

  return (
    <div className={`${styles.cart_btn} ${activated && styles.activated}`}>
      <div className={styles.btn}>
        <Button type="secondary" onClick={() => handleClick()}>
          {!props.remove ? (
            <p>In den Warenkorb</p>
          ) : (
            <>
              <p>Entfernen</p>
              <i className="fas fa-trash"></i>
            </>
          )}
        </Button>
      </div>
      <div className={styles.message}>
        <p>Im Warenkorb</p>
        <i className="fas fa-check"></i>
      </div>
    </div>
  );
}
