import axios from 'axios'; // Correct syntax
import {useMutation} from 'react-query'


export const getPackage=()=>{
    return new Promise(async (resolve,reject)=>{

        try {
            const result= await axios.get("https://www.caterstation.pro/api/packages");
            resolve(result?.data?.packages|| {})
        } catch (error) {
           console.log("error: " , error)
           reject(error);
        }

            
        
})}
export const getEventType=()=>{
    return new Promise(async (resolve,reject)=>{

        try {
            const result= await axios.get("https://www.caterstation.pro/api/packages");
            resolve(result?.data?.event_types|| {})
        } catch (error) {
           console.log("error: " , error)
           reject(error);
        }

            
        
})}
export const getLocation=()=>{
    return new Promise(async (resolve,reject)=>{

        try {
            const result= await axios.get("https://www.caterstation.pro/api/packages");
            resolve(result?.data?.locations|| {})
        } catch (error) {
           console.log("error: " , error)
           reject(error);
        }

            
        
})}
export const usePostCart = () => {
    // const { post } = apiQueryContext
    return useMutation('postHousekeepingStatus', body =>
      axios.post("https://caterstation.pro/api/place-order", body, {
        headers: { 'content-type': 'application/json' },
      }),
    )
  }