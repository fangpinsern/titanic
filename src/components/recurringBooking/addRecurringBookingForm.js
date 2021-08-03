import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import {
  TimingSlotsAvailable,
  TimingSlotNumberToTimingMapping,
  numberToWeekday,
  numberOfWeekday,
} from "../../constants/timingSlotsAvailable";
const { Option } = Select;

const AddRecurringBookingForm = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [venueData, setVenueData] = useState([]);
  const [error, setError] = useState();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const sendReq = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          process.env.REACT_APP_BACKEND_URL + "/api/v1/venue/admin/search",
          {
            headers: { authorization: process.env.REACT_APP_BACKEND_AUTH },
          }
        );
        const resData = await res.json();
        if (!res.ok) {
          throw new Error(resData.msg);
        }
        setVenueData(resData.venues);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.msg);
      }
    };
    sendReq();
  }, []);

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
        <Select placeholder="Please day of the week">
          {venueData.map((venue) => {
            return <Option value={venue.id}>{venue.name}</Option>;
          })}
        </Select>
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
