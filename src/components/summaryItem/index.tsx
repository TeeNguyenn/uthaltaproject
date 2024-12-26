// components/RightSidebar/SummaryItem.tsx
import React, { useState } from "react";
import { Progress } from "antd";
import styles from "./SummaryItem.module.css";
import './styles.css'

interface SummaryItemProps {
  percentage: number;
  title: string;
  value: number;
  active: number;
  inactive: number;
  icon: React.ReactNode;
  color: string; // Color for title and progress bar
};
const SummaryItem = (props: SummaryItemProps) => {
  const [degree, setDegree] = useState(Math.ceil(props.percentage * 360 / 100));
  // return (
  //   <div className={styles.summaryItem}>
  //     <div className={styles.summaryItemLeft}>
  //       <div className={styles.columnFirst}
  //         style={{ background: `conic-gradient(red 0deg ${degree}deg, transparent ${degree}deg 360deg)` }}>
  //         <div className={styles.coverCircle}>
  //           <div className={styles.firstCircle}
  //             style={{ background: `conic-gradient(gray 0deg ${360 - degree}deg, transparent ${360 - degree}deg 360deg)` }}
  //           >
  //             <div className={styles.innerCircle}>
  //               <p>{props.percentage}%</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className={styles.summaryItemRight}>
  //       <h4 style={{ color: 'red' }}>
  //         {props.value} <span>{props.icon}</span>
  //       </h4>
  //       <p className={styles.detailsp}>{props.title}</p>
  //       <div className={styles.details}>
  //         <p className={styles.detailsp}>
  //           <span className="dot" style={{ backgroundColor: props.color }}></span>
  //           Đang hoạt động: <strong>{props.active}</strong>
  //         </p>
  //         <p className={styles.detailsp}>
  //           <span className="dot" style={{ backgroundColor: "#999" }}></span>
  //           Ngừng hoạt động: <strong>{props.inactive}</strong>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="summary__item">
      {/* Circle */}
      <div
        className="circle"
        style={{
          background: `conic-gradient(${props.color} 0deg ${degree}deg, transparent ${degree}deg 360deg)`,
        }}
      >
        <div className="white-circle">
          <div
            className="second-circle"
            style={{
              background: `conic-gradient(#7E7D88 0deg ${360 - degree
                }deg, transparent ${360 - degree
                }deg 360deg)`,
            }}
          >
            <div className="second-inner-circle">
              <p style={{ fontSize: 16 }}>
                {Math.round((degree * 100) / 360)}%
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Quantity */}
      <div className="quanity">
        <p className="number">{props.value}</p>
        <div className="quantity-bottom">
          {props.icon}
          <p className="quantity-name" style={{ color: props.color }}>{props.title}</p>
        </div>
      </div>
      {/* Action */}
      <div className="actions">
        <div className="row">
          <div className="actions-circle" style={{ background: props.title !== "Thiết bị" ? props.color : "#ffd130" }}></div>
          <p className="status">{props.title === "Cấp số" ? "Đang chờ" : "Đang hoạt động"}</p>
          <p className="actions-quantity" style={{ color: props.color }}>
            {props.active}
          </p>
        </div>
        <div className="row">
          <div className="actions-circle"></div>
          <p className="status">
            {props.title === "Cấp số" ? "Đã sử dụng" : "Ngưng hoạt động"}
          </p>
          <p className="actions-quantity" style={{ color: props.color }}>
            {props.inactive}
          </p>
        </div>
      </div>
    </div>
  )
}
export default SummaryItem;
