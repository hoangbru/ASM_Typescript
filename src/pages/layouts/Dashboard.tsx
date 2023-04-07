import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  DashboardOutlined,
  FileOutlined,
  CalendarFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import 'antd/dist/reset.css'
type Props = {};

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  to?: string,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    to: to || "/",
    children,
    label: (
      <Link style={{ color: "white" }} to={to || "/"}>
        {label}
      </Link>
    ),
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", <DashboardOutlined />, "/admin"),
  getItem("Product", "sub1", <FileOutlined />, "/admin/products", [
    getItem("List", "2", undefined, "/admin/products"),
    getItem("Add new", "3", undefined, "/admin/products/add"),
  ]),
  getItem("Categories", "sub2", <CalendarFilled />, "/admin/categories", [
    getItem("List", "4", undefined, "/admin/categories"),
    getItem("Add new", "5", undefined, "/admin/categories/add"),
  ]),
];

const Dashboard: React.FC = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              color: "#fff",
              height: 45,
              margin: 15,
              padding: 16,
              background: "rgba(13, 29, 49, 1)",
              borderRadius: 4,
              lineHeight: "32px",
              display: "flex",
              alignItems: "center",
            }}
          >
            vithoang
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          ></Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2023 Design by vithoang
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
