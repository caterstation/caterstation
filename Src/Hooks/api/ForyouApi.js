import axios from 'axios';
export const getAllHome = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get('https://www.caterstation.pro/api/home');
      resolve(result?.data.services || {});
    } catch (error) {
      //console.log("error: " , error)
      reject(error);
    }
  });
};
export const getHomeVendor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get('https://www.caterstation.pro/api/home');
      resolve(result?.data.vendors || {});
    } catch (error) {
      //console.log("error: " , error)
      reject(error);
    }
  });
};
export const getHomeVendorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(
        'https://www.caterstation.pro/api/vendors',
      );
      resolve(result?.data.vendors || {});
    } catch (error) {
      //console.log("error: " , error)
      reject(error);
    }
  });
};
export const getHomeOffers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get('https://www.caterstation.pro/api/home');
      resolve(result?.data.packages || {});
    } catch (error) {
      //console.log("error: " , error)
      reject(error);
    }
  });
};
export const getHomeTestimonials = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get('https://www.caterstation.pro/api/home');
      resolve(result?.data.testimonials || {});
    } catch (error) {
      //console.log("error: " , error)
      reject(error);
    }
  });
};
export const getHomeEvents = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get('https://www.caterstation.pro/api/events');
      // resolve(result?.data || {});

      resolve(result?.data || []);
      // resolve(result?.data|| []);
    } catch (error) {
      //console.log(" Api file Error ");
      //console.log("Error: ", error);
      reject(error);
    }
  });
};
