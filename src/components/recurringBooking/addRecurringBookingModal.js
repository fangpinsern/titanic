import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "antd";
import AddRecurringBookingForm from "./addRecurringBookingForm";

const AddRecurringBookingModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [hello] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    console.log(hello.getFieldsValue(true));

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/recurringBooking/create",
      {
        method: "POST",
        body: JSON.stringify(hello.getFieldsValue(true)),
        headers: {
          Authorization: process.env.REACT_APP_BACKEND_AUTH,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    setVisible(false);
    setConfirmLoading(false);
    hello.resetFields();
    props.setRefresh((value) => !value);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Recurring Bookings
      </Button>
      <Modal
        title="Title"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <AddRecurringBookingForm form={hello} />
      </Modal>
    </>
  );
};

export default AddRecurringBookingModal;
