import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../interface/products";
import Nav from "./Nav";

type Props = {
  products: IProduct[];
};
const ProductDetail = ({ products }: Props) => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    const currentProduct = products.find((product:IProduct) => product.id == id)
    setProduct(currentProduct);
  });

  return (
    <>
      <h3 className="titles">Product Detail</h3>
      <section className="section">
        <div className="product_detail">
          <img src={product?.image} className="image_detail" alt="" />
          <div className="product_detail-content">
            <p className="product_detail-name">{product?.name}</p>
            <div className="product_detail-desc">{product?.description}</div>
            <p className="product_detail-price">$ {product?.price}</p>
            <button className="product_detail-cart">Add to cart</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
