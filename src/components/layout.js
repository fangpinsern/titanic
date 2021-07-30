import { Layout, Menu, Button, Tag, Switch } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import TableComponent from "./table";
import React, { useEffect, useState } from "react";
import AddVenueModal from "./addVenueModal";
import ContentComponent from "./content";
import VenueVisibilitySwitch from "./venueVisibilitySwitch";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Capacity",
    dataIndex: "capacity",
    key: "capacity",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "visible",
    dataIndex: "visible",
    key: "visible",
    render: (visible, record) => {
      return <VenueVisibilitySwitch visible={visible} venueId={record.id} />;
    },
  },
  //   {
  //     title: "Tags",
  //     key: "tags",
  //     dataIndex: "tags",
  //     render: (tags) => (
  //       <>
  //         {tags.map((tag) => {
  //           let color = tag.length > 5 ? "geekblue" : "green";
  //           if (tag === "loser") {
  //             color = "volcano";
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text, record) => (
  //       <Space size="middle">
  //         <a>Invite {record.name}</a>
  //         <a>Delete</a>
  //       </Space>
  //     ),
  //   },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const LayoutComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sideBarOption, setSideBarOption] = useState("VENUE");
  const [venueData, setVenueData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const sendReq = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          "http://localhost:8080/api/v1/venue/admin/search",
          {
            headers: { authorization: "KEVII1!" },
          }
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setVenueData(resData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.msg);
      }
    };
    sendReq();
  }, []);

  //   console.log(venueData);

  //   const response = await fetch("http://localhost:8080/api/v1/venue/search");
  //   const responseData = await response.json();

  //   console.log(response);
  // .then((response) => {
  //   console.log(response.json());
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  //   console.log(backendInfo);

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
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <ContentComponent
              isLoading={isLoading}
              columns={columns}
              data={venueData}
              sideBarOption={sideBarOption}
            />
            {/* <TableComponent /> */}
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
