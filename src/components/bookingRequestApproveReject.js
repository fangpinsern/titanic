import { Button, Space, Modal, Descriptions } from "antd";
import { useState } from "react";
import BookingRequestApproveRejectIntentComponent from "./bookingRequestApproveRejectIntentModal";

const BookingRequestApproveRejectComponent = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalText, setModalText] = useState({});

  const showModal = async () => {
    setIsLoading(true);
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/api/v1/bookingreq/intent?bookingRequestId=" +
        props.bookingRequestId,
      {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_BACKEND_AUTH,
        },
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      setModalText("Something went wrong");
    }

    setModalText(responseData);
    setIsLoading(false);
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const approveFunction = async () => {
    setConfirmLoading(true);
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
      return Modal.error({
        title: "This is an error message",
        content: responseData.message,
      });
    }

    Modal.success({
      content: "Approved",
    });
    props.setRefresh((value) => !value);
    setConfirmLoading(false);
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
      <Button type="primary" onClick={showModal}>
        Approve
      </Button>
      <Button type="danger" onClick={rejectFunction}>
        Reject
      </Button>
      <Modal
        title="Confirmation"
        visible={visible}
        onOk={approveFunction}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
      >
        <BookingRequestApproveRejectIntentComponent
          bookingRequest={modalText.bookingRequest}
          conflicts={modalText.conflicts}
        />
      </Modal>
    </Space>
  );
};

export default BookingRequestApproveRejectComponent;
