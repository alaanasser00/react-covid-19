import React, { useContext } from 'react'
import { DataContext } from '../../contexts/DataContext';
import styles from './Overview.module.css'

const Overview = () => {
    // Retrieve Context Data
    const { showWorldwideData, worldwideData, countryData } = useContext(DataContext);
    const [countryDataOverview,] = countryData;
    const [showWorldwide,] = showWorldwideData;
    const [worldwideDataOverview,] = worldwideData;

    return (
        <div className="card">
            <div className={styles.overview}>
                <h2>Overview</h2>

                <div className={styles.stat_items}>
                    {/* Total Cases */}
                    <div className={[styles.stat_item, styles.stat_item_cases].join(" ")}>
                        <div>
                            <p className={styles.title}>Total Cases</p>
                            <p className={styles.total_num}>{showWorldwide ? worldwideDataOverview.cases : countryDataOverview.cases}</p>
                        </div>
                        <div>
                            <p className={styles.new_num}>+{showWorldwide ? worldwideDataOverview.todayCases : countryDataOverview.todayCases}</p>
                        </div>
                    </div>

                    {/* Deaths */}
                    <div className={[styles.stat_item, styles.stat_item_deaths].join(" ")}>
                        <div>
                            <p className={styles.title}>Deaths</p>
                            <p className={styles.total_num}>{showWorldwide ? worldwideDataOverview.deaths : countryDataOverview.deaths}</p>
                        </div>
                        <div>
                            <p className={styles.new_num}>+{showWorldwide ? worldwideDataOverview.todayDeaths : countryDataOverview.todayDeaths}</p>
                        </div>
                    </div>

                    {/* Recovered */}
                    <div className={[styles.stat_item, styles.stat_item_recovered].join(" ")}>
                        <div>
                            <p className={styles.title}>Recovered</p>
                            <p className={styles.total_num}>{showWorldwide ? worldwideDataOverview.recovered : countryDataOverview.recovered}</p>
                        </div>
                        <div>
                            <p className={styles.new_num}>+{showWorldwide ? worldwideDataOverview.todayRecovered : countryDataOverview.todayRecovered}</p>
                        </div>
                    </div>

                    {/* Active Cases */}
                    <div className={[styles.stat_item, styles.stat_item_active].join(" ")}>
                        <div>
                            <p className={styles.title}>Active Cases</p>
                            <p className={styles.total_num}>{showWorldwide ? worldwideDataOverview.active : countryDataOverview.active}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Overview
