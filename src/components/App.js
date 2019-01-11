import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../actions';
import { listFilters } from '../constants';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import './app.css';

function getFilter(props) {
  return props.match.params.nowShowing || listFilters.ALL;
}

class App extends React.Component {
  componentDidMount() {
    this.props.setFilter(getFilter(this.props));
  }

  componentDidUpdate() {
    this.props.setFilter(getFilter(this.props));
  }

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

export default connect(
  null,
  { setFilter }
)(App);
