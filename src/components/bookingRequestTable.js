import { Tabs, Tag } from "antd";
import { useEffect, useState } from "react";
import BookingRequestApproveRejectComponent from "./bookingRequestApproveReject";
import TableComponent from "./table";

const { TabPane } = Tabs;

const columnsAPPROVED = [
  {
    title: "venue",
    dataIndex: "venue",
    key: "venue",
    render: (venue) => {
      return venue.name;
    },
  },
  {
    title: "CCA",
    dataIndex: "cca",
    key: "cca",
    render: (tag) => {
      const color = tag ? "green" : "volcano";
      return (
        <Tag color={color} key={tag}>
          {tag ?? "Personal"}
        </Tag>
      );
    },
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "timing slots",
    dataIndex: "timingSlots",
    key: "timingSlots",
    render: (tags) => {
      // const color = tag ? "green" : "volcano";
      return tags.map((tag) => {
        return (
          <Tag color={"geekblue"} key={tag}>
            {tag ?? "Personal"}
          </Tag>
        );
      });
    },
  },
  {
    title: "notes",
    dataIndex: "notes",
    key: "notes",
  },
];

const columnsREJECTED = [
  {
    title: "venue",
    dataIndex: "venue",
    key: "venue",
    render: (venue) => {
      return venue.name;
    },
  },
  {
    title: "CCA",
    dataIndex: "cca",
    key: "cca",
    render: (tag) => {
      const color = tag ? "green" : "volcano";
      return (
        <Tag color={color} key={tag}>
          {tag ?? "Personal"}
        </Tag>
      );
    },
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "timing slots",
    dataIndex: "timingSlots",
    key: "timingSlots",
    render: (tags) => {
      // const color = tag ? "green" : "volcano";
      return tags.map((tag) => {
        return (
          <Tag color={"geekblue"} key={tag}>
            {tag ?? "Personal"}
          </Tag>
        );
      });
    },
  },
  {
    title: "notes",
    dataIndex: "notes",
    key: "notes",
  },
];

const BookingRequestTableComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingRequestData, setBookingRequestData] = useState();
  const [refresh, setRefresh] = useState(true);

  function callback(key) {
    console.log(key);
    let url = process.env.REACT_APP_BACKEND_URL + "/api/v1/bookingreq/all";
    if (key === "1") {
      url =
        process.env.REACT_APP_BACKEND_URL + "/api/v1/bookingreq/all?q=PENDING";
    } else if (key === "2") {
      url =
        process.env.REACT_APP_BACKEND_URL + "/api/v1/bookingreq/all?q=APPROVED";
    } else if (key === "3") {
      url =
        process.env.REACT_APP_BACKEND_URL + "/api/v1/bookingreq/all?q=REJECTED";
    } else {
      url = process.env.REACT_APP_BACKEND_URL + "/api/v1/bookingreq/all";
    }

    const sendReq = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          headers: { authorization: process.env.REACT_APP_BACKEND_AUTH },
        });
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setBookingRequestData(resData.bookingRequest);
        setIsLoading(false);
        console.log(resData);
      } catch (err) {
        setIsLoading(false);
        // setError(err.msg);
      }
    };
    sendReq();
  }

  const columnsPENDING = [
    {
      title: "venue",
      dataIndex: "venue",
      key: "venue",
      render: (venue) => {
        return venue.name;
      },
    },
    {
      title: "CCA",
      dataIndex: "cca",
      key: "cca",
      render: (tag) => {
        const color = tag ? "green" : "volcano";
        return (
          <Tag color={color} key={tag}>
            {tag ?? "Personal"}
          </Tag>
        );
      },
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date (yyyy/mm/dd)",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "timing slots",
      dataIndex: "timingSlots",
      key: "timingSlots",
      render: (tags) => {
        // const color = tag ? "green" : "volcano";
        return tags.map((tag) => {
          return (
            <Tag color={"geekblue"} key={tag}>
              {tag ?? "Personal"}
            </Tag>
          );
        });
      },
    },
    {
      title: "notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Approve",
      dataIndex: "approve",
      key: "approve",
      render: (approve, record) => (
        <BookingRequestApproveRejectComponent
          bookingRequestId={record.id}
          setRefresh={setRefresh}
        />
      ),
    },
  ];

  useEffect(() => {
    const sendReq = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            "/api/v1/bookingreq/all?q=PENDING",
          {
            headers: { authorization: process.env.REACT_APP_BACKEND_AUTH },
          }
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setBookingRequestData(resData.bookingRequest);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        // setError(err.msg);
      }
    };
    sendReq();
  }, [refresh]);
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Pending" key="1">
        <TableComponent
          columns={columnsPENDING}
          data={
            bookingRequestData
              ? bookingRequestData.map((bookingreq) => {
                  bookingreq.key = bookingreq.id;
                  return bookingreq;
                })
              : []
          }
        />
      </TabPane>
      <TabPane tab="Approved" key="2">
        <TableComponent
          columns={columnsAPPROVED}
          data={
            bookingRequestData
              ? bookingRequestData.map((bookingreq) => {
                  bookingreq.key = bookingreq.id;
                  return bookingreq;
                })
              : []
          }
        />
      </TabPane>
      <TabPane tab="Rejected" key="3">
        <TableComponent
          columns={columnsREJECTED}
          data={
            bookingRequestData
              ? bookingRequestData.map((bookingreq) => {
                  bookingreq.key = bookingreq.id;
                  return bookingreq;
                })
              : []
          }
        />
      </TabPane>
    </Tabs>
  );
};

export default BookingRequestTableComponent;
