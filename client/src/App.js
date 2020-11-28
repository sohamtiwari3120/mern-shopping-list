import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';

import { Provider } from "react-redux";
import store from './store';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './store/actions/';

function App(props)
{
  React.useEffect(() =>
  {
    store.dispatch(loadUser())
  }, []);
  return (
    <Provider store={ store }>
      <div className="App">
        <AppNavBar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
