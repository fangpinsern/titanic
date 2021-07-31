import React, { useEffect, useState } from "react";
import AddVenueModal from "./addVenueModal";
import SubVenueTableComponent from "./subVenueTable";
import TableComponent from "./table";
import VenueVisibilitySwitch from "./venueVisibilitySwitch";

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
];

const VenueTableComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sideBarOption, setSideBarOption] = useState("VENUE");
  const [venueData, setVenueData] = useState();
  const [error, setError] = useState();

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
  }, []);

  return (
    <React.Fragment>
      <AddVenueModal />

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
          return <SubVenueTableComponent parentId={record.id} />;
        }}
      />
    </React.Fragment>
  );
};

export default VenueTableComponent;
