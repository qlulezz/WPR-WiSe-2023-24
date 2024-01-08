import { createAction, createReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ArticleType, CategoryType, OrderType, SubcategoryType } from "../../types/database";
import axios from "../api/axios";

interface Filters {
  categoryId: string;
  subcategoryId: string;
}

interface Sorters {
  sortBy: string;
  order: string;
}

export interface CartItem {
  article: ArticleType;
  quantity: number;
}

export interface User {
  email?: string;
}

export const filterArticles = createAction<Filters, "article/filterArticles">(
  "article/filterArticles"
);
export const sortArticles = createAction<Sorters, "article/sortArticles">("article/sortArticles");

export const loadArticles = createAsyncThunk("article/loadArticles", async () => {
  const res = await axios.get("/shop/articles" /* , { withCredentials: true } */);
  return res.data as ArticleType[];
});

export const loadCategories = createAsyncThunk("article/loadCategories", async () => {
  const res = await axios.get("/shop/categories" /* , { withCredentials: true } */);
  return res.data as CategoryType[];
});

export const loadSubCategories = createAsyncThunk("article/loadSubCategories", async () => {
  const res = await axios.get("/shop/subcategories" /* , { withCredentials: true } */);
  return res.data as SubcategoryType[];
});

export const loadOrders = createAsyncThunk("article/loadOrders", async () => {
  const res = await axios.get("/shop/orders", { withCredentials: true });
  return res.data as OrderType[];
});

export const addArticleToCart = createAction<ArticleType, "cart/addArticleToCart">(
  "cart/addArticleToCart"
);

export const removeArticleFromCart = createAction<ArticleType, "cart/removeArticleFromCart">(
  "cart/removeArticleFromCart"
);

export const changeQuantity = createAction<CartItem, "cart/changeQuantity">("cart/changeQuantity");

export const loginUser = createAction<User, "user/loginUser">("user/loginUser");
export const logoutUser = createAction("user/logoutUser");

const initialState: {
  articles: ArticleType[];
  filteredArticles: ArticleType[];
  categories: CategoryType[];
  subcategories: SubcategoryType[];
  cart: CartItem[];
  user: User;
  orders: OrderType[];
} = {
  articles: [],
  filteredArticles: [],
  categories: [],
  subcategories: [],
  cart: [],
  user: JSON.parse(localStorage.getItem("user") as string) || {},
  orders: [],
};

export type RootState = typeof initialState;

const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadArticles.fulfilled, (state, action: PayloadAction<ArticleType[]>) => {
      return {
        ...state,
        articles: action.payload,
        filteredArticles: action.payload,
      };
    })
    .addCase(loadCategories.fulfilled, (state, action: PayloadAction<CategoryType[]>) => {
      return {
        ...state,
        categories: action.payload,
      };
    })
    .addCase(loadSubCategories.fulfilled, (state, action: PayloadAction<SubcategoryType[]>) => {
      return {
        ...state,
        subcategories: action.payload,
      };
    })
    .addCase(loadOrders.fulfilled, (state, action: PayloadAction<OrderType[]>) => {
      return {
        ...state,
        orders: action.payload,
      };
    })
    .addCase(filterArticles, (state, action) => {
      let newArticles = [...state.articles];

      if (action.payload.categoryId !== "none") {
        newArticles = newArticles.filter(
          (article) => article.categoryId === action.payload.categoryId
        );
      }

      if (action.payload.subcategoryId !== "none") {
        newArticles = newArticles.filter(
          (article) => article.subcategory === action.payload.subcategoryId
        );
      }

      return {
        ...state,
        filteredArticles: newArticles,
      };
    })
    .addCase(sortArticles, (state, action) => {
      let newArticles = [...state.filteredArticles];

      switch (action.payload.sortBy) {
        case "Name": {
          newArticles = newArticles.sort((a, b) => a.name.localeCompare(b.name));
          break;
        }
        case "Preis": {
          newArticles = newArticles.sort((a, b) => a.price - b.price);
          break;
        }
        case "Menge": {
          newArticles = newArticles.sort((a, b) => a.quantity - b.quantity);
          break;
        }
      }

      if (action.payload.order === "desc") {
        newArticles.reverse();
      }

      return {
        ...state,
        filteredArticles: newArticles,
      };
    })
    .addCase(addArticleToCart, (state, action) => {
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            article: action.payload,
            quantity: 1,
          },
        ],
      };
    })
    .addCase(removeArticleFromCart, (state, action) => {
      return {
        ...state,
        cart: [...state.cart].filter((article) => article.article._id !== action.payload._id),
      };
    })
    .addCase(changeQuantity, (state, action) => {
      const newCart = state.cart.map((cartItem) => {
        if (cartItem.article._id === action.payload.article._id) {
          return { ...cartItem, quantity: action.payload.quantity };
        } else {
          return cartItem;
        }
      });
      return {
        ...state,
        cart: newCart,
      };
    })
    .addCase(loginUser, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    })
    .addCase(logoutUser, (state) => {
      localStorage.removeItem("user");
      return {
        ...state,
        user: {},
      };
    });
});

export default shopReducer;
