import { IProduct } from "../interface/products";
import instance from "./instance";

export const getAllProduct = () => {
    return instance.get('/products');
}
export const getOneProduct = (id:number) => {
    return instance.get('/products/' + id);
}
export const addProduct = (product:IProduct) => {
    return instance.post('/products', product);
}
export const updateProduct = (product:IProduct) => {
    return instance.patch('/products/' + product.id, product);
}
export const deleteProduct = (id:number) => {
    return instance.delete('/products/' + id);
}
