// components/AddDeviceButton.tsx
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./AddDeviceButton.css";
type AddDeviceButtonProps = {
  sendStatus: (status: boolean) => void;
  headerText: string;
}
const AddDeviceButton = (props: AddDeviceButtonProps) => {
  const handleClick = () => {
    props.sendStatus(true);
  }

  return (
    <div className="add-device-button" onClick={handleClick}>
      <PlusOutlined className="icon" />
      <p>{props.headerText}</p>
    </div>
  );
};

export default AddDeviceButton;
