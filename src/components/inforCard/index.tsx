// components/MainContent/InfoCard.tsx
import React from "react";
import "./InfoCard.css";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  percentage: string;
  isPositive: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  value,
  percentage,
  isPositive,
}) => {
  return (
    <div className="info-card">
      <div className="info-card-header">
        <div className="icon">{icon}</div>
        <p>{title}</p>
      </div>
      <div className="info-card-body">
        <h3>{value.toLocaleString()}</h3>
        <span
          className={`percentage ${isPositive ? "positive" : "negative"}`}
        >
          {isPositive ? "↑" : "↓"} {percentage}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
