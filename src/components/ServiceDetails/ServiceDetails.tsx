import React from 'react';
import './style.css';
import { Checkbox, DatePicker, Table } from 'antd';
import type { CheckboxProps, GetProps, Input, TableProps } from 'antd';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Search from 'antd/es/input/Search';

interface DataType {
    key: string;
    activeStatus: string;
}

type SearchProps = GetProps<typeof Input.Search>;

dayjs.extend(customParseFormat);
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Số thứ tự',
        dataIndex: 'key',
        key: 'key',
    },

    {
        title: 'Trạng thái',
        dataIndex: 'activeStatus',
        key: 'activeStatus',
        render: (text) => (
            <div className="service-detail-status">
                <div className="service-detail-status-circle active"></div>
                <div>{text}</div>
            </div>
        ),
    },
];

const data: DataType[] = [
    {
        key: '2010001',
        activeStatus: 'Đã hoàn thành',
    },
    {
        key: '2010001',
        activeStatus: 'Đã hoàn thành',
    },
    {
        key: '2010001',
        activeStatus: 'Đã hoàn thành',
    },
    {
        key: '2010001',
        activeStatus: 'Đã hoàn thành',
    },
    {
        key: '2010001',
        activeStatus: 'Đã hoàn thành',
    },
    {
        key: '2010001',
        activeStatus: 'Đã hoàn thành',
    },
    {
        key: '2010001',
        activeStatus: 'Đã hoàn thành',
    },
];

interface ServiceDetailProps {
    dataUserEdit: any
}

