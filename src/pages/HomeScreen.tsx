import Navbar from "../components/Navbar";
import styles from "../components/Filter.module.css";
import { useEffect } from "react";
/* import axios from "../services/api/axios"; */
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { UnknownAction } from "redux";
import {
  /* filterArticles, */ loadArticles,
  loadCategories,
  loadSubCategories,
} from "../services/state/reducer";
import type { RootState } from "../services/state/reducer";
import type { ArticleType, CategoryType, SubcategoryType } from "../types/database";
import ArticlePreview from "../components/ArticlePreview";
import Filter from "../components/Filter";
import Sorter from "../components/Sorter";

export default function HomeScreen() {
  const filteredArticles: ArticleType[] = useSelector((state: RootState) => {
    return state.filteredArticles;
  });
  const categories: CategoryType[] = useSelector((state: RootState) => {
    return state.categories;
  });
  const subcategories: SubcategoryType[] = useSelector((state: RootState) => {
    return state.subcategories;
  });
  const dispatch: ThunkDispatch<RootState, unknown, UnknownAction> = useDispatch();

  useEffect(() => {
    dispatch(loadArticles());
    dispatch(loadCategories());
    dispatch(loadSubCategories());
  }, [dispatch]);

  return (
    <div className="layout">
      <Navbar />
      <h1>{filteredArticles.length} Artikel</h1>
      <div className={styles.filter}>
        <Filter
          type="Filter"
          name="Kategorie"
          categories={categories}
          subcategories={subcategories}
        />
        <Sorter type="Sortieren" options={["Name", "Preis", "Menge"]} />
      </div>
      <div className="article_container">
        {filteredArticles.map((article) => (
          <ArticlePreview article={article} key={article._id} />
        ))}
      </div>
    </div>
  );
}
