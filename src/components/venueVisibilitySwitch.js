import { Table, Tag, Switch } from "antd";
import { useState } from "react";

const VenueVisibilitySwitch = (props) => {
  const [status, setStatus] = useState(props.visible);
  const [isLoading, setIsLoading] = useState(false);

  const venueId = props.venueId;
  const changeFunc = async () => {
    setIsLoading(true);

    const response = await fetch(
      "http://localhost:8080/api/v1/venue/visibility/" + venueId,
      {
        method: "PUT",
        headers: {
          Authorization: "KEVII1!",
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
