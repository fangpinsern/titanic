import React, { useState } from "react";
import { Modal, Button, Form } from "antd";
import AddVenueForm from "./addVenueForm";

const AddVenueModal = (props) => {
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

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/venue/",
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
        Add Venue
      </Button>
      <Modal
        title="Title"
        visible={visible}
        // onOk={handleOk}
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
        {/* <p>{modalText}</p> */}
        <AddVenueForm form={hello} />
      </Modal>
    </>
  );
};

export default AddVenueModal;
