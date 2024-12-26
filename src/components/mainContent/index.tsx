// components/MainContent/MainContent.tsx
import React, { useState, useEffect } from "react";
import InfoCard from "../inforCard";
import { CalendarOutlined, CheckCircleOutlined, PhoneOutlined, BookOutlined } from "@ant-design/icons";
import "./MainContent.css";
import ChartSection from "../charts";
import { getSummaryData } from "./MainContent.logic";
const MainContent: React.FC = () => {
  const token = localStorage.getItem('token') ?? '';
  const [cardsData, setCardsData] = useState([
    {
      icon: <CalendarOutlined style={{ color: "#409EFF" }} />,
      title: "Số thứ tự đã cấp",
      value: 4221,
      percentage: "32.41%",
      isPositive: true,
    },
    {
      icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
      title: "Số thứ tự đã sử dụng",
      value: 3721,
      percentage: "32.41%",
      isPositive: false,
    },
    {
      icon: <PhoneOutlined style={{ color: "#FA8C16" }} />,
      title: "Số thứ tự đang chờ",
      value: 468,
      percentage: "56.41%",
      isPositive: true,
    },
    {
      icon: <BookOutlined style={{ color: "#F5222D" }} />,
      title: "Số thứ tự đã bỏ qua",
      value: 32,
      percentage: "22.41%",
      isPositive: false,
    },
  ]);
  async function getStatistic() {
    let temp = await getSummaryData(token);
    setCardsData([
      {
        icon: <CalendarOutlined style={{ color: "#409EFF" }} />,
        title: "Số thứ tự đã cấp",
        value: temp.total,
        percentage: "100%",
        isPositive: true,
      },
      {
        icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
        title: "Số thứ tự đã sử dụng",
        value: temp.connected,
        percentage: Math.ceil(temp.connected * 100 / temp.total).toString() + '%',
        isPositive: false,
      },
      {
        icon: <PhoneOutlined style={{ color: "#FA8C16" }} />,
        title: "Số thứ tự đang chờ",
        value: temp.active,
        percentage: Math.ceil(temp.active * 100 / temp.total).toString() + '%',
        isPositive: true,
      },
      {
        icon: <BookOutlined style={{ color: "#F5222D" }} />,
        title: "Số thứ tự đã bỏ qua",
        value: temp.total - temp.active - temp.connected,
        percentage: Math.ceil((temp.total - temp.active - temp.connected) * 100 / temp.total).toString() + '%',
        isPositive: false,
      },
    ])
  }
  useEffect(() => {
    getStatistic();
  }, [])
  return (
    <div className="main-content">
      <h2>Biểu đồ cấp số</h2>
      <div className="info-cards">
        {cardsData.map((card, index) => (
          <InfoCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
            percentage={card.percentage}
            isPositive={card.isPositive}
          />
        ))}
      </div>
      <div className="info-cards">
        <ChartSection />
      </div>
    </div>
  );
};

export default MainContent;
