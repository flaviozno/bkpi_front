import React, { useEffect } from 'react';
import Routes from './routes/index'
import GlobalStyles from './styles/global.styles';
import { useDispatch } from 'react-redux';
import api from './services/Api'
import { loadFoods } from './pages/redux/actions/foods';
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.isAuthenticated)

  const LoadFoods = async () => {
    const { data } = await api.getFoods()
    dispatch(loadFoods(data))
  }

  useEffect(() => {
    if(user)
      LoadFoods()
  }, [user])

  return (
    <>
      < GlobalStyles />
      <ToastContainer />
      < Routes />
    </>
  );
}

export default App;
