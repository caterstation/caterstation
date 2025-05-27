import {UseSelector, useDispatch, useSelector} from 'react-redux';
import {addMyPackage} from '../redux/MyPackageSlice';

export const storepackage = data => {
  const dispatch = useDispatch();
  const currentPackage = useSelector(state => state.package);
  if (currentPackage.includes(data)) {
    //console.log('already existed');
  } else {
    dispatch(addMyPackage(data));
  }
};
export default storepackage;


