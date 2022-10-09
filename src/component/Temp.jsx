import React, { useEffect, useState } from 'react';
import './Styles.css'
import WeatherCard from './WeatherCard';
// https://api.openweathermap.org/data/2.5/weather?q=ghaziabad&appid=9cae423ae5f6f4712a90bd97dfcce687


const Temp = () => {
    const [searchValue, setSearchValue] = useState("pune");
    const [tempInfo, setTempInfo] = useState({});

    const weatherSearch = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9cae423ae5f6f4712a90bd97dfcce687`
            const res = await fetch(url);
            const data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const weatherObject = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };
            setTempInfo(weatherObject);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        weatherSearch();
    }, [])

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="search..." id="search" className="searchTerm"
                        value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button className="searchButton" type="button" onClick={() => { weatherSearch() }}> Search </button>
                </div>
            </div>

            <WeatherCard tempInfo={tempInfo} />
        </>
    )
}

export default Temp