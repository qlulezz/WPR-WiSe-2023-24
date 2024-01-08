import { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import { CategoryType, SubcategoryType } from "../types/database";
import { useDispatch } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState, filterArticles } from "../services/state/reducer";

interface FilterProps {
  type: string;
  name: string;
  categories: CategoryType[];
  subcategories: SubcategoryType[];
}

export default function Filter(props: FilterProps) {
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("none");
  const [selectedSubcategory, setSelectedSubcategory] = useState("none");
  const [currentSubcategories, setCurrentSubcategories] = useState<SubcategoryType[]>([]);

  const handleInputCategory = (e: React.FormEvent<HTMLSelectElement>) => {
    const current = e.currentTarget.value;
    setSelectedCategory(current);

    if (current === "none") {
      setCurrentSubcategories([]);
      return;
    }

    const currentCategory = props.categories.find((cat) => cat._id === current);

    if (currentCategory && currentCategory.subcategoryIds.length > 0) {
      setCurrentSubcategories(
        currentCategory.subcategoryIds.map((id) =>
          props.subcategories.find((cat) => cat._id === id)
        ) as SubcategoryType[]
      );
    }
  };

  const handleInputSubcategory = (e: React.FormEvent<HTMLSelectElement>) => {
    const current = e.currentTarget.value;
    setSelectedSubcategory(current);
  };

  useEffect(() => {
    dispatch(
      filterArticles({
        categoryId: selectedCategory,
        subcategoryId: selectedSubcategory,
      })
    );
  }, [dispatch, selectedCategory, selectedSubcategory]);

  return (
    <div className={styles.content}>
      <label htmlFor="categories">Kategorie</label>
      <select
        name="categories"
        onInput={(e) => handleInputCategory(e)}
        className={styles.dropdown}
        value={selectedCategory}
      >
        <option value={"none"}>Alle</option>
        {props.categories.map((opt) => (
          <option value={opt._id} key={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>

      <label htmlFor="subcategories">Unterkategorie</label>
      <select
        name="subcategories"
        onInput={(e) => handleInputSubcategory(e)}
        className={styles.dropdown}
        value={selectedSubcategory}
      >
        <option value={"none"}>Alle</option>
        {currentSubcategories.map((opt) => (
          <option value={opt._id} key={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
