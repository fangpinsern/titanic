import React, { useEffect, useState } from "react";
import TableComponent from "../table";
import VenueVisibilitySwitch from "./venueVisibilitySwitch";
import AddSubVenueModal from "./addSubVenueModal";
import EditVenueModal from "./editVenueModal";

const SubVenueTableComponent = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [venueData, setVenueData] = useState();
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(true);

  const parentId = props.parentId;

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
      title: "Edit",
      key: "edit",
      render: (edit, record) => {
        return <EditVenueModal venueId={record.id} setRefresh={setRefresh} />;
      },
    },
    {
      title: "visible",
      dataIndex: "visible",
      key: "visible",
      render: (visible, record) => {
        // console.log("i am here", visible, record.name);
        return (
          <VenueVisibilitySwitch
            visible={visible}
            venueId={record.id}
            setRefresh={setRefresh}
          />
        );
      },
    },
  ];

  useEffect(() => {
    const sendReq = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL +
            "/api/v1/venue/admin/search?parentVenue=" +
            parentId,
          {
            headers: { authorization: process.env.REACT_APP_BACKEND_AUTH },
          }
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setVenueData(resData.venues);
        setIsLoading(false);
        console.log("hello!!!", props.parentRefresh);
      } catch (err) {
        setIsLoading(false);
        setError(err.msg);
      }
    };
    sendReq();
  }, [refresh, props.parentRefresh]);
  return (
    <React.Fragment>
      <AddSubVenueModal parentId={parentId} setRefresh={setRefresh} />
      <TableComponent
        columns={columns}
        data={
          venueData
            ? venueData.map((venue) => {
                venue.key = venue.id;
                return venue;
              })
            : []
        }
        pagination={false}
      />
    </React.Fragment>
  );
};

export default SubVenueTableComponent;
