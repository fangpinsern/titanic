import { Layout, Menu } from "antd";
import React, { useState } from "react";
import ContentComponent from "./content";

const { Header, Content, Footer, Sider } = Layout;

const LayoutComponent = () => {
  const [sideBarOption, setSideBarOption] = useState("VENUE");

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <Menu.Item key="1" onClick={() => setSideBarOption("VENUE")}>
                Venues
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => setSideBarOption("BOOKING_REQ")}
              >
                Booking Request
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => setSideBarOption("RECURRING_BOOOKINGS")}
              >
                Recurring Bookings
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => setSideBarOption("CALENDAR_OVERVIEW")}
              >
                Calendar Overview
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <ContentComponent sideBarOption={sideBarOption} />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default LayoutComponent;
