import React from "react";
import BookingRequestTableComponent from "./bookingRequestTable";
import RecurringBookingTableComponent from "./recurringBooking/recurringBookingTable";
import TableComponent from "./table";
import VenueTableComponent from "./venue/venueTable";
import VenueCalendarOverviewComponent from "./venueCalendarOverview/venueCalendarOverview";

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

  if (props.sideBarOption === "CALENDAR_OVERVIEW") {
    return <VenueCalendarOverviewComponent />;
  }

  return <TableComponent />;
};

export default ContentComponent;
