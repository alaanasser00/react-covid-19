import React from 'react';
import Header from './Components/Header/Header';
import CountryList from './Components/CountryList/CountryList';
import Overview from './Components/Overview/Overview';
import ChartStats from "./Components/ChartStats/ChartStats";
import Footer from './Components/Footer/Footer';
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
