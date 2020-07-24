import React, { useState, useEffect, useRef, useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';
import styles from './Search.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = ({ updateText }) => {
    // Retrieve Context Data
    const { showWorldwideData, countriesData } = useContext(DataContext)
    const [countriesDataSearch,] = countriesData;
    const [, setShowWorldwide] = showWorldwideData;

    const [text, setText] = useState("");
    const [display, setDisplay] = useState(false);
    const wrapperRef = useRef(null);

    
    useEffect(() => {
        window.addEventListener("mousedown", handleInputClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleInputClickOutside);
        };
    }, []);

    const handleFormSubmit = e => {
        e.preventDefault();
        if (
            document.getElementById('search_input').value.length !== 0 
            && document.getElementById('search_input').value !== text
        ) {
            updateText(text)
            setShowWorldwide(false)
        }
    }

    const handleInputChange = e => {
        setText(e.target.value);
    }

    const handleInputClickInside = e => {
        setDisplay(true);
    }

    const handleInputClickOutside = e => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(e.target)) {
            setDisplay(false);
        }
    };

    const updateOptionVal = text => {
        setText(text);
        updateText(text)
        setDisplay(false);
    };

    return (
        <div ref={wrapperRef} className={styles.search}>
            <form action="" onSubmit={handleFormSubmit}>
                <input 
                    id="search_input"
                    type="text"
                    onClick={handleInputClickInside}
                    className={styles.form_control}
                    placeholder="Search for a country" 
                    value={text}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
                <button className={styles.search_btn} type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                { display && (
                    <div className={styles.search_options}>
                        {countriesDataSearch
                            .filter(({ country }) => country.indexOf(text.charAt(0).toUpperCase() + text.slice(1)) > -1)
                            .map((value, id) => {
                            return (
                                <div key={id} className={styles.search_option} onClick={() => updateOptionVal(value.country)}>
                                    <img src={value.countryInfo.flag} alt=""/>
                                    <span>{value.country}</span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </form>
        </div>
    )
}

export default Search
