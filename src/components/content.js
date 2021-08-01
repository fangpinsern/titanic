import React from "react";
import AddVenueModal from "./addVenueModal";
import BookingRequestTableComponent from "./bookingRequestTable";
import RecurringBookingTableComponent from "./recurringBookingTable";
import TableComponent from "./table";
import VenueTableComponent from "./venueTable";
const ContentComponent = (props) => {
  const isLoading = props.isLoading;

  if (isLoading) {
    return <TableComponent />;
  }
  if (props.sideBarOption === "VENUE") {
    return <VenueTableComponent />;
  }

  if (props.sideBarOption === "BOOKING_REQ") {
    return <BookingRequestTableComponent />;
  }

  if (props.sideBarOption === "RECURRING_BOOOKINGS") {
    return <RecurringBookingTableComponent />;
  }

  return <TableComponent />;
};

export default ContentComponent;
