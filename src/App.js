import React, { useReducer } from 'react';
import './App.css';
import Layout from './hoc/Layout';

export const AppContext = React.createContext();

const initialState = {
  searchQuery: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      console.log('Updating reducer:', action.data);
      return {
        searchQuery: action.data
      };
    default:
      return initialState;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Layout />
      </div>
    </AppContext.Provider>

  );
}

export default App;
