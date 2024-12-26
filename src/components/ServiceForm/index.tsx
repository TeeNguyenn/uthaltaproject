import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Checkbox, message, notification } from 'antd';
import './ServiceForm.css';
import { getServiceData } from '../../pages/dashboard/Dashboard.logic';

interface ServiceFormProps {
  handleSendStatus?: any;
  handleUpdateCancel?: any;
  initialValues?: any;
  setDisplayData?: any;
}

const ServiceForm = (props: ServiceFormProps) => {
  const [form] = Form.useForm();
  const token = localStorage.getItem("token") ?? "";


  useEffect(() => {

    if (Object.keys(props.initialValues).length > 0) {
      form.setFieldsValue({
        serviceCode: props.initialValues.serviceCode,
        serviceName: props.initialValues.serviceName,
        description: props.initialValues.description,
      })
    }

  }, [props.initialValues])

  const handleFinish = async (values: any) => {
    console.log('Form Values:', values);

    try {

      if (Object.keys(props.initialValues).length > 0) {
        const response = await fetch(process.env.REACT_APP_API_URL + 'api/Service/' + props.initialValues.serviceCode, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            serviceCode: values.serviceCode,
            serviceName: values.serviceName,
            description: values.description,
            // isInOperation: true,
          }),
        });

        if (response.ok) {
          const data = await response.text();
          console.log(data);

          const serviceList = await getServiceData();
          props.setDisplayData(serviceList)

          form.resetFields();

          props.handleUpdateCancel();

          notification.success({
            message: "Cập nhật dịch vụ thành công."
          })

        } else {
          message.error('Lỗi');
        }

      } else {
        const response = await fetch(process.env.REACT_APP_API_URL + 'api/Service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            serviceCode: values.serviceCode,
            serviceName: values.serviceName,
            description: values.description,
            isInOperation: true,
          }),
        });

        if (response.ok) {
          const data = await response.text();
          console.log(data);

          form.resetFields();

          props.handleSendStatus(false);

          notification.success({
            message: "Thêm dịch vụ thành công."
          })

        } else {
          message.error('Lỗi');
        }
      }
    } catch (error) {
      // message.error('An error occurred.');

      console.log(error);

    }
  };

  return (
    <div className="service-form-container">
      <h2 className="service-form-title">Quản lý dịch vụ</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="service-form"
      >
        <Row gutter={24}>
          {/* Thông tin dịch vụ */}
          <Col xs={24} lg={12}>
            <Form.Item
              name="serviceCode"
              label="Mã dịch vụ"
              rules={[{ required: true, message: 'Mã dịch vụ là bắt buộc' }]}
            >
              <Input placeholder="Nhập mã dịch vụ" disabled={Object.keys(props.initialValues).length > 0} />
            </Form.Item>
            <Form.Item
              name="serviceName"
              label="Tên dịch vụ"
              rules={[{ required: true, message: 'Tên dịch vụ là bắt buộc' }]}
            >
              <Input placeholder="Nhập tên dịch vụ" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="description" label="Mô tả">
              <Input.TextArea placeholder="Mô tả dịch vụ" rows={4} />
            </Form.Item>
          </Col>
        </Row>
        {/* Quy tắc cấp số */}
        <div className="rules-section">
          <h3>Quy tắc cấp số</h3>
          <Row gutter={24}>
            <Col xs={24} lg={12}>
              <Form.Item name="autoIncrement">
                <Checkbox>Tăng tự động từ</Checkbox>
              </Form.Item>
              <div className="rule-input-group">
                <Input placeholder="0001" style={{ width: '40%' }} />
                <span className="to-text">đến</span>
                <Input placeholder="9999" style={{ width: '40%' }} />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name="prefix">
                <Checkbox>Prefix</Checkbox>
              </Form.Item>
              <Input placeholder="0001" style={{ width: '100%' }} />
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name="surfix">
                <Checkbox>Surfix</Checkbox>
              </Form.Item>
              <Input placeholder="0001" style={{ width: '100%' }} />
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name="resetDaily">
                <Checkbox>Reset mỗi ngày</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </div>
        {/* Nút hành động */}
        <Form.Item>
          <div className="form-actions">
            <Button htmlType="button">Hủy bỏ</Button>
            <Button type="primary" htmlType="submit">
              {Object.keys(props.initialValues).length > 0 ? "Cập nhật" : "Thêm dịch vụ"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ServiceForm;
