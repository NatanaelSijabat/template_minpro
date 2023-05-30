import React, { PropsWithChildren, useState } from "react";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  FileImageOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const handleLogout = () => {
    try {
      router.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const items: MenuItem[] = [
    getItem(
      <Link href={"#"} className="capitalize">
        dashboard
      </Link>,
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <Link href={"#"} className="capitalize">
        candidiat
      </Link>,
      "2",
      <FileImageOutlined />
    ),
    getItem(
      <Link href={"#"} className="capitalize">
        batchs
      </Link>,
      "3",
      <FileImageOutlined />
    ),
    getItem(
      <Link href={"#"} className="capitalize">
        talents
      </Link>,
      "4",
      <FileImageOutlined />
    ),
    getItem(
      <Link href={"#"} className="capitalize">
        curiculum
      </Link>,
      "5",
      <FileImageOutlined />
    ),
    getItem(
      <span className="capitalize">assignment</span>,
      "sub1",
      <UserOutlined />,
      [
        getItem(
          <Link href={"#"} className="capitalize">
            assignment 1
          </Link>,
          "6",
          <FileOutlined />
        ),
        getItem(
          <Link href="#" className="capitalize">
            assignment 2
          </Link>,
          "7"
        ),
      ]
    ),
    getItem(
      <Link href={"#"} className="capitalize">
        posting hiring
      </Link>,
      "8"
    ),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Layout.Header className="text-white">
        <div className="float-left">left</div>
        <div className="float-right">right</div>
      </Layout.Header>
      <Breadcrumb
        separator=">"
        items={[
          {
            href: "",
            title: (
              <>
                <HomeOutlined />
                <span>Home</span>
              </>
            ),
          },
          {
            href: "#",
            title: "Dashboard",
          },
        ]}
      />
      <Layout hasSider>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu theme="dark" mode="inline" items={items} />
        </Sider>
        <Layout>
          <Content style={{ overflow: "initial" }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
