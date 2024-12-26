import { error } from "console"

export const GetLogin = async(userName: string, password:string):Promise<any> => {
    return new Promise(resolve=>{
        fetch(process.env.REACT_APP_API_URL+'api/Authenticate', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:userName,
                password: password,
                role: "1"
              })
        }).then(response=>response.json())
        .then(data=>resolve(data))
        .catch(error=>console.log(error))
    })
}