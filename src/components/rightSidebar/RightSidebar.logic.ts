import { error } from "console";
import { fetchWithTokenRetry } from "../../helpers/tokens";
export const getSummaryData = async():Promise<any> => {
  let url = process.env.REACT_APP_API_URL+'api/Device/devicesinfor';
        let data1:any = {}; let data2:any={}; let data3:any={};
        let response = await fetchWithTokenRetry(url);
        console.log("Data:" + response);
        if (response.ok) {
          data1 = await response.json();
          console.log("Data fetched successfully:", data1);
      } else {
          console.error("Failed to fetch data, status:", response.status);
      }
      url = process.env.REACT_APP_API_URL+'api/Service/serviceinfor'
      response = await fetchWithTokenRetry(url);
      if (response.ok) {
        data2 = await response.json();
        console.log("Data fetched successfully:", data1);
    } else {
        console.error("Failed to fetch data, status:", response.status);
    }
    url = process.env.REACT_APP_API_URL+'api/Assignment/statistic'
      response = await fetchWithTokenRetry(url);
      if (response.ok) {
        data3 = await response.json();
        console.log("Data fetched successfully:", data1);
    } else {
        console.error("Failed to fetch data, status:", response.status);
    }
    return new Promise(resolve=>{      
        resolve([data1, data2, data3]);
    })
}