import { Fragment, useEffect, useRef } from 'react';
import {ProductList, Header} from './components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './App.css';
import { updateUser } from './redux/cart';
import Footer from './components/Footer/Footer';

function App() {
  const {userDetail} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const counterRef = useRef(1);

  useEffect(() => {
    fetchUser(counterRef.current);
  }, []);
  

  const loadMoreUsers = () => {
    fetchUser(++counterRef.current);
  }

  const fetchUser =  async (id) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
     
    dispatch(updateUser(response.data));
};

  console.log(userDetail, "==userDetail");
  return (
    <Fragment>
   
      <Header/>
      <ProductList/>
      <Footer/>
      <button onClick={loadMoreUsers}>Add More Users</button>
      <pre style={{color: "white"}}>{JSON.stringify(userDetail, undefined, 4)}</pre>
    </Fragment>
  );
}

export default App;
