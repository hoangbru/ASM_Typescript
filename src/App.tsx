import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import ProductsAdd from "./pages/admin/products.tsx/ProductsAdd";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "./api/product";
import ProductsList from "./pages/admin/products.tsx/ProductsList";
import ProductsEdit from "./pages/admin/products.tsx/ProductsEdit";
import CategoriesList from "./pages/admin/categories/CategoriesList";
import CategoriesAdd from "./pages/admin/categories/CategoriesAdd";
import CategoriesEdit from "./pages/admin/categories/CategoriesEdit";
import { deleteCategory, getAllCategory } from "./api/category";
import { IProduct } from "./interface/products";
import { ICategory } from "./interface/categories";
import Dashboard from "./pages/layouts/Dashboard";
import RootLayout from "./pages/layouts/RootLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import './App.css'

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    getAllProduct().then((product) => setProducts(product.data));
    getAllCategory().then((category) => setCategories(category.data));
  }, []);
  const onHandleRemove = (id: number) => {
    deleteCategory(id).then(() => 
      setCategories(categories.filter((item: ICategory) => item.id !== id))
    )
  };
  const onHandleAdd = (product: IProduct) => {
    addProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProducts(data))
    );
  };
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProducts(data))
    );
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage products={products} />}/>
          <Route path="products/:id" element={<ProductDetail products={products} />}/>
        </Route>
        <Route path="admin" element={<Dashboard/>}>
        <Route path='products'>
            <Route index element={<ProductsList products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<ProductsAdd categories={categories}/>} />
            <Route path=':id/edit' element={<ProductsEdit categories={categories} products={products}/>} />
          </Route>
          <Route path='categories'>
            <Route index element={<CategoriesList categories={categories} onRemove={onHandleRemove} />} />
            <Route path='add' element={<CategoriesAdd />} />
            <Route path=':id/edit' element={<CategoriesEdit categories={categories}/>} />
          </Route>
        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
      </Routes>
    </>
  );
}

export default App;
