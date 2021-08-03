import React from "react";
import { Button, Space, Tag, Descriptions } from "antd";

const BookingRequestApproveRejectIntentComponent = (props) => {
  const bookingRequest = props.bookingRequest;

  const conflicts = props.conflicts;
  return (
    <React.Fragment>
      <h2>Request To Approve</h2>
      <Descriptions bordered>
        <Descriptions.Item label="CCA">{bookingRequest.cca}</Descriptions.Item>
        <Descriptions.Item label="Email">
          {bookingRequest.email}
        </Descriptions.Item>
        <Descriptions.Item label="Venue">
          {bookingRequest.venue.name}
        </Descriptions.Item>
        <Descriptions.Item label="Notes">
          {bookingRequest.notes}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {bookingRequest.date}
        </Descriptions.Item>
        <Descriptions.Item label="Time Slots">
          {bookingRequest.timingSlots.map((timeSlot) => {
            return <Tag>{timeSlot}</Tag>;
          })}
        </Descriptions.Item>
      </Descriptions>
      <h2>CONFLICTS</h2>
      {conflicts.map((conflict, i) => {
        return (
          <React.Fragment>
            <h3>{"Conflict " + (i + 1)}</h3>
            <Descriptions bordered>
              <Descriptions.Item label="CCA">{conflict.cca}</Descriptions.Item>
              <Descriptions.Item label="Email">
                {conflict.email}
              </Descriptions.Item>
              <Descriptions.Item label="Notes">
                {conflict.notes}
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {conflict.date}
              </Descriptions.Item>
              <Descriptions.Item label="Time Slots">
                {conflict.timingSlots.map((timeSlot) => {
                  return <Tag>{timeSlot}</Tag>;
                })}
              </Descriptions.Item>
            </Descriptions>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default BookingRequestApproveRejectIntentComponent;
