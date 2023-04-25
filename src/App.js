import React, { useEffect } from 'react';
import Routes from './routes/index'
import GlobalStyles from './styles/global.styles';
import { useDispatch } from 'react-redux';
import api from './services/Api'
import { loadFoods } from './pages/redux/actions/foods';

function App() {

  const dispatch = useDispatch();

  const LoadFoods = async () => {
    const { data } = await api.getFoods()
    dispatch(loadFoods(data))
  }

  useEffect(() => {
    LoadFoods()
  }, [])

  return (
    <>
      < GlobalStyles />
      < Routes />
    </>
  );
}

export default App;
