// components/RightSidebar/RightSidebar.tsx
import React, { useEffect, useState } from "react";
import { Calendar } from "antd";
import SummaryItem from "../summaryItem";
import { LaptopOutlined, SettingOutlined, FileTextOutlined, BellOutlined } from "@ant-design/icons";
import "./RightSidebar.css";
import { getSummaryData } from "./RightSidebar.logic";


const RightSidebar: React.FC = () => {
  const [summaryData, setSummaryData] = useState<any>([]);
  useEffect(() => {
    async function getData() {
      let summaryTemp = await getSummaryData();
      console.log(summaryTemp);
      if (summaryTemp.length == 3) {
        setSummaryData([{
          key: 1, title: "Thiết bị", percentage: Math.ceil(summaryTemp[0].active * 100 / summaryTemp[0].total),
          value: summaryTemp[0].total,
          icon:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M3.75663 1.16699H10.2375C12.3141 1.16699 12.8333 1.68616 12.8333 3.75699V7.44949C12.8333 9.52616 12.3141 10.0395 10.2433 10.0395H3.75663C1.68579 10.0453 1.16663 9.52616 1.16663 7.45533V3.75699C1.16663 1.68616 1.68579 1.16699 3.75663 1.16699Z"
                stroke="#FF7506"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 10.0449V12.8333"
                stroke="#FF7506"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.16663 7.58301H12.8333"
                stroke="#FF7506"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.375 12.833H9.625"
                stroke="#FF7506"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>,
          color: "#FF7506",
          active: summaryTemp[0].active, inactive: summaryTemp[0].total - summaryTemp[0].active
        }, {
          key: 2, title: "Dịch vụ", percentage: Math.ceil(summaryTemp[1].active * 100 / summaryTemp[1].total), value: summaryTemp[1].total,
          active: summaryTemp[1].active, inactive: summaryTemp[1].total - summaryTemp[1].active,
          color: "#4277FF",
          icon:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
            >
              <path
                d="M14.7704 5.7304C14.7704 7.04284 14.0591 8.22267 12.9266 9.04368C12.8874 9.07098 12.8658 9.11778 12.8639 9.16459L12.8149 10.4419C12.809 10.6135 12.6189 10.713 12.4739 10.6213L11.3864 9.94074C11.3864 9.94074 11.3864 9.94074 11.3845 9.94074C11.3218 9.89978 11.2453 9.88808 11.1748 9.90954C10.5282 10.1104 9.82472 10.2216 9.08797 10.2216C9.07817 10.2216 9.06837 10.2216 9.05857 10.2216C9.07817 10.0928 9.08797 9.96219 9.08797 9.82958C9.08797 7.99841 7.2108 6.51436 4.89472 6.51436C4.41857 6.51436 3.96201 6.57676 3.53485 6.69182C3.44863 6.38175 3.40356 6.05802 3.40356 5.7265C3.40356 3.24398 5.94695 1.2334 9.08601 1.2334C12.227 1.2373 14.7704 3.24983 14.7704 5.7304Z"
                stroke="#4277FF"
                stroke-width="1.10526"
                stroke-miterlimit="10"
              />
              <path
                d="M3.53675 6.69531C1.88884 7.14189 0.703369 8.37828 0.703369 9.83308C0.703369 10.8003 1.22851 11.6721 2.06324 12.2785C2.09263 12.3 2.1083 12.3331 2.11026 12.3682L2.14553 13.3102C2.14945 13.4369 2.29053 13.5091 2.3983 13.4428L3.20168 12.9396C3.20756 12.9357 3.2154 12.9299 3.22128 12.926C3.25067 12.9026 3.28986 12.8948 3.32513 12.9065C3.81108 13.0625 4.34013 13.1483 4.89662 13.1483C7.04419 13.1483 8.81555 11.871 9.06048 10.2251"
                stroke="#4277FF"
                stroke-width="1.10526"
                stroke-miterlimit="10"
              />
            </svg>,
        }, {
          key: 3,
          percentage: Math.ceil(summaryTemp[2].active * 100 / summaryTemp[2].total),
          title: "Cấp số",
          value: summaryTemp[2].total,
          active: summaryTemp[2].active,
          inactive: summaryTemp[2].total - summaryTemp[2].active,
          color: "#35C75A",
          icon:
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clip-path="url(#clip0_201_18603)">
                <path
                  d="M1.16663 9.91699L6.99996 12.8337L12.8333 9.91699"
                  stroke="#35C75A"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.16663 7L6.99996 9.91667L12.8333 7"
                  stroke="#35C75A"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.99996 1.16699L1.16663 4.08366L6.99996 7.00033L12.8333 4.08366L6.99996 1.16699Z"
                  stroke="#35C75A"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_201_18603">
                  <rect
                    width="14"
                    height="14"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>,
        },])
      }
    }
    getData();
  }, [])
  return (
    <div className="right-sidebar">
      <div className="user__info">
        <BellOutlined className="notification-icon" />
        <div>
          <img src={localStorage.getItem("avatar") || "./images/default-avatar.jpg"} alt="" className="avatar" />
        </div>
        <div className="user">
          <p>Xin chào</p>
          <h3>{localStorage.getItem('userFullName')}</h3>
        </div>
      </div>
      <h2>Tổng quan</h2>
      <div className="summary">
        {summaryData.map((item: any) => (
          <SummaryItem
            key={item.key}
            percentage={item.percentage}
            title={item.title}
            value={item.value}
            active={item.active}
            inactive={item.inactive}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
      <div className="summary calendar">
        <Calendar fullscreen={false} />
      </div>
    </div>
  );
};

export default RightSidebar;
