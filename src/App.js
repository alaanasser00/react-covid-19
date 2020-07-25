import React from 'react';
import Header from './components/Header/Header';
import CountryList from './components/CountryList/CountryList';
import Overview from './components/Overview/Overview';
import ChartStats from "./components/ChartStats/ChartStats";
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="cv9">
          <ChartStats />
        </div>
        <div className="cv3">
          <Overview />
        </div>
      </div>
      <CountryList />
      <Footer />
      </div>
  );
}

export default App;
