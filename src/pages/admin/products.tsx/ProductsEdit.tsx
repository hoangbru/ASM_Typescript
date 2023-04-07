import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Divider,
  notification,
  Space,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { addProduct, updateProduct } from "../../../api/product";
import { IProduct } from "../../../interface/products";
import { ICategory } from "../../../interface/categories";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategory } from "../../../api/category";
// import '../../../assets/css/admin.css'
type Props = {
  products: IProduct[],
  categories: ICategory[],
};

const ProductsEdit = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct>()
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const setFields = () => {
    form.setFieldsValue({
      id: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      description: product?.description,
      categoryId: product?.categoryId,
    });
  };
  useEffect(() => {
    const currentProduct = props.products.find((product: ICategory) => product.id == id);
    setProduct(currentProduct);
  }, [props]);

  useEffect(() => {
    setFields();
  }, [product]);

  const onFinish = async (product: IProduct) => {
    await updateProduct(product);
      api["success"]({
        message: "Updated successfull",
      });
      setTimeout(() => {
        navigate("/admin/products")
      }, 1000)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
    <p className="title">Edit Product</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 600 }}
        initialValues={product}
      >
        <Form.Item
          name="id"
          style={{ display: "none" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category name"
          name="name"
          rules={[{ required: true, message: "Please insert category name!" }]}
        >
          <Input placeholder="Insert category name" />
        </Form.Item>
        <Form.Item
          label="Category image"
          name="image"
          rules={[{ required: true, message: "Please insert category thumbnail!" }]}
        >
          <Input placeholder="Insert category thumbnail" />
          {/* <img src={image} alt="" /> */}
        </Form.Item>
        <Form.Item
          label="Category price"
          name="price"
          rules={[{ required: true, message: "Please insert category price!" }]}
        >
          <Input placeholder="Insert category price" />
        </Form.Item>
        <Form.Item
          label="Category description"
          name="description"
          rules={[{ required: true, message: "Please insert category description!" }]}
        >
          <Input.TextArea rows={4} placeholder="Insert category description" />
        </Form.Item>
        <Form.Item label="Category" required name="categoryId">
          <Select>
            {props.categories.map((category: ICategory) => {
              return (
                <Select.Option
                  key={category.id}
                  value={category.id}
                  label={category.name}
                >
                  {category.name}
                </Select.Option>
              );
            })}
            {/* <Select.Option value="demo">Web dynamic</Select.Option> */}
          </Select>
        </Form.Item>
        <Form.Item>
          {contextHolder}
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductsEdit;
