import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import Main from './components/MainComponent';


const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
