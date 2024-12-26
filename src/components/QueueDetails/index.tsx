import React from 'react';
import './QueueDetails.css';

interface QueueDetailsProps {
  data: {
    fullName: string;
    serviceName: string;
    queueNumber: string;
    issueTime: string;
    expiryTime: string;
    source: string;
    status: string;
    phoneNumber: string;
    email: string;
  };
}

const QueueDetails: React.FC<QueueDetailsProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đang chờ':
        return 'blue';
      case 'Đã sử dụng':
        return 'green';
      case 'Bỏ qua':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="queue-details-container">
      <h2 className="queue-details-title">Quản lý cấp số</h2>
      <div className="queue-details-content">
        <div className="queue-details-column">
          <div className="queue-detail-item">
            <span className="label">Họ tên:</span>
            <span className="value">{data.fullName}</span>
          </div>
          <div className="queue-detail-item">
            <span className="label">Tên dịch vụ:</span>
            <span className="value">{data.serviceName}</span>
          </div>
          <div className="queue-detail-item">
            <span className="label">Số thứ tự:</span>
            <span className="value">{data.queueNumber}</span>
          </div>
          <div className="queue-detail-item">
            <span className="label">Thời gian cấp:</span>
            <span className="value">{data.issueTime}</span>
          </div>
          <div className="queue-detail-item">
            <span className="label">Hạn sử dụng:</span>
            <span className="value">{data.expiryTime}</span>
          </div>
        </div>
        <div className="queue-details-column">
          <div className="queue-detail-item">
            <span className="label">Nguồn cấp:</span>
            <span className="value">{data.source}</span>
          </div>
          <div className="queue-detail-item">
            <span className="label">Trạng thái:</span>
            <span className="value">
              <span
                className="status-indicator"
                style={{ backgroundColor: getStatusColor(data.status) }}
              ></span>
              {data.status}
            </span>
          </div>
          <div className="queue-detail-item">
            <span className="label">Số điện thoại:</span>
            <span className="value">{data.phoneNumber}</span>
          </div>
          <div className="queue-detail-item">
            <span className="label">Địa chỉ Email:</span>
            <span className="value">{data.email ?? ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueDetails;
