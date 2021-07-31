import { Table, Tag, Switch } from "antd";
import { useState } from "react";

const VenueVisibilitySwitch = (props) => {
  const [status, setStatus] = useState(props.visible);
  const [isLoading, setIsLoading] = useState(false);

  const venueId = props.venueId;
  const changeFunc = async () => {
    setIsLoading(true);

    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/venue/visibility/" + venueId,
      {
        method: "PUT",
        headers: {
          authorization: process.env.REACT_APP_BACKEND_AUTH,
        },
      }
    );

    const responseData = await response.json();
    console.log(responseData);
    setStatus(responseData.venue.visible);
    setIsLoading(false);
  };

  return (
    <Switch
      checkedChildren="On"
      unCheckedChildren="Off"
      checked={status}
      onChange={changeFunc}
      loading={isLoading}
    />
  );
};

export default VenueVisibilitySwitch;
