import axios from 'axios';
export const getVendors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        'https://www.caterstation.pro/api/vendors',
      );
      resolve(result?.data.vendors.vendor_services || {});
    } catch (error) {
      //console.log("error: " , error)
      reject(error);
    }
  });
};
