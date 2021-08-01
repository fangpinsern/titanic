import { Form, Input, Select } from "antd";
import {
  TimingSlotsAvailable,
  TimingSlotNumberToTimingMapping,
  numberToWeekday,
  numberOfWeekday,
} from "../constants/timingSlotsAvailable";
const { Option } = Select;

const AddRecurringBookingForm = (props) => {
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
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Venue"
        name="venueId"
        rules={[{ required: true, message: "Please input venue" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Start Date (yyyymmdd)"
        name="startDate"
        rules={[{ required: true, message: "Please input Start Date" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="End Date (yyyymmdd)"
        name="endDate"
        rules={[{ required: true, message: "Please input End Date" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Day Of the Week"
        name="dayOfTheWeek"
        rules={[{ required: true, message: "Please input day of the week" }]}
      >
        <Select placeholder="Please day of the week">
          {numberOfWeekday.map((weekday) => {
            return <Option value={weekday}>{numberToWeekday[weekday]}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="timingSlots"
        label="Timing Slots"
        rules={[
          {
            required: true,
            message: "Please input timing slots",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please time slots">
          {TimingSlotsAvailable.map((time) => {
            return (
              <Option value={time}>
                {TimingSlotNumberToTimingMapping[time]}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Notes"
        name="notes"
        rules={[{ required: true, message: "Please input notes" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default AddRecurringBookingForm;
