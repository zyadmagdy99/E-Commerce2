import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProduct() {
  function GetProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let useProduct = useQuery({
    queryKey: ["product"],
    queryFn: GetProduct,
    refetchInterval: 5000,
    staleTime: 20000,
  });
  return useProduct;
}
