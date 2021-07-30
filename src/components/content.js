import React from "react";
import AddVenueModal from "./addVenueModal";
import TableComponent from "./table";
const ContentComponent = (props) => {
  const isLoading = props.isLoading;

  if (isLoading) {
    return <TableComponent />;
  }
  if (props.sideBarOption === "VENUE") {
    console.log(props.data);
    return (
      <React.Fragment>
        <AddVenueModal />
        <TableComponent
          columns={props.columns}
          data={props.data.venues.map((venue) => {
            venue.key = venue.id;
            return venue;
          })}
        />
      </React.Fragment>
    );
  }

  return <TableComponent />;
};

export default ContentComponent;
