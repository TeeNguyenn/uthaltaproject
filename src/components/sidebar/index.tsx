// components/Sidebar/Sidebar.tsx
import React, { useState, useContext } from "react";
import { Menu } from "antd";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import {
  DashboardOutlined,
  DesktopOutlined,
  FileOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";
import "./HoverMenu.css";
import { SignalRContext } from "../../helpers/SignalRProvider";
type SideBarProps = {
  sendSelectedIndex: (index: number) => void;
}
const Sidebar = (props: SideBarProps) => {
  const [selected, setSelected] = useState(0);
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);
  const connection = useContext(SignalRContext);
  const handleMouseEnter = () => {
    setSubMenuVisible(!isSubMenuVisible);
    setSelected(7)
  };

  const handleMouseLeave = () => {
    setSubMenuVisible(false);
  };
  const handleMenuClick = (index: number) => {
    props.sendSelectedIndex(index);
    setSelected(index)
  }
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="./images/Logo.png" alt="Logo" />
      </div>
      <Menu
        mode="vertical"
        theme="light"
        defaultSelectedKeys={["1"]}
        className="menu"
      >
        <Menu.Item key="1" icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M18.3333 9.08366V3.41699C18.3333 2.16699 17.8 1.66699 16.475 1.66699H13.1083C11.7833 1.66699 11.25 2.16699 11.25 3.41699V9.08366C11.25 10.3337 11.7833 10.8337 13.1083 10.8337H16.475C17.8 10.8337 18.3333 10.3337 18.3333 9.08366Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.3333 16.583V15.083C18.3333 13.833 17.8 13.333 16.475 13.333H13.1083C11.7833 13.333 11.25 13.833 11.25 15.083V16.583C11.25 17.833 11.7833 18.333 13.1083 18.333H16.475C17.8 18.333 18.3333 17.833 18.3333 16.583Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.75 10.917V16.5837C8.75 17.8337 8.21666 18.3337 6.89166 18.3337H3.525C2.2 18.3337 1.66666 17.8337 1.66666 16.5837V10.917C1.66666 9.66699 2.2 9.16699 3.525 9.16699H6.89166C8.21666 9.16699 8.75 9.66699 8.75 10.917Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.75 3.41699V4.91699C8.75 6.16699 8.21666 6.66699 6.89166 6.66699H3.525C2.2 6.66699 1.66666 6.16699 1.66666 4.91699V3.41699C1.66666 2.16699 2.2 1.66699 3.525 1.66699H6.89166C8.21666 1.66699 8.75 2.16699 8.75 3.41699Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>}
          className={`item ${selected === 0 ? 'active' : ''}`}
          onClick={() => handleMenuClick(0)}
        >
          <p className="text">Dashboard</p>
        </Menu.Item>
        {localStorage.getItem('userRole') != 'Doctor' ? <>
          <Menu.Item key="2"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5.36666 1.66699H14.625C17.5917 1.66699 18.3333 2.40866 18.3333 5.36699V10.642C18.3333 13.6087 17.5917 14.342 14.6333 14.342H5.36666C2.40833 14.3503 1.66666 13.6087 1.66666 10.6503V5.36699C1.66666 2.40866 2.40833 1.66699 5.36666 1.66699Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 14.3496V18.3329"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.66666 10.833H18.3333"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.25 18.333H13.75"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            className={`item ${selected === 1 ? 'active' : ''}`}
            onClick={() => handleMenuClick(1)}
          >
            <p className="text">Thiết bị</p>
          </Menu.Item>
          <Menu.Item key="3"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
              >
                <path
                  d="M21 7.18601C21 9.06092 19.9887 10.7464 18.3785 11.9193C18.3228 11.9583 18.2921 12.0251 18.2893 12.092L18.2197 13.9168C18.2113 14.1619 17.9411 14.304 17.7349 14.1731L16.1888 13.2008C16.1888 13.2008 16.1888 13.2008 16.186 13.2008C16.0968 13.1423 15.9882 13.1256 15.8879 13.1562C14.9685 13.4431 13.9684 13.6019 12.9209 13.6019C12.907 13.6019 12.893 13.6019 12.8791 13.6019C12.907 13.4181 12.9209 13.2314 12.9209 13.042C12.9209 10.426 10.252 8.30594 6.95906 8.30594C6.28209 8.30594 5.63297 8.39509 5.02564 8.55946C4.90306 8.1165 4.83899 7.65404 4.83899 7.18044C4.83899 3.63398 8.45509 0.761719 12.9181 0.761719C17.3839 0.767291 21 3.64234 21 7.18601Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
                <path
                  d="M5.02842 8.56445C2.68547 9.20242 1 10.9687 1 13.047C1 14.4288 1.74662 15.6741 2.93342 16.5405C2.97521 16.5711 2.99749 16.6185 3.00028 16.6686L3.05042 18.0142C3.056 18.1953 3.25658 18.2984 3.40981 18.2037L4.55203 17.4849C4.56038 17.4793 4.57153 17.471 4.57989 17.4654C4.62167 17.432 4.67739 17.4208 4.72754 17.4376C5.41844 17.6604 6.17064 17.783 6.96183 17.783C10.0152 17.783 12.5336 15.9582 12.8819 13.6069"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
              </svg>
            }
            className={`item ${selected === 5 ? 'active' : ''}`}
            onClick={() => handleMenuClick(5)}
          >

            <p className="text"> Dịch vụ</p>

          </Menu.Item>
        </> : null}
        <Menu.Item key="4"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_5965_3362)">
                <path
                  d="M1.66666 14.167L10 18.3337L18.3333 14.167"
                  stroke="currentColor"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.66666 10L10 14.1667L18.3333 10"
                  stroke="currentColor"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 1.66699L1.66666 5.83366L10 10.0003L18.3333 5.83366L10 1.66699Z"
                  stroke="currentColor"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_5965_3362">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>}
          className={`item ${selected === 6 ? 'active' : ''}`}
          onClick={() => handleMenuClick(6)}
        >

          <p className="text">Cấp số</p>

        </Menu.Item>
        {/* {localStorage.getItem('userRole') != 'Doctor' ? <>
          <Menu.Item key="6" icon={<SettingOutlined />} className="menu-item" onClick={handleMouseEnter}>
            Cài đặt hệ thống
          </Menu.Item>

        </> : null} */}
        <Menu.Item key="6"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.68578 18.0437L8.68301 18.0421L4.11493 15.4093C3.16175 14.7663 2.78258 14.4693 2.59073 14.1388C2.40772 13.8237 2.36667 13.4258 2.36667 12.4087V7.59199C2.36667 6.57339 2.40559 6.17441 2.58449 5.86024C2.77032 5.53392 3.13834 5.24176 4.07395 4.60765L8.67509 1.94996L8.67617 1.94933C9.02135 1.74879 9.49263 1.63574 9.9875 1.63574C10.4824 1.63574 10.9537 1.74879 11.2988 1.94933L11.3004 1.95024L15.8851 4.59142C16.8383 5.23437 17.2174 5.5314 17.4093 5.86181C17.5923 6.177 17.6333 6.57483 17.6333 7.59199V12.4003C17.6333 13.4189 17.5944 13.8179 17.4155 14.1321C17.2297 14.4584 16.8617 14.7506 15.9261 15.3847L11.3261 18.0417C11.3259 18.0418 11.3257 18.0419 11.3255 18.042C10.9669 18.2477 10.4907 18.3587 10 18.3587C9.50799 18.3587 9.03359 18.2472 8.68578 18.0437ZM4.23307 4.81747L4.21803 4.82616L4.20364 4.83587L4.18752 4.84675C3.86164 5.06666 3.59376 5.24744 3.38776 5.41047C3.17516 5.57872 2.99255 5.7551 2.86229 5.97965C2.72902 6.2094 2.67395 6.44876 2.64865 6.70466C2.62498 6.94414 2.62499 7.23234 2.625 7.56891L2.625 7.59199V12.4003L2.625 12.4238C2.62499 12.76 2.62498 13.0487 2.64928 13.2892C2.67533 13.5468 2.73203 13.7872 2.86795 14.0184C3.00031 14.2434 3.18561 14.4215 3.40206 14.5926C3.61237 14.7588 3.88614 14.9441 4.22055 15.1703L4.23646 15.1811L4.2513 15.1911L4.26681 15.2001L8.81681 17.8251L8.81702 17.8252C9.16297 18.0246 9.60364 18.1045 10.0042 18.1045C10.4047 18.1045 10.8454 18.0246 11.1913 17.8252L11.1919 17.8249L15.7753 15.1748L15.7909 15.1658L15.8059 15.1556L15.822 15.1447C16.1458 14.9248 16.4121 14.744 16.6169 14.5809C16.8284 14.4125 17.01 14.236 17.1394 14.0115C17.2718 13.782 17.3264 13.5429 17.3515 13.2874C17.375 13.048 17.375 12.76 17.375 12.4233V12.4003V7.59199V7.56856C17.375 7.23229 17.375 6.94359 17.3507 6.70316C17.3247 6.44552 17.268 6.20512 17.132 5.97396C16.9997 5.74887 16.8144 5.57082 16.5979 5.39973C16.3876 5.23349 16.1138 5.04824 15.7794 4.82195L15.7635 4.81122L15.7487 4.80118L15.7332 4.79223L11.1862 2.16898C11.1857 2.16867 11.1851 2.16836 11.1846 2.16805C10.8382 1.96552 10.3984 1.89199 10 1.89199C9.60156 1.89199 9.1617 1.96554 8.81523 2.16814L4.23307 4.81747Z"
                stroke="#A9A9B0"
              />
              <path
                d="M10 12.625C8.55114 12.625 7.375 11.4489 7.375 10C7.375 8.55114 8.55114 7.375 10 7.375C11.4489 7.375 12.625 8.55114 12.625 10C12.625 11.4489 11.4489 12.625 10 12.625ZM10 7.625C8.69052 7.625 7.625 8.69052 7.625 10C7.625 11.3095 8.69052 12.375 10 12.375C11.3095 12.375 12.375 11.3095 12.375 10C12.375 8.69052 11.3095 7.625 10 7.625Z"
                fill="#292D32"
                stroke="#A9A9B0"
              />
            </svg>
          }
          className={`item menu-item ${selected === 7 ? 'active' : ''}`} onClick={handleMouseEnter} >
          <p className="text">Cài đặt hệ thống</p>
        </Menu.Item>
        {isSubMenuVisible && (
          <div className="submenu"
            // onMouseOut={handleMouseLeave}
            onClick={handleMouseLeave}
            style={{ top: localStorage.getItem("userRole") === 'Doctor' ? 90 : 214 }}
          >
            <Menu mode="vertical" theme="light" className="submenu-content">
              <Menu.Item key="sub2"
                onClick={() => handleMenuClick(7)}
              >Quản lý tài khoản</Menu.Item>
              <Menu.Item key="sub3">Nhật ký người dùng</Menu.Item>
            </Menu>
          </div>
        )}
        <Menu.Item key="7" icon={<LogoutOutlined />}
          onClick={async () => {
            if (connection)
              if (connection.state == HubConnectionState.Connected) {
                connection.invoke("UserDisconnected", localStorage.getItem('userName'));
              }
            const userName = localStorage.getItem("userName");
            const response = await fetch(process.env.REACT_APP_API_URL + 'api/Authenticate/logout/' + userName, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" }
            });
            if (!response.ok) {
              console.error("Failed to refresh token:", response.status);
              //return false; // Return false if refreshing token fails
            } else {
              localStorage.clear();
              window.location.reload();
            }

          }}
          className="logout">
          <p style={{ fontSize: 16 }}>Đăng xuất</p>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
