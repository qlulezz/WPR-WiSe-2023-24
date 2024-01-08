export interface ArticleType {
  _id: string;
  name: string;
  price: number;
  categoryId: string;
  href: string;
  quantity: number;
  rating: number;
  shortdescription: string;
  description: string;
  subcategory?: string;
  __v: number;
}

export interface CategoryType {
  subcategoryIds: string[];
  _id: string;
  name: string;
  __v: number;
}

export interface SubcategoryType {
  _id: string;
  name: string;
  __v: number;
}

export interface OrderType {
  _id: string;
  articles: OrderedArticleType[];
  orderDate: string;
  orderNr: number;
  userId: string;
  __v: number;
}

interface OrderedArticleType {
  _id: string;
  articleId: string;
  price: number;
  quantity: number;
}
