import React, { useEffect, useState } from "react";
import AddVenueModal from "./addVenueModal";
import SubVenueTableComponent from "./subVenueTable";
import TableComponent from "../table";
import VenueVisibilitySwitch from "./venueVisibilitySwitch";
import EditVenueModal from "./editVenueModal";
import { Image } from "antd";

const VenueTableComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [venueData, setVenueData] = useState();
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(true);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <Image width={100} src={process.env.REACT_APP_BACKEND_URL + text} />
      ),
    },
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
            "/api/v1/venue/admin/search?isChildVenue=false",
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
      } catch (err) {
        setIsLoading(false);
        setError(err.msg);
      }
    };
    sendReq();
  }, [refresh]);

  return (
    <React.Fragment>
      <AddVenueModal setRefresh={setRefresh} />

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
        expandable={(record) => {
          return (
            <SubVenueTableComponent
              parentId={record.id}
              parentRefresh={refresh}
            />
          );
        }}
      />
    </React.Fragment>
  );
};

export default VenueTableComponent;
