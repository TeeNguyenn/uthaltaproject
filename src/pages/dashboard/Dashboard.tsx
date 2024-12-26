import React, { useState, useEffect } from "react";
import { Tag } from "antd";
import './styles.css'
import Device from "../../components/device";
import Sidebar from "../../components/sidebar";
import MainContent from "../../components/mainContent";
import RightSidebar from "../../components/rightSidebar";
import DeviceForm from "../../components/DeviceForm";
import DeviceDetails from "../../components/DeviceDetails";
import DeviceUpdateForm from "../../components/DeviceUpdateForm";
import { getServiceData } from "./Dashboard.logic";
import AccountForm from "../../components/AccountForm";
const Dashboard = () => {
  const [dataUserEdit, setDataUserEdit] = useState<any>({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [serviceOptions, setServiceOptions] = useState<{ value: string, label: string }[]>([])
  const handleReceiveSelectedIndex = (index: number) => {
    setSelectedIndex(index);
  }
  const handleReceiveIndexFromDevice = (index: number, data: any) => {
    setDataUserEdit(data);
    setSelectedIndex(index);
  }
  const handleReceiveState = (status: boolean) => {
    if (!status) {
      setSelectedIndex(5);
    }
  }
  const handleUpdate = (updatedData: any) => {
    console.log('Cập nhật dữ liệu:', updatedData);
  };
  const handleCancel = () => {
    console.log('Hủy cập nhật');
  };
  useEffect(() => {
    async function getDataSvc() {
      let srvData = await getServiceData();
      setServiceOptions(srvData);
    }
    getDataSvc();
  }, [])
  return (
    <div className="container">
      <Sidebar sendSelectedIndex={handleReceiveSelectedIndex} />
      {selectedIndex == 0 ?
        <div className="rightContainer">
          <MainContent />
          <RightSidebar />
        </div>
        : selectedIndex == 1 ?
          <Device
            key={`device-index-1`}
            buttonText="Thêm thiết bị"
            headerText="Thiết bị > Danh sách thiết bị"
            columns={1} filter1="Trạng thái hoạt động" filter2="Trạng thái kết nối"
          />
          : selectedIndex == 2 ?
            null
            : selectedIndex == 3 ?
              null
              : selectedIndex == 4 ?
                null
                : selectedIndex == 5 ?
                  <Device headerText="Dịch vụ > Danh sách dịch vụ" buttonText="Thêm dịch vụ"
                    key={`device-index-5`}
                    columns={2} filter1="Trạng thái hoạt động" filter2="Chọn thời gian"
                  />
                  : selectedIndex == 6 ? <Device headerText="Cấp số > Danh sách các số đã cấp"
                    buttonText="Cấp số mới"
                    key={`device-index-6`}
                    columns={3} filter1="Tên dịch vụ" filter2="Tình trạng"
                  />
                    : selectedIndex == 7 ?
                      <Device headerText="Tài khoản người dùng > Danh sách tài khoản"
                        buttonText="Thêm người dùng"
                        key={`device-index-7`}
                        columns={4} filter1="Tên vai trò" filter2="Trạng thái"
                      />
                      : <AccountForm myForm={dataUserEdit} serviceOptions={serviceOptions}
                        handleSendStatus={handleReceiveState}
                      />
      }
    </div>
  )
}
export default Dashboard;