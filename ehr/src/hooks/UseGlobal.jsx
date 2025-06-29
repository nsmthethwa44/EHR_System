import React, {useContext} from "react";
import { GlobalContext } from "../components/GlobalContext";

export const UseGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    alert("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
