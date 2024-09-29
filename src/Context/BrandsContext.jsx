import axios from "axios";
import { createContext } from "react";

export const BrandContext = createContext();

export default function BrandContextProvider(props) {
  const headers = { token: localStorage.getItem("token") };

  async function handlebrands() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands", { headers });
      console.log(res);
      return res;
    } catch (err) {
      console.error("Error fetching brands:", err);
      return err;
    }
  }
  async function handlecat() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories", { headers });
      console.log(res);
      return res;
    } catch (err) {
      console.error("Error fetching brands:", err);
      return err;
    }
  }

  return (
    <BrandContext.Provider value={{ handlebrands , handlecat }}>
      {props.children}
    </BrandContext.Provider>
  );
}
