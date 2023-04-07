import React, { useState } from "react";
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
import { addProduct } from "../../../api/product";
import { IProduct } from "../../../interface/products";
import { ICategory } from "../../../interface/categories";
// import '../../../assets/css/admin.css'
type Props = {
  // products: IProduct,
  categories: ICategory[];
};

const ProductsAdd = (props: Props) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (product: IProduct) => {
    await addProduct(product);
    api["success"]({
      message: "Add successfull",
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const validateMessages = {
    required: "Must not be empty",
    types: {
      number: "Number is not a valid!",
    },
    number: {
      range: "Cannot be a negative value",
    },
  };

  return (
    <>
      <p className="title">Add Product</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Product name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Insert product name" />
        </Form.Item>
        <Form.Item
          label="Product image"
          name="image"
          rules={[{ required: true }]}
        >
          <Input placeholder="Insert product thumbnail" />
        </Form.Item>
        <Form.Item
          label="Product price"
          name="price"
          rules={[{required: true }]}
        >
          <Input placeholder="Insert product price" />
        </Form.Item>
        <Form.Item
          label="Product description"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} placeholder="Insert product description" />
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductsAdd;
