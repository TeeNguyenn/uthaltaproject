import { fetchWithTokenRetry } from "../../helpers/tokens";

export const getProvidedNumber = async (serviceCode: string, start: string, end: string, deviceCode: string, searchText: string, pageNumber: number, pageSize: number, status: string): Promise<any> => {
  let url = process.env.REACT_APP_API_URL + 'api/Assignment/' + localStorage.getItem('userName')
    + '/' + serviceCode + '/' + start + '/' + end + '/' + deviceCode + '/' + searchText + '/' + pageNumber + '/' + pageSize + '/' + status;
  let data1: any = [];
  let response = await fetchWithTokenRetry(url);
  if (response.ok) {
    data1 = await response.json();
    console.log("Data fetched successfully:", data1);
  } else {
    console.error("Failed to fetch data, status:", response.status);
  }
  return new Promise(resolve => {
    resolve(data1.map((item: any) => {
      return {
        ...item, assignmentDate: formatDate(item.assignmentDate),
        expireDate: formatDate(item.expireDate)
      }
    }));
  })
}

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  // Extract hours, minutes, seconds, day, month, and year
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

export const getDeviceData = async (): Promise<any> => {
  let url = process.env.REACT_APP_API_URL + 'api/Device/';
  let data1: any = [];
  let response = await fetchWithTokenRetry(url);
  if (response.ok) {
    data1 = await response.json();
    console.log("Data fetched successfully:", data1);
  } else {
    console.error("Failed to fetch data, status:", response.status);
  }
  return new Promise(resolve => {
    resolve(data1)
  })
}

export const getUserData = async (filter1: string, filter2: string, searchText: string, pageNumber: number, pageSize: number): Promise<any> => {
  let url = process.env.REACT_APP_API_URL + 'api/User/pages/' + filter1 + '/' + filter2 + '/' + searchText + '/' + pageNumber + '/' + pageSize;
  let data1: any = [];
  let response = await fetchWithTokenRetry(url);
  if (response.ok) {
    data1 = await response.json();
    console.log("Data fetched successfully:", data1);
  } else {
    // data1 = await response;
    console.error("Failed to fetch data, status:", response.status);

  }
  return new Promise(resolve => {
    resolve(data1)
  })
}

export const getServiceData = async (): Promise<any> => {
  let url = process.env.REACT_APP_API_URL + 'api/Service/';
  let data1: any = [];
  let response = await fetchWithTokenRetry(url);
  if (response.ok) {
    data1 = await response.json();
    console.log("Data fetched successfully:", data1);
  } else {
    console.error("Failed to fetch data, status:", response.status);
  }
  return new Promise(resolve => {
    resolve(data1)
  })
}

// Example usage
//const isoString = "2024-11-27T08:01:02.389Z";
//console.log(formatDate(isoString)); // Output: "15:01:02 27/11/2024"
