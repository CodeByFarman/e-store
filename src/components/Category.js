import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import {getProducts} from '../fetcher';
import CategoryProduct from "./categoryProduct";

const Category = () => {
  const {categoryId} = useParams();
  const [product, setProduct] = useState({errorMessage: '', data: []});
  React.useEffect(() => {
    const fetchData = async () => {
        const responseObject = await getProducts(categoryId);
        setProduct(responseObject);
    }
    fetchData();
   },[categoryId]);

   const renderProducts = () => {
    return product.data.map((p) =>
      <CategoryProduct key={p.id} {...p}>{p.title}</CategoryProduct>
    )
  }
  return (
    <div>
       <h1>Products</h1>
           {product.errorMessage && <div>Error: {product.errorMessage} </div> }  
        {
        product && renderProducts()
        }
    </div>
  )
}

export default Category
