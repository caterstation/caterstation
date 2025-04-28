import axios from 'axios';
export const getVendors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        'https://www.caterstation.pro/api/vendors',
      );
      resolve(result?.data.allvendors || {});
    } catch (error) {
      //console.log("error: " , error)
      reject(error);
    }
  });
};

export const getVendorsDetail = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        `https://www.caterstation.pro/api/vendor-detail/arj-innovation`,
      );
      // const result= await axios.get(`https://www.caterstation.pro/api/vendor-detail/${slug}`);
      resolve(result?.data || {});
    } catch (error) {
      //console.log("error: " , error)
      reject(error);
    }
  });
};
