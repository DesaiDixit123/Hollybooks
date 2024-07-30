/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "./redux/products/ProductsThunk";

export const GlobProvider = createContext();

export default function GlobContext({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
  }, []);

  return <GlobProvider.Provider value={{}}>{children}</GlobProvider.Provider>;
}
