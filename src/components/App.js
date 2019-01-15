import React from 'react';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="todoapp">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
