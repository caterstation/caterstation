import axios from "axios";

export const getEinvites=()=>{
    return new Promise(async (resolve,reject)=>{

        try {
            const result= await axios.get("https://www.caterstation.pro/api/e-invites");
            resolve(result?.data|| {})
        } catch (error) {
           console.log("error: " , error)
           reject(error);
        }

            
        
})}