import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// tests can set the state to various things and then check that the function DOES NOT return those values
