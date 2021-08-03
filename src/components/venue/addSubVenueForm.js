import { Form, Input, Button, Checkbox } from "antd";
// import { OmitProps } from "antd/lib/transfer/ListBody";

const AddSubVenueForm = (props) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input venue description" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default AddSubVenueForm;
