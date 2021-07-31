import React, { useState } from "react";
import { Modal, Button, Form } from "antd";
import AddSubVenueForm from "./addSubVenueForm";

const AddSubVenueModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [hello] = Form.useForm();

  const parentId = props.parentId;

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    console.log(hello.getFieldsValue(true));

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/api/v1/venue/childVenue/" +
        parentId,
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
    console.log(responseData);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      hello.resetFields();
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Sub Venue
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
        <AddSubVenueForm form={hello} />
      </Modal>
    </>
  );
};

export default AddSubVenueModal;
