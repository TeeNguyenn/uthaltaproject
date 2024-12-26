import React from 'react';
import './DeviceDetails.css';

interface DeviceDetailsProps {
  device: {
    deviceCode: string;
    deviceName: string;
    ipAddress: string;
    deviceType: string;
    username: string;
    password: string;
    services: string;
  };
}

const DeviceDetails = (props: DeviceDetailsProps) => {
  return (
    <div className="device-details-container">
      <h2 className="device-details-title">Quản lý thiết bị</h2>
      <div className="device-details-content">
        <div className="device-info">
          <div>
            <span className="label">Mã thiết bị:</span>
            <span className="value">{props.device.deviceCode}</span>
          </div>
          <div>
            <span className="label">Tên thiết bị:</span>
            <span className="value">{props.device.deviceName}</span>
          </div>
          <div>
            <span className="label">Địa chỉ IP:</span>
            <span className="value">{props.device.ipAddress}</span>
          </div>
          <div>
            <span className="label">Dịch vụ sử dụng:</span>
            <span className="value">{props.device.services}</span>
          </div>
        </div>
        <div className="device-info">
          <div>
            <span className="label">Loại thiết bị:</span>
            <span className="value">{props.device.deviceType}</span>
          </div>
          <div>
            <span className="label">Tên đăng nhập:</span>
            <span className="value">{props.device.username}</span>
          </div>
          <div>
            <span className="label">Mật khẩu:</span>
            <span className="value">{props.device.password}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeviceDetails;
