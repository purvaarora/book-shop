import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

// Books master data
const books = [
  {
    id: 'book1',
    title: 'Harry Potter and the Sorcerers Stone',
    author: 'J.K. Rowling'
  },
  {
    id: 'book2',
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    id: 'book3',
    title: 'Harry Potter and the Prisoner of Azkaban',
    author: 'J.K. Rowling'
  },
  {
    id: 'book4',
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling'
  },
  {
    id: 'book5',
    title: 'Harry Potter and the Order of the Phoenix',
    author: 'J.K. Rowling'
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App books={books} />
  </React.StrictMode>,
  document.getElementById('root')
);

