import React from 'react';
import { Form, Input, Checkbox, Button, Row, Col } from 'antd';
import './RoleForm.css';

const RoleForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log('Form Values:', values);
  };

  return (
    <div className="role-form-container">
      <h2 className="role-form-title">Danh sách vai trò</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="role-form"
      >
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <div className="form-section">
              <h3>Thông tin vai trò</h3>
              <Form.Item
                name="roleName"
                label="Tên vai trò"
                rules={[{ required: true, message: 'Tên vai trò là bắt buộc' }]}
              >
                <Input placeholder="Nhập tên vai trò" />
              </Form.Item>
              <Form.Item name="description" label="Mô tả">
                <Input.TextArea placeholder="Nhập mô tả" rows={4} />
              </Form.Item>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="form-section">
              <h3>Phân quyền chức năng</h3>
              <Form.Item
                name="permissions"
                rules={[{ required: true, message: 'Phân quyền là bắt buộc' }]}
              >
                <div className="permission-group">
                  <h4>Nhóm chức năng A</h4>
                  <Checkbox.Group>
                    <Row>
                      <Col span={24}>
                        <Checkbox value="allA">Tất cả</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="x">Chức năng x</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="y">Chức năng y</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="z">Chức năng z</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                  <h4>Nhóm chức năng B</h4>
                  <Checkbox.Group>
                    <Row>
                      <Col span={24}>
                        <Checkbox value="allB">Tất cả</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="x">Chức năng x</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="y">Chức năng y</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="z">Chức năng z</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </div>
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Form.Item>
          <div className="form-actions">
            <Button htmlType="button">Hủy bỏ</Button>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RoleForm;
