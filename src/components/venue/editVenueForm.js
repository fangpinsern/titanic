import { Form, Input, Button, Checkbox } from "antd";
// import { OmitProps } from "antd/lib/transfer/ListBody";

const EditVenueForm = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //   {
  //     "name": "Tennis Court",
  //     "capacity": 2,
  //     "openingHours": "7am - 11pm",
  //     "description": "just a place to play tennis"
  // }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={props.form}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input venue name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Capacity"
        name="capacity"
        rules={[{ required: true, message: "Please input venue capacity" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image Key"
        name="image"
        rules={[{ required: true, message: "Please input venue image" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Opening Hours"
        name="openingHours"
        rules={[
          { required: true, message: "Please input venue Opening Hours" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input venue description" }]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default EditVenueForm;
