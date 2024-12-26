// components/UserSection.tsx
import React from "react";
import { Avatar, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import "./UserSection.css";
type UserSectionProp = {
  count: number
}
const UserSection = (props:UserSectionProp) => {
  return (
    <div className="user-section">
      {/* Notification Bell */}
      <Badge count={props.count} offset={[10, 0]}>
        <BellOutlined className="notification-icon" />
      </Badge>
      {/* User Info */}
      <div className="user-info">
        <Avatar
          src={localStorage.getItem('avatar')} // Replace with actual image source
          size="large"
        />
        <div className="greeting">
          <p>Xin chào</p>
          <h3>{localStorage.getItem('userFullName')}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
