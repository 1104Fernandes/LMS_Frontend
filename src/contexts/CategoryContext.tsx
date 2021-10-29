import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Category } from "../models/Category";
import { userContext } from "./UserContext";

type CategoryContext = {
  categories: Category[];
};

export const initialContext = {
  categories: [],
};

export const categoryContext = React.createContext<CategoryContext>(
  initialContext
);

export const CategoryProvider: React.FC = ({ children }) => {
  const context = useContext(userContext);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    async function getCategories() {
      setLoading(true);

      await axios
        .get("http://localhost:4000/api/category", {
          headers: { Authorization: context.actions.authHeader() },
        })
        .then((response) => {
          if (response.status === 200) {
            setCategories(response.data.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }

   //  if (context.actions.authHeader() !== null) {
      getCategories();
   //  }
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }
  return (
    <categoryContext.Provider
      value={{
        categories: categories || [],
      }}
    >
      {children}
    </categoryContext.Provider>
  );
};
