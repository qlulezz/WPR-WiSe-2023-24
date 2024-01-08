import type { PropsWithChildren, MouseEvent } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
  type: "primary" | "secondary";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[props.type]}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
