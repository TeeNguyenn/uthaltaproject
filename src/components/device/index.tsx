// components/DeviceList.tsx
import React, { useEffect, useState, useContext } from "react";
import { Table, Select, Input, Modal, Tag, DatePicker, Popconfirm, notification, message } from "antd";
import _ from 'lodash';
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./DeviceList.css";
import AddDeviceButton from "../AddDeviceButton";
import UserSection from "../userSection";
import NewQueueForm from "../NewQueueForm";
import { formatDate } from '../../pages/dashboard/Dashboard.logic';
import { getProvidedNumber, getDeviceData, getServiceData, getUserData } from "../../pages/dashboard/Dashboard.logic";
import AccountForm from "../AccountForm";
import DeviceForm from "../DeviceForm";
import { UserStatus, DeviceStatus, DeviceConnected, UserRole, NumberStatus } from "../../helpers/predefinedData";
import ServiceForm from "../ServiceForm";
import { SignalRContext } from "../../helpers/SignalRProvider";
import TicketDisplay from "../TicketDisplay/TicketDisplay";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import DeviceDetails from "../DeviceDetails";
import DeviceUpdateForm from "../DeviceUpdateForm";
import UserInfo from "../UserInfo/UserInfo";
import QueueDetails from "../QueueDetails";
import ServiceDetail from "../ServiceDetails/ServiceDetails";

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD'
const { Option } = Select;
type DeviceListProps = {
  columns: number;
  headerText: string;
  buttonText: string;
  filter1: string;
  filter2: string;
}
const initialValues = {
  fullName: "", // Pre-fill the username field
  email: "", // Pre-fill the email field
  phoneNumber: "",
}
const DeviceList = React.memo((props: DeviceListProps) => {
  const userRole = localStorage.getItem('userRole') ?? "";
  const connection = useContext(SignalRContext);
  const token = localStorage.getItem('token');
  const [filter1Value, setFilter1Value] = useState('All');
  const [filter2Value, setFilter2Value] = useState('All');
  const [status, setStatus] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState("");
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState(userRole !== 'Doctor' ? dayjs().add(1, 'day').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));   // current Day: dayjs().format('YYYY-MM-DD'),  Next day: dayjs().add(1, 'day').format('YYYY-MM-DD')
  const [endValue, setEndValue] = useState(dayjs().format('YYYY-MM-DD'));
  const [deviceCode, setDeviceCode] = useState("All");


  const [loading, setLoading] = useState(false);
  const [internalData, setInternalData] = useState<any>([]);
  const [displayData, setDisplayData] = useState<any>([]);
  const [serviceOptions, setServiceOptions] = useState<{ value: string, label: string }[]>([])
  const [deviceOptions, setDeviceOptions] = useState<{ value: string, label: string }[]>([])

  const [internalColumns, setInternalColumns] = useState<any>([]);

  const [dataUserEdit, setDataUserEdit] = useState<any>({});

  const [isModelNumberOpen, setIsModalNumberOpen] = useState(false);
  const [newNumber, setNewNumber] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [assignmentDate, setAssignmentDate] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');

  const [detailData, setDetailData] = useState<any>({});
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);



  const debouncedSearch = _.debounce((filter1Value, filter2Value, searchValue) => {
    handleSearch(filter1Value, filter2Value, searchValue);
  }, 300);
  const debouncedSearchNumber = _.debounce((service, start, end, deviceCode, searchText, status) => {
    handleSearchNumber(service, start, end, deviceCode, searchText, status);
  }, 300);
  const handleInputChange = (e: any, columnProp: number) => {
    const value = e.target.value;
    if (columnProp == 4)
      debouncedSearch(filter1Value, filter2Value, value);
    else
      debouncedSearchNumber(filter1Value, start, end, deviceCode, value, filter2Value)
  };
  const receiveStatus = (status: boolean) => {
    setIsModalOpen(status);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const customPagination = {
    current: currentPage,          // Current page number
    pageSize: pageSize,        // Number of items per page
    total: totalRecords,          // Total number of items
    showSizeChanger: true,
    pageSizeOptions: ['10', '5', '2'], // Optional: Page size options
    // You can also specify other pagination properties like showSizeChanger, showTotal, etc.
    onChange: async (page: number) => {
      // Handle the page change event
      console.log(internalData);
      setCurrentPage(page);
    },
    onShowSizeChange: async (current: number, newSize: number) => {
      // Handle the page size change event
      setPageSize(newSize);
      // setCurrentPage(current)
      setCurrentPage(1)
    },
  };

  const receiveIsNumberDisplay = (status: boolean, data: any) => {
    if (status) {
      setCustomerName(data.customerName);
      setNewNumber(data.code);
      setServiceName(data.serviceName);
      setAssignmentDate(formatDate(data.assignmentDate));
      setIsModalOpen(false);
      setIsModalNumberOpen(true);
    }
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setDataUserEdit({});
    setIsModalOpen(false);
  };
  const handleNumberOk = () => {
    setIsModalNumberOpen(false);
  };

  const handleDetailOk = () => {
    setIsDetailModalOpen(false);
  };

  const handleUpdateOk = () => {
    setIsUpdateModalOpen(false);
  };

  const handleCancel = () => {
    setDataUserEdit({});
    setIsModalOpen(false);


  };

  const handleNumberCancel = () => {
    setIsModalNumberOpen(false);
  };

  const handleDetailCancel = () => {
    setIsDetailModalOpen(false);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
    setDataUserEdit({})
  };

  // Delete Item
  const confirm = async (record: any) => {
    console.log(record);

    switch (props.columns) {
      case 1:
        try {
          const response = await fetch(process.env.REACT_APP_API_URL + 'api/Device/' + record.deviceCode, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          if (response.ok) {
            const data = await response.text();

            const deviceList = await getDeviceData();
            setDisplayData(deviceList)

            notification.success({
              message: "Xóa thiết bị thành công."
            })

          } else {
            message.error('Lỗi');
          }
        } catch (error) {
          message.error('An error occurred.');
        }
        break;

      case 2:
        try {
          const response = await fetch(process.env.REACT_APP_API_URL + 'api/Service/' + record.serviceCode, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          if (response.ok) {
            const data = await response.text();

            const serviceList = await getServiceData();
            setDisplayData(serviceList)

            notification.success({
              message: "Xóa dịch vụ thành công."
            })

          } else {
            message.error('Lỗi');
          }
        } catch (error) {
          message.error('An error occurred.');
        }
        break;
      case 3:

        break;

      default:

        try {
          const response = await fetch(process.env.REACT_APP_API_URL + 'api/User/' + record.email, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          if (response.ok) {
            const data = await response.text();

            const userList = await getUserData(filter1Value, filter2Value, searchText, currentPage, pageSize);
            setDisplayData(userList)
            setLoading(false); // Hide the loading indicator


            notification.success({
              message: "Xóa tài khoản thành công."
            })

          } else {
            message.error('Lỗi');
          }
        } catch (error) {
          message.error('An error occurred.');
        }
        break;
    }
  };



  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "deviceCode",
      key: "deviceCode",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "operationStatus",
      key: "operationStatus",
      render: (status: string) =>
        status === "Active" ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Ngưng hoạt động</Tag>
        ),
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "connected",
      key: "connected",
      render: (connection: string) =>
        connection === "Connected" ? (
          <Tag color="green">Kết nối</Tag>
        ) : (
          <Tag color="red">Mất kết nối</Tag>
        ),
    },
    {
      title: "",
      key: "actions",
      render: (text: string, record: any, index: number) => (
        <>
          <a href="#" style={{ marginRight: 10 }} className="action" onClick={() => {
            setDetailData({
              deviceCode: record.deviceCode,
              deviceName: record.deviceName,
              ipAddress: record.ipAddress,
              deviceType: "Kiosk",
              username: record.userName,
              password: record.password,
              services: "Khám tim mạch, Khám sản - Phụ khoa",
            });

            setIsDetailModalOpen(true);
          }
          }
          >
            Chi tiết
          </a>
          <a href="#"
            style={{ marginRight: 10 }}
            className="action"
            onClick={() => {
              //temp
              const services = ["Khám tim mạch", " Khám sản - Phụ khoa"];
              setDataUserEdit({ ...record, username: record.userName, deviceType: "Kiosk", services });
              setIsUpdateModalOpen(true);
            }}
          >Cập nhật</a>
          <Popconfirm
            title={props.columns === 1 ? "Xóa thiết bị" : ""}
            description={props.columns === 1 ? "Bạn có chắc chắn muốn xóa thiết bị này không?" : ""}
            onConfirm={() => confirm(record)}
            okText="Có"
            cancelText="Không"
          >
            <a style={{ color: "crimson" }} className="action">Xóa</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  const columnsSvc = [
    {
      title: "Mã dịch vụ",
      dataIndex: "serviceCode",
      key: "serviceCode",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "isInOperation",
      key: "isInOperation",
      render: (status: string) =>
        status === "Active" ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Ngưng hoạt động</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text: string, record: any, index: number) => (
        <>
          <a href="#" style={{ marginRight: 10 }} className="action" onClick={() => {
            setIsDetailModalOpen(true);
            setDataUserEdit(record);

          }}>
            Chi tiết
          </a>
          <a href="#" style={{ marginRight: 10 }} className="action" onClick={() => {

            setDataUserEdit(record);
            setIsUpdateModalOpen(true);
          }}
          >Cập nhật</a>
          <Popconfirm
            title={props.columns === 1 ? "Xóa thiết bị"
              : props.columns === 2 ? "Xóa dịch vụ"
                : ""}
            description={props.columns === 1 ? "Bạn có chắc chắn muốn xóa thiết bị này không?"
              : props.columns === 2 ? "Bạn có chắc chắn muốn xóa dịch vụ này không?"
                : ""}
            onConfirm={() => confirm(record)}
            okText="Có"
            cancelText="Không"
          >
            <a style={{ color: "crimson" }} className="action">Xóa</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const renderStatus = React.useCallback((status: string) => {
    return status === "Đang online" ? (
      <Tag color="blue">{status}</Tag>
    ) : (
      <Tag color="red">{status}</Tag>
    );
  }, []);

  const renderActions = React.useCallback((text: string, record: any, index: number) => {
    return (
      <>
        <a href="#" style={{ marginRight: 10 }} className="action"
          onClick={() => {
            console.log(record);
            setIsDetailModalOpen(true)
            setDataUserEdit(record);
          }}
        >
          Chi tiết
        </a>
        <a
          href="#"
          style={{ marginRight: 10 }}
          className="action"
          onClick={() => {
            setDataUserEdit(record);
            setIsModalOpen(true);
          }}
        >
          Cập nhật
        </a>
        <Popconfirm
          title={props.columns === 1 ? "Xóa thiết bị"
            : props.columns === 2 ? "Xóa dịch vụ"
              : props.columns === 4 ? "Xóa tài khoản"
                : ""}
          description={props.columns === 1 ? "Bạn có chắc chắn muốn xóa thiết bị này không?"
            : props.columns === 2 ? "Bạn có chắc chắn muốn xóa dịch vụ này không?"
              : props.columns === 4 ? "Bạn có chắc chắn muốn xóa tài khoản này không?"
                : ""}
          onConfirm={() => confirm(record)}
          okText="Có"
          cancelText="Không"
        >
          <a style={{ color: "crimson" }} className="action">Xóa</a>
        </Popconfirm>
      </>
    );
  }, [setDataUserEdit, setIsModalOpen]);

  const columnsUser = React.useMemo(() => [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Vai trò",
      dataIndex: "userRole",
      key: "userRole"
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: renderStatus
    },
    {
      title: "",
      key: "actions",
      render: renderActions
    },
  ], [renderStatus, renderActions]);

  const columnsPN = [
    {
      title: "STT",
      dataIndex: "code",
      key: "code",
      render: (text: string, record: any, index: number) => {
        if (localStorage.getItem('userRole') == 'Doctor')
          return (
            <a href='#' onClick={() => {
              fetch(process.env.REACT_APP_API_URL + 'api/Assignment/' + text + '/1', {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }).then(response => response.json())
                .then(data => {
                  if (data.message == "Updated") {
                    getPN();
                  }
                })
            }}>{text}</a>
          )
        else
          return (<span>{text}</span>)
      }
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Thời gian cấp",
      dataIndex: "assignmentDate",
      key: "assignmentDate",
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "expireDate",
      key: "expireDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "Đang chờ" ? (
          <Tag color="blue">{status}</Tag>
        ) : status === "Đã sử dụng" ? (
          <Tag color="gray">{status}</Tag>
        ) : (<Tag color="red">{status}</Tag>)
    },
    {
      title: "Nguồn cấp",
      dataIndex: "deviceCode",
      key: "deviceCode",
    },
    {
      title: "",
      key: "actions",
      render: (value: any, record: any) => (
        <>
          <a href="#" style={{ marginRight: 10 }} className="action" onClick={() => {
            setIsDetailModalOpen(true);
            console.log(record);

            setDetailData({
              fullName: record.customerName,
              serviceName: record.serviceName,
              queueNumber: record.code,
              issueTime: record.assignmentDate,
              expiryTime: record.expireDate,
              source: record.deviceCode,
              status: record.status,
              phoneNumber: record.telephone,
              email: record.customerEmail,
            });
          }}
          >
            Chi tiết
          </a>
        </>
      ),
    },
  ];
  const handleFilter1Change = async (value: string) => {
    switch (props.columns) {
      case 1:
        setDisplayData(filter2Value == 'All' ? value != 'All' ? internalData.filter((x: any) => x.operationStatus == value
          && x.deviceName.includes(searchText)
        )
          : internalData.filter((x: any) => x.deviceName.includes(searchText))
          : value != 'All' ? internalData.filter((x: any) => x.operationStatus == value && x.connected == filter2Value
            && x.deviceName.includes(searchText)
          )
            : internalData.filter((x: any) => x.connected == filter2Value && x.deviceName.includes(searchText))
        );
        setFilter1Value(value);
        break;
      case 2:
        setDisplayData(filter2Value == 'All' ? value != 'All' ? internalData.filter((x: any) => x.isInOperation == value
          && x.description.includes(searchText)
        )
          : internalData.filter((x: any) => x.description.includes(searchText))
          : value != 'All' ? internalData.filter((x: any) => x.isInOperation == value)
            : internalData.filter((x: any) => x.description.includes(searchText)))
        setFilter2Value(value);
        break;
      case 4:
        await handleSearch(value, filter2Value, searchText);
        setFilter1Value(value);
        break;
      default:
        await handleSearchNumber(value, start, end, deviceCode, searchText, filter2Value);
        setFilter1Value(value);
        break;
    }
  }
  const handleFilter2Change = async (value: string) => {
    switch (props.columns) {
      case 1:
        setDisplayData(filter1Value == 'All' ? value != 'All' ? internalData.filter((x: any) => x.connected == value && x.deviceName.includes(searchText))
          : internalData.filter((x: any) => x.deviceName.includes(searchText))
          : value != 'All' ? internalData.filter((x: any) => x.connected == value && x.operationStatus == filter1Value && x.deviceName.includes(searchText))
            : internalData.filter((x: any) => x.operationStatus == filter1Value && x.deviceName.includes(searchText))
        );
        setFilter2Value(value);
        break;
      case 2:
        setDisplayData(filter1Value == 'All' ? internalData.filter((x: any) => x.IsInOperation == value)
          : internalData.filter((x: any) => x.operationStatus == value && x.connected == filter1Value));
        setFilter2Value(value);
        break;
      case 4:
        await handleSearch(filter1Value, value, searchText);
        setFilter2Value(value);
        break;
      default:
        await handleSearchNumber(filter1Value, start, end, deviceCode, searchText, value);
        setFilter2Value(value);
        break;
    }
  }
  const getTotalRecord = async (value1: string, value2: string, value3: string): Promise<number> => {
    return new Promise(resolve => {
      fetch(process.env.REACT_APP_API_URL + 'api/User/totaluser/' + value1 + '/' + value2
        + '/' + value3, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(response => response.json())
        .then(data => resolve(data))
        .catch(error => console.log(error))
    })
  }
  const getTotalNumber = async (serviceCode: string, start: string, end: string, deviceCode: string, searchText: string, status: string): Promise<number> => {
    return new Promise(resolve => {
      fetch(process.env.REACT_APP_API_URL + 'api/Assignment/count/' + localStorage.getItem('userName')
        + '/' + serviceCode + '/' + start + '/' + end + '/' + deviceCode + '/' + searchText + '/' + status, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }).then(response => response.json())
        .then(data => resolve(data))
        .catch(error => console.log(error))
    })
  }
  const handleSearch = async (filter1Value: string, filter2Value: string, searchValue: string) => {
    const searchParam = searchValue === '' ? '___' : searchValue;

    setLoading(true); // Show the loading indicator

    try {
      const [totalRecords, tempData] = await Promise.all([
        getTotalRecord(filter1Value, filter2Value, searchParam),
        getUserData(filter1Value, filter2Value, searchParam, 1, pageSize),
      ]);
      setTotalRecords(totalRecords);
      setDisplayData(tempData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide the loading indicator
    }
  };
  const handleSearchNumber = async (filter1Value: string, start: string, end: string, filter2Value: string, searchValue: string, status: string) => {
    const searchParam = searchValue === '' ? '___' : searchValue;

    setLoading(true); // Show the loading indicator

    try {
      const [totalRecords, tempData] = await Promise.all([
        getTotalNumber(filter1Value, start, end, filter2Value, searchParam, status),
        getProvidedNumber(filter1Value, start, end, filter2Value, searchParam, 1, pageSize, status)]);
      setTotalRecords(totalRecords);
      setDisplayData(tempData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Hide the loading indicator
    }
  };

  const handleStartChange = async (date: dayjs.Dayjs | null) => {
    if (date) {
      const formattedDate = date.format(dateFormat); // Format the date as YYYY-MM-DD
      setStart(formattedDate)

      await handleSearchNumber(filter1Value, formattedDate, end, deviceCode, '', filter2Value);
    }
  };
  const handleEndChange = async (date: dayjs.Dayjs | null) => {


    if (date) {
      const formattedDate = date.format(dateFormat); // Format the date as YYYY-MM-DD
      setEndValue(formattedDate);


      //    date.add(1, 'day').format('YYYY-MM-DD')  because api return list previous current day
      await handleSearchNumber(filter1Value, start, date.add(1, 'day').format('YYYY-MM-DD'), deviceCode, '', filter2Value);

      setEnd(date.add(1, 'day').format('YYYY-MM-DD'))
    }
  };

  async function getPN() {
    if (userRole !== 'Doctor') {
      let srvData = await getServiceData();
      setServiceOptions(srvData.map((item: any) => {
        return (
          { value: item.serviceCode, label: item.serviceName }
        )
      }))

      let deviceData = await getDeviceData();
      setDeviceOptions(deviceData.map((item: any) => {
        return (
          { value: item.deviceCode, label: item.deviceName }
        )
      }))
    }

    if (props.columns == 1) {
      let tempData = await getDeviceData();
      setInternalData(tempData);
      setDisplayData(tempData);
    }
    else if (props.columns == 2) {
      let tempData = await getServiceData();
      setInternalData(tempData);
      setDisplayData(tempData);
    }
    else if (props.columns == 3) {
      setLoading(true);
      const [totalRecords, tempData] = await Promise.all([
        getTotalNumber(filter1Value, start, end, deviceCode, searchText == '' ? '___' : searchText, filter2Value),
        getProvidedNumber(filter1Value, start, end, deviceCode, searchText == '' ? '___' : searchText, currentPage, pageSize, filter2Value)]);
      setLoading(false)
      setTotalRecords(totalRecords);
      setDisplayData(tempData);
    }
    else {
      setLoading(true);
      const [totalRecords, tempData] = await Promise.all([
        getTotalRecord(filter1Value, filter2Value, searchText == '' ? '___' : searchText),
        getUserData(filter1Value, filter2Value, searchText == '' ? '___' : searchText, currentPage, pageSize)]);
      setLoading(false);
      setTotalRecords(totalRecords);
      setDisplayData(tempData);
    }
  }

  // SignalR
  useEffect(() => {
    if (connection) {
      connection.on("ReceivedOnline", async (userId: string, status: boolean) => {
        setLoading(true);
        const [totalRecords, tempData] = await Promise.all([
          getTotalRecord(filter1Value, filter2Value, searchText == '' ? '___' : searchText),
          getUserData(filter1Value, filter2Value, searchText == '' ? '___' : searchText, 1, pageSize)]);
        setLoading(false);
        setTotalRecords(totalRecords);
        setDisplayData(tempData);
      });
      connection.on("ReceivedOffline", async (userId: string, status: boolean) => {
        setLoading(true);
        const [totalRecords, tempData] = await Promise.all([
          getTotalRecord(filter1Value, filter2Value, searchText == '' ? '___' : searchText),
          getUserData(filter1Value, filter2Value, searchText == '' ? '___' : searchText, 1, pageSize)]);
        setLoading(false);
        setTotalRecords(totalRecords);
        setDisplayData(tempData);
        localStorage.clear();
      });
      connection.on("ReceiveProvidedNumber", async (code: string) => {
        setLoading(true);
        const [totalRecords, tempData] = await Promise.all([
          getTotalNumber(filter1Value, start, end, deviceCode, searchText == '' ? '___' : searchText, filter2Value),
          getProvidedNumber(filter1Value, start, end, deviceCode, searchText == '' ? '___' : searchText, 1, pageSize, filter2Value)]);
        setLoading(false)
        setTotalRecords(totalRecords);
        setDisplayData(tempData);
      })
    }
  }, [connection])

  // GET Data Source
  useEffect(() => {
    setInternalColumns(props.columns == 1 ? columns : props.columns == 2 ?
      columnsSvc : props.columns == 3 ? columnsPN : columnsUser);
    getPN();

  }, [currentPage, pageSize, isModalOpen])

  return (
    <div className="device-list">
      <div className="top-bar">
        <h2 style={{ color: "#FF7506" }}>{props.headerText}</h2>
      </div>
      {/* Filters */}
      {userRole !== "Doctor" ? <div className="filters">
        <div className="leftFilterItem">
          <div className="filterItem">
            <span style={{ marginBottom: '5px' }}>{props.filter1}</span>
            <Select defaultValue="All" style={{ width: 180 }} className="filter"
              onChange={handleFilter1Change} >
              {props.columns == 1 || props.columns == 2 ? DeviceStatus.map(item => {
                return (
                  <Option value={item.value}>{item.label}</Option>
                )
              })
                : props.columns == 4 ? UserRole.map(item => {
                  return (
                    <Option value={item.value}>{item.label}</Option>
                  )
                })
                  : <><Option value="All">Tất cả</Option>
                    {serviceOptions.map(item => {
                      return (
                        <Option value={item.value}>{item.label}</Option>
                      )
                    })}
                  </>
              }
            </Select>
          </div>
          {(props.columns !== 2) && <div className="filterItem">
            <span style={{ marginBottom: '5px' }}>{props.filter2}</span>
            <Select defaultValue="Tất cả" style={{ width: 180 }} className="filter"
              onChange={handleFilter2Change}>
              {props.columns == 1 ? DeviceConnected.map(item => {
                return (
                  <Option value={item.value}>{item.label}</Option>
                )
              })
                : props.columns == 2 ? <Option value='All'>Tất cả</Option>
                  : props.columns == 4 ? UserStatus.map(item => {
                    return (
                      <Option value={item.value}>{item.label}</Option>
                    )
                  })
                    :
                    NumberStatus.map(item => {
                      return (
                        <Option value={item.value}>{item.label}</Option>
                      )
                    })
              }
            </Select>
          </div>}
          {props.columns === 3 && <div className="filterItem">
            <span style={{ marginBottom: '5px' }}>Nguồn cấp</span>
            <Select defaultValue="All" style={{ width: 140 }} className="filter" onChange={async (value) => {
              await handleSearchNumber(filter1Value, start, end, value, '', filter2Value);
              setDeviceCode(value);
            }}>
              <Option value="All">Tất cả</Option>
              {
                deviceOptions.map(item => <Option value={item.value}>{item.label}</Option>)
              }

            </Select>
          </div>}
          {(props.columns === 3 || props.columns === 2) && <div className="filterItem">
            <span style={{ marginBottom: '5px' }}>Chọn thời gian</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DatePicker
                defaultValue={dayjs('2024-01-01', dateFormat)}
                minDate={dayjs('2024-01-01', dateFormat)}
                maxDate={dayjs(dayjs().format('YYYY-MM-DD'), dateFormat)}
                style={{ width: 140 }}
                onChange={handleStartChange}
                value={dayjs(start, dateFormat)}
                suffixIcon={
                  <img
                    src="./images/calendar.png"
                    alt="icon"
                  ></img>
                }
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
                defaultValue={dayjs(endValue, dateFormat)}
                minDate={dayjs('2024-01-01', dateFormat)}
                maxDate={dayjs(dayjs().format('YYYY-MM-DD'), dateFormat)}
                style={{ width: 140 }}
                value={dayjs(endValue, dateFormat)}
                onChange={handleEndChange}
                suffixIcon={
                  <img
                    src="./images/calendar.png"
                    alt="icon"
                  ></img>
                }

              />
            </div>
          </div>}
        </div>
        <div className="leftFilterItem">
          <div className="filterItem">
            <span style={{ marginBottom: '5px' }}>Từ khóa</span>
            <Input
              placeholder="Nhập từ khóa"
              value={searchText}
              onChange={async (e) => {
                if (props.columns == 4 || props.columns == 3)
                  handleInputChange(e, props.columns);
                else if (props.columns == 1) {
                  setDisplayData(filter1Value != 'All' ? filter2Value != 'All' ? internalData.filter((x: any) => x.deviceName.includes(e.target.value)
                    && x.operationStatus == filter1Value && x.connected == filter2Value)
                    : internalData.filter((x: any) => x.deviceName.includes(e.target.value)
                      && x.operationStatus == filter1Value)
                    : filter2Value !== 'All' ? internalData.filter((x: any) => x.deviceName.includes(e.target.value) && x.connected == filter2Value)
                      : internalData.filter((x: any) => x.deviceName.includes(e.target.value))
                  )
                }
                else if (props.columns == 2) {
                  setDisplayData(filter1Value != "All" ? internalData.filter((x: any) => x.description.includes(e.target.value)
                    && x.isInOperation == filter1Value)
                    : internalData.filter((x: any) => x.description.includes(e.target.value)))
                }
                //await handleSearch(filter1Value, filter2Value, e.target.value);
                setSearchText(e.target.value)
              }}
              style={{ width: 240 }}
              suffix={<SearchOutlined />}
            />
          </div>
        </div>
      </div> : <div className="filters">
        <div className="leftFilterItem">
          <div className="filterItem">
            <span style={{ marginBottom: '5px' }}>{props.filter2}</span>
            <Select defaultValue="0" style={{ width: 180 }} className="filter"
              onChange={handleFilter2Change}>
              <Option value="0">Đang chờ</Option>
            </Select>
          </div>
        </div>
      </div>}
      <div className="middleData">
        <Table style={{ width: '88%' }}
          dataSource={displayData}
          columns={props.columns == 1 ? columns : props.columns == 2 ? columnsSvc : props.columns == 3 ? columnsPN : columnsUser}
          loading={{ spinning: loading, delay: 200 }}
          pagination={props.columns == 1 || props.columns == 2 ? { pageSize: 8 } : customPagination}
          className="device-table"
        />
        <div style={{ width: '10%', marginLeft: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          {localStorage.getItem('userRole') != 'Doctor' ? <AddDeviceButton sendStatus={receiveStatus} headerText={props.buttonText} /> : null}
        </div>
      </div>

      {/* Add modal */}
      <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} onClose={() => {
        setDataUserEdit({});
      }}
        width="60%" footer={null}
        style={{ padding: "20px" }} // Optional: Customize padding
      >
        {props.columns == 3 ? <NewQueueForm serviceOptions={serviceOptions}
          isNumberDisplay={receiveIsNumberDisplay}
        /> : props.columns == 4 ? <AccountForm myForm={dataUserEdit} serviceOptions={serviceOptions}
          handleSendStatus={receiveStatus}
        /> : props.columns == 1 ? <DeviceForm myForm={dataUserEdit} serviceOptions={serviceOptions}
          handleSendStatus={receiveStatus} />
          : <ServiceForm handleSendStatus={receiveStatus} initialValues={{}} />
        }
      </Modal>


      {/* Update modal */}
      <Modal title="" open={isUpdateModalOpen} onOk={handleUpdateOk} onCancel={handleUpdateCancel} onClose={() => {
        setDataUserEdit({});
      }}
        width="60%" footer={null}
        style={{ padding: "20px" }} // Optional: Customize padding
      >
        {props.columns == 3 ? <div>Update queue</div>
          : props.columns == 4 ? <div>Update account</div>
            : props.columns == 1 ? <DeviceUpdateForm initialValues={dataUserEdit} setDataUserEdit={setDataUserEdit} onCancel={handleUpdateCancel} setDisplayData={setDisplayData} />
              : <ServiceForm initialValues={dataUserEdit} handleUpdateCancel={handleUpdateCancel} setDisplayData={setDisplayData} />
        }
      </Modal>

      {/* Detail Modal */}
      <Modal title="" open={isDetailModalOpen} onOk={handleDetailOk} onCancel={handleDetailCancel} onClose={() => {
        setDetailData({});
      }}
        width={props.columns === 2 ? "90%" : "60%"} footer={null}
        style={{ padding: "20px" }} // Optional: Customize padding
      >
        {props.columns == 3 ? <QueueDetails data={detailData} /> : props.columns == 4 ? <UserInfo dataUserEdit={dataUserEdit} /> : props.columns == 1 ? <DeviceDetails device={detailData} />
          : <ServiceDetail dataUserEdit={dataUserEdit} />
        }
      </Modal>

      <Modal title="" open={isModelNumberOpen} onOk={handleNumberOk} onCancel={handleNumberCancel}
        footer={null} className="custom-modal"
      >
        <TicketDisplay ticketNumber={newNumber} serviceName={serviceName} issueTime={assignmentDate}
          customerName={customerName} expiryTime="Trong ngày"
        />
      </Modal>
    </div >


  );
});
export default DeviceList;
