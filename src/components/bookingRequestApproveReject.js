import { Button, Space, Modal } from "antd";

const BookingRequestApproveRejectComponent = (props) => {
  const approveFunction = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/bookingreq/approve",
      {
        method: "POST",
        body: JSON.stringify({
          bookingRequestId: props.bookingRequestId,
        }),
        headers: {
          Authorization: process.env.REACT_APP_BACKEND_AUTH,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      Modal.error({
        title: "This is an error message",
        content: responseData.message,
      });
    }

    Modal.success({
      content: "Approved",
    });
    props.setRefresh((value) => !value);
  };

  const rejectFunction = async () => {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/bookingreq/reject",
      {
        method: "POST",
        body: JSON.stringify({
          bookingRequestId: props.bookingRequestId,
        }),
        headers: {
          Authorization: process.env.REACT_APP_BACKEND_AUTH,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      Modal.error({
        title: "This is an error message",
        content: responseData.message,
      });
    }

    Modal.success({
      content: "Rejected",
    });
    props.setRefresh((value) => !value);
  };

  return (
    <Space>
      <Button type="primary" onClick={approveFunction}>
        Approve
      </Button>
      <Button type="danger" onClick={rejectFunction}>
        Reject
      </Button>
    </Space>
  );
};

export default BookingRequestApproveRejectComponent;
