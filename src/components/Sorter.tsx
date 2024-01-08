import { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import { RootState, sortArticles } from "../services/state/reducer";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

interface SorterProps {
  type: string;
  options: string[];
}

export default function Sorter(props: SorterProps) {
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();

  const [selectedSorter, setSelectedSorter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("asc");

  const handleInputSorter = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    setSelectedSorter(e.currentTarget.value);
  };

  const handleInputOrder = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    setSelectedOrder(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(
      sortArticles({
        sortBy: selectedSorter,
        order: selectedOrder,
      })
    );
  }, [dispatch, selectedOrder, selectedSorter]);

  return (
    <div className={styles.content}>
      <label htmlFor="sortby">Sortieren nach</label>
      <select
        name="sortby"
        onInput={(e) => handleInputSorter(e)}
        className={styles.dropdown}
        value={selectedSorter}
      >
        {props.options.map((opt) => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </select>

      <select
        name="order"
        onInput={(e) => handleInputOrder(e)}
        className={styles.dropdown}
        value={selectedOrder}
      >
        <option value={"asc"}>Aufsteigend</option>
        <option value={"desc"}>Absteigend</option>
      </select>
    </div>
  );
}
