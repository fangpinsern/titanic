import React, { useState } from "react";
import { Modal, Button, Form } from "antd";
import EditVenueForm from "./editVenueForm";

const EditVenueModal = (props) => {
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

    const formFields = hello.getFieldsValue(true);

    const body = {
      ...formFields,
      image: formFields?.image?.file?.response?.filename,
    };

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/venue/" + props.venueId,
      {
        method: "PATCH",
        body: JSON.stringify(body),
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
        Edit Venue
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
        <EditVenueForm form={hello} />
      </Modal>
    </>
  );
};

export default EditVenueModal;
