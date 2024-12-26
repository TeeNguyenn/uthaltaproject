
import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import './TicketDisplay.css';

const { Title, Text } = Typography;

interface TicketDisplayProps {
  ticketNumber: string;
  serviceName: string;
  issueTime: string;
  customerName: string;
  expiryTime: string;
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({
  ticketNumber,
  serviceName,
  issueTime,
  customerName,
  expiryTime,
}) => {
  return (
    <Card className="ticket-display-card" bordered={false}>
      <div className="ticket-display-header">
        <Title level={4} className="ticket-title">
          Số thứ tự được cấp
        </Title>
      </div>
      <Row justify="center">
        <Title level={1} className="ticket-number">
          {ticketNumber}
        </Title>
      </Row>
      <Row justify="center">
        <Text className="service-info">
          DV: {serviceName}
        </Text>
      </Row>
      <Row justify="center">
        <Text className="customer-name">
          Khách hàng: {customerName}
        </Text>
      </Row>
      <div className="ticket-footer">
        <Row>
          <Col span={24}>
            <Text className="footer-text">
              Thời gian cấp: {issueTime}
            </Text>
          </Col>
          <Col span={24}>
            <Text className="footer-text">
              Hạn sử dụng: {expiryTime}
            </Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default TicketDisplay;
