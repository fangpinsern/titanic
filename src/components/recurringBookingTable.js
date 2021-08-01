import { Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import AddRecurringBookingModal from "./addRecurringBookingModal";
import TableComponent from "./table";

const columns = [
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
    title: "Start Date (yyyy/mm/dd)",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date (yyyy/mm/dd)",
    dataIndex: "endDate",
    key: "endDate",
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
  //   {
  //     title: "Approve",
  //     dataIndex: "approve",
  //     key: "approve",
  //     render: (approve, record) => (
  //       <BookingRequestApproveRejectComponent bookingRequestId={record.id} />
  //     ),
  //   },
];

const RecurringBookingTableComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recurringBookingData, setRecurringBookingData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const sendReq = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/api/v1/recurringBooking/search",
          {
            headers: { authorization: process.env.REACT_APP_BACKEND_AUTH },
          }
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setRecurringBookingData(resData.recurringBookings);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.msg);
      }
    };
    sendReq();
  }, []);
  return (
    <React.Fragment>
      <AddRecurringBookingModal />
      <TableComponent columns={columns} data={recurringBookingData} />
    </React.Fragment>
  );
};
export default RecurringBookingTableComponent;
