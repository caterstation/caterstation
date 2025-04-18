import axios from "axios"
 export const myAxiosGetReq=async()=>{
    const res= await axios({
        method:"get", 
        url:"https://www.caterstation.pro/api/all-cities"
    });
    return res
 };