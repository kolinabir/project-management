"use client";

import React from "react";
import { Layout, Menu } from "antd";
import {
  ProjectOutlined,
  TagsOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
// import "antd/dist/antd.css";

const { Sider } = Layout;

const SidebarLayout = ({ collapsed, toggleCollapsed }) => {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      className="bg-white shadow-md lg:flex hidden py-8 px-4" // Added padding
    >
      <div className="logo mb-8" /> {/* Added margin-bottom */}
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        className="text-gray-700" // Added text color
      >
        <Menu.Item
          key="1"
          icon={<BarChartOutlined className="text-blue-500" />} // Added icon color
        >
          <Link href="/dashboard" className="hover:text-blue-500">
            {" "}
            {/* Added hover effect */}
            DashBoard
          </Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ProjectOutlined className="text-blue-500" />}>
          <Link href="/dashboard/taskmanage" className="hover:text-blue-500">
            Task Manage
          </Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TagsOutlined className="text-blue-500" />}>
          <Link href="/dashboard/projectmanage" className="hover:text-blue-500">
            Project Manage
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarLayout;
