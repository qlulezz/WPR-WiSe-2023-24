import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../services/api/axios";
import { ArticleType } from "../types/database";
import Article from "../components/Article";

export default function ArticleScreen() {
  const { articleId } = useParams();
  const [article, setArticle] = useState<ArticleType | null>(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/shop/article/" + articleId);
      const articleData: ArticleType = res.data;
      setArticle(articleData);
    })();
  }, [articleId]);

  return (
    <div className="layout">
      <Navbar />
      <>{article ? <Article {...article} /> : <p>Loading ...</p>}</>
    </div>
  );
}
