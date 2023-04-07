import { ICategory } from "../interface/categories";
import instance from "./instance";

export const getAllCategory = () => {
    return instance.get('/categories');
}
export const getOneCategory = (id:number) => {
    return instance.get('/categories/' + id);
}
export const addCategory = (category:ICategory) => {
    return instance.post('/categories', category);
}
export const updateCategory = (category:ICategory) => {
    return instance.patch('/categories/' + category.id, category);
}
export const deleteCategory = (id:number) => {
    return instance.delete('/categories/' + id);
}
