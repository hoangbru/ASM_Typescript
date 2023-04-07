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
import { addCategory, updateCategory } from "../../../api/category";
import { ICategory } from "../../../interface/categories";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};
type CategoryListProps = {
  categories: ICategory[];
};

const CategoriesEdit = ( props: CategoryListProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [category, setCategory] = useState<ICategory>();
  const [api, contextHolder] = notification.useNotification();

  const setFields = () => {
    form.setFieldsValue({
      id: category?.id,
      name: category?.name,
    });
  };
  useEffect(() => {
    const currentCategory = props.categories.find((category: ICategory) => category.id == id);
    setCategory(currentCategory);
  }, [props]);

  useEffect(() => {
    setFields();
  }, [category]);

  const onFinish = async (category: ICategory) => {
    await updateCategory(category);
    api["success"]({
      message: "Update successfull",
    });
    setTimeout(() => {
      navigate("/admin/categories")
    }, 1000)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
 
  return (
    <>
      <p className="title">
        Update Category
      </p>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ maxWidth: 600 }}
        initialValues={category}
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
          <Input
            placeholder="Insert category name"
          />
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

export default CategoriesEdit;
