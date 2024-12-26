export const getSummaryData = async(token:string):Promise<any> => {
    return new Promise(resolve=>{
        fetch(process.env.REACT_APP_API_URL+'api/Assignment/statistic', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }).then((response) => {
            if (!response.ok) {
              // Handle HTTP errors
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json().catch(() => {
              // Handle cases where response is not JSON
              throw new Error('Invalid JSON response');
            });
          })
          .then((data) => {
            resolve(data)
          })
        .catch(error=>console.log(error))
    })
}