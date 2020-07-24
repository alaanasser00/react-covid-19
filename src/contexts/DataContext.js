import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();


const DataContextProvider = ({ children }) => {
    const [worldwideData, setWorldwideData] = useState({});
    const [worldHistCases, setWorldHistCases] = useState({});
    const [worldHistDeaths, setWorldHistDeaths] = useState({});
    const [worldHistRecovered, setWorldHistRecovered] = useState({});
    const [showWorldwideData, setShowWorldwideData] = useState(true);
    const [countriesData, setCountriesData] = useState([]);
    const [countryData, setCountryData] = useState({ country: "Morocco" });
    const [countryHist, setCountryHist] = useState({ country: "Morocco" });
    const [countryHistCases, setCountryHistCases] = useState({});
    const [countryHistDeaths, setCountryHistDeaths] = useState({});
    const [countryHistRecovered, setCountryHistRecovered] = useState({});
    const [countryDataDetails, setCountryDataDetails] = useState({ flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/200px-Question_mark_%28black%29.svg.png" });
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Worldwide Data
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const resp = await axios.get(`https://disease.sh/v3/covid-19/all`);
                setWorldwideData(resp.data)
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false);
        };
        fetchItems();
    }, [])

    // Fetch Country Data by name
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const resp = await axios.get(`https://disease.sh/v3/covid-19/countries/${countryData.country}`);
                setCountryData(resp.data)
                setCountryDataDetails(resp.data.countryInfo)
            } catch (err) {
                console.log(err)
                document.getElementById('flag').src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/200px-Question_mark_%28black%29.svg.png';
                document.getElementById('flag_txt').innerHTML = 'Incorrect Result.'
            }
            setIsLoading(false);
        };
        fetchItems();
    }, [countryData.country])

    // Fetch All Countries Data
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const resp = await axios.get(`https://disease.sh/v3/covid-19/countries`);
                setCountriesData(resp.data)
            } catch (err) {
                console.error(err);
            }
            setIsLoading(false);
        };
        fetchItems();
    }, [])

    // Fetch Worldwide Historical Data
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const resp = await axios.get(`https://disease.sh/v3/covid-19/historical/all`);
                setWorldHistCases(resp.data.cases)
                setWorldHistDeaths(resp.data.deaths)
                setWorldHistRecovered(resp.data.recovered)
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false);
        };
        fetchItems();
    }, [])

    // Fetch Country Historical Data by name
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const resp = await axios.get(`https://disease.sh/v3/covid-19/historical/${countryHist.country}`);
                setCountryHist(resp.data)
                setCountryHistCases(resp.data.timeline.cases)
                setCountryHistDeaths(resp.data.timeline.deaths)
                setCountryHistRecovered(resp.data.timeline.recovered)
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false);
        };
        fetchItems();
    }, [countryHist.country])

    return (
        <DataContext.Provider
            value={{
                worldwideData: [worldwideData, setWorldwideData],
                showWorldwideData: [showWorldwideData, setShowWorldwideData],
                worldHistCases: [worldHistCases, setWorldHistCases],
                worldHistDeaths: [worldHistDeaths, setWorldHistDeaths],
                worldHistRecovered: [worldHistRecovered, setWorldHistRecovered],
                countriesData: [countriesData, setCountriesData],
                countryData: [countryData, setCountryData],
                countryDataDetails: [countryDataDetails, setCountryDataDetails],
                countryHist: [countryHist, setCountryHist],
                countryHistCases: [countryHistCases, setCountryHistCases],
                countryHistDeaths: [countryHistDeaths, setCountryHistDeaths],
                countryHistRecovered: [countryHistRecovered, setCountryHistRecovered],
                isLoading: [isLoading, setIsLoading]
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;
