"use client";

import SidebarLayout from "@/components/dashboard/SidebarLayout";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { Content } = Layout;

const DashboardLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarLayout collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Content className="p-6">
        <div className="flex justify-end mb-4 lg:hidden">
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        {children}
      </Content>
    </Layout>
  );
};

export default DashboardLayout;