const ServiceDetail = (props: ServiceDetailProps) => {
    const isUpdate = false;
    const options: SelectProps['options'] = [
        {
            label: 'Tất cả',
            value: 'Tất cả',
        },
        {
            label: 'Khám tim mạch',
            value: 'Khám tim mạch',
        },
        {
            label: 'Khám sản phụ khoa',
            value: 'Khám sản phụ khoa',
        },
        {
            label: 'Khám răng hàm mặt',
            value: 'Khám răng hàm mặt',
        },
        {
            label: 'Khám tai mũi họng',
            value: 'Khám tai mũi họng',
        },
        {
            label: 'Khám hô hấp',
            value: 'Khám hô hấp',
        },
        {
            label: 'Khám tổng quát',
            value: 'Khám tổng quát',
        },
    ];

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleChange1 = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
        console.log(info?.source, value);

    return (
        <div className="service-detail">
            <div className="service-detail__container">
                <div className="service-detail__row">
                    <div className="service-detail__left">
                        <h2 className="service-detail__heading">
                            Thông tin dịch vụ
                        </h2>
                        <div className="service-detail__group">
                            <label htmlFor="" className="service-detail__label">
                                Mã dịch vụ:
                            </label>
                            <p className="service-detail__value">{props.dataUserEdit.serviceCode}</p>
                        </div>
                        <div className="service-detail__group">
                            <label htmlFor="" className="service-detail__label">
                                Tên dịch vụ:
                            </label>
                            <p className="service-detail__value">
                                {props.dataUserEdit.serviceName}
                            </p>
                        </div>
                        <div className="service-detail__group">
                            <label htmlFor="" className="service-detail__label">
                                Mô tả:
                            </label>
                            <p className="service-detail__value">
                                {props.dataUserEdit.description}

                            </p>
                        </div>
                        <h2
                            className="service-detail__heading"
                            style={{ marginTop: 16 }}
                        >
                            Quy tắc cấp số
                        </h2>
                        <div className="service-detail__wrapper">
                            <p className="service-detail__checkbox">
                                Tăng tự động từ:
                            </p>
                            <div className="service-detail__range-wrapper">
                                <input
                                    type="number"
                                    className="service-detail__range"
                                    placeholder="0001"
                                />
                                đến
                                <input
                                    type="number"
                                    className="service-detail__range"
                                    placeholder="9999"
                                />
                            </div>
                        </div>
                        <div className="service-detail__wrapper">
                            <p className="service-detail__checkbox">Prefix:</p>
                            <div className="service-detail__range-wrapper">
                                <input
                                    type="number"
                                    className="service-detail__range"
                                    placeholder="0001"
                                />
                            </div>
                        </div>
                        <div className="service-detail__wrapper">
                            <p className="service-detail__checkbox">
                                Reset mỗi ngày
                            </p>
                        </div>
                        <p className="service-detail__example">
                            Ví dụ: 201-2001
                        </p>
                    </div>
                    <div className="service-detail__right">
                        <div className="service-detail-container">
                            <div className="service-detail-row">
                                <div className="service-detail-select">
                                    <p className="service-detail-select-text">
                                        Trạng thái
                                    </p>
                                    <Select
                                        defaultValue="all"
                                        style={{ width: 120 }}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'all', label: 'Tất cả' },
                                            {
                                                value: 'completed',
                                                label: 'Đã hoàn thành',
                                            },
                                            {
                                                value: 'implemented',
                                                label: 'Đã thực hiện',
                                            },
                                            {
                                                value: 'absent',
                                                label: 'Vắng',
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="service-detail-select">
                                    <p className="service-detail-select-text">
                                        Chọn thời gian
                                    </p>
                                    <div className="service-detail-select-row">
                                        <DatePicker
                                            defaultValue={dayjs(
                                                '01/11/2024',
                                                dateFormatList[0]
                                            )}
                                            format={dateFormatList}
                                            suffixIcon={
                                                <img
                                                    src="./images/calendar.png"
                                                    alt="icon"
                                                ></img>
                                            }
                                            className="service-detail-date-picker"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="10"
                                            viewBox="0 0 12 10"
                                            fill="none"
                                        >
                                            <path
                                                d="M8.13346 4.46129L6.9735 3.75776L5.08342 2.61138C4.68302 2.37211 4 2.54353 4 2.88637V5.11126V7.11474C4 7.45758 4.68302 7.629 5.08342 7.38616L8.13346 5.53624C8.62218 5.2434 8.62218 4.75771 8.13346 4.46129Z"
                                                fill="#535261"
                                            />
                                        </svg>
                                        <DatePicker
                                            defaultValue={dayjs(
                                                '01/11/2024',
                                                dateFormatList[0]
                                            )}
                                            format={dateFormatList}
                                            suffixIcon={
                                                <img
                                                    src="./images/calendar.png"
                                                    alt="icon"
                                                ></img>
                                            }
                                            className="service-detail-date-picker"
                                        />
                                    </div>
                                </div>
                                <div className="service-detail-search">
                                    <p className="service-detail-search-text">
                                        Từ khoá

                                    </p>
                                    <Search
                                        placeholder="Nhập từ khóa"
                                        onSearch={onSearch}
                                        enterButton
                                    />
                                </div>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Table<DataType>
                                    columns={columns}
                                    dataSource={data}
                                    className="service-detail-table"
                                />
                                {/* <div
                                    className="service-detail-add-btn"
                                    // onClick={() => props.handleSelected(11)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"
                                            fill="#FF9138"
                                        />
                                    </svg>
                                    <p className="service-detail-add-btn-text">
                                        Thêm dịch vụ
                                    </p>
                                </div> */}
                                <div className="service-detail-bottom">
                                    <div className="service-detail-prev">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M15 7L9 12L15 17"
                                                fill="#A9A9B0"
                                            />
                                            <path
                                                d="M15 7L9 12L15 17L15 7Z"
                                                stroke="#A9A9B0"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <div className="service-detail-paging active">
                                        1
                                    </div>
                                    <div className="service-detail-paging">
                                        2
                                    </div>
                                    <div className="service-detail-paging">
                                        3
                                    </div>
                                    <div className="service-detail-paging">
                                        4
                                    </div>
                                    <div className="service-detail-paging">
                                        5
                                    </div>
                                    <div className="service-detail-paging">
                                        ...
                                    </div>
                                    <div className="service-detail-paging">
                                        10
                                    </div>
                                    <div className="service-detail-next">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M9 17L15 12L9 7"
                                                fill="#7E7D88"
                                            />
                                            <path
                                                d="M9 17L15 12L9 7L9 17Z"
                                                stroke="#7E7D88"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
