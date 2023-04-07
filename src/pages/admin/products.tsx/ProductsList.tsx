import React, { useState, useEffect, useRef } from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  Popconfirm,
  notification,
  Popover,
  Tooltip,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../../assets/css/admin.css";
import { IProduct } from "../../../interface/products";
import { getAllCategory } from "../../../api/category";
import { getOneCategory } from "../../../api/category";
import { ICategory } from "../../../interface/categories";
type ProductListProps = {
  products: IProduct[];
  onRemove: (id: number) => void;
};

interface DataType {
  id: number;
  key: number;
  name: string;
  image: string;
  categoryId: number;
}

const ProductsList = ({ products, onRemove }: ProductListProps) => {
  const [category, setCategory] = useState<ICategory>();
  // notification
  const [api, contextHolder] = notification.useNotification();

  // tooltip
  const text = <span>Edit</span>;

  // popconfirm
  const [openId, setOpenId] = useState<number | string | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const showPopconfirm = (id: number) => {
    setOpenId(id);
  };

  const handleOk = (id: number) => {
    setConfirmLoading(true);
    onRemove(id);
    setOpenId(null);
    setTimeout(function () {
      setShowNotification(true);
      setConfirmLoading(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpenId(null);
  };

  // Display notification
  useEffect(() => {
    if (showNotification) {
      api.success({
        message: "Delete category successfully",
      });
      setShowNotification(false);
    }
  }, [api, showNotification]);

  // colums
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} className="thumbnail" alt="" />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (record) => {
        // useEffect(() => {
        //   getOneCategory(record).then(({ data }) => setCategory(data));
        // }, [])
        return (
          // <p>{category?.name}</p>
          <p>{record}</p>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        const isOpen = openId === record.id;
        return (
          <Space size="middle">
            <Link
              to={`/admin/products/${record.id}/edit`}
              style={{ color: "rgba(13, 29, 49, 0.9)", fontSize: "18px" }}
            >
              <Tooltip placement="top" title={text}>
                <EditOutlined />
              </Tooltip>
            </Link>
            <Popconfirm
              title="Are you sure to delete?"
              // open={removingId !== null}
              onConfirm={() => handleOk(record.id)}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
              popupVisible={isOpen}
            >
              {contextHolder}
              <Button
                type="primary"
                danger
                onClick={() => showPopconfirm(record.id)}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // parse data
  const data: DataType[] = products.map((product: IProduct) => {
    return {
      key: product.id,
      ...product,
    };
  });

  if (!products) return <div>Loading....</div>;
  return (
    <>
      <p className="title">List products</p>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} />
    </>
  );
};

export default ProductsList;
