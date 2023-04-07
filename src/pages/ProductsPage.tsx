import React from "react";
import { IProduct } from "../interface/products";
import Nav from "./Nav";

type Props = {
  products: IProduct[];
};
const ProductsPage = (props: Props) => {
  // const remove = (id) => {
  //     props.onRemove(id)
  // }
  return (
    <>
    <h1 className="titles">Products List</h1>
      <section className="section">
        {/* <h1 className="title">Products List</h1> */}
        <div className="product_container">
          {props.products.map((product: IProduct) => {
            return (
              <div className="product_card" key={product.id}>
                <a href={`/products/${product.id}`}>
                  <img src={product.image} alt="" className="product_image" />
                  <div className="product_content">
                    <p className="product_name">
                      {product.name} <span>$ {product.price}</span>
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
