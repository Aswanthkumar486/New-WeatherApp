import React, { useState } from "react";
import { WiStrongWind, WiHumidity, WiThermometer } from "react-icons/wi";
import { IoLocationSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const API_Key = "2d30e2f8ad022716b9049f2ebd661e0a";

  // Function to get background color based on weather condition
 

  const keyenter = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  const fetchData = () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    setLoading(true);
    setError("");
    setData(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          setLoading(false);
          setData(data);
          setError("");
          setCity(""); // Clear input on success
        } else {
          setError("City not found. Try again.");
          setData(null);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Error fetching data");
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Weather App</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="city" style={{color:"white"}}>Enter City Name:</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={keyenter}
                disabled={loading}
              />
              <button
                onClick={fetchData}
                disabled={loading}
                className="btn btn-primary"
                aria-label="Search"
              >
                <CiSearch size={20} color="white" />
              </button>
            </div>
          </div>

          {error && <p className="text-danger mt-3">{error}</p>}

          {loading && (
            <div className="spinner-border text-primary m-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}

          {data && (
            <section className="mt-5 section-content">
              <p>
                <strong>
                  <IoLocationSharp color="#E50046" size={20} /> Name of Place:
                </strong>{" "}
                {data.name}
              </p>
              <p>
                <strong>
                  <WiThermometer color="#E50046" size={20} /> Temperature:
                </strong>{" "}
                {data.main.temp}°C
              </p>
              <p>
                <strong>
                  <WiStrongWind size={20} color="#E50046" /> Wind Speed:
                </strong>{" "}
                {data.wind.speed} k/m
              </p>
              <p>
                <strong className="text-capitalize">
                  <WiHumidity size={20} color="#E50046" /> Humidity:
                </strong>{" "}
                {data.main.humidity}%
              </p>
              <p className="text-capitalize">
                <strong className="text-capitalize ms-4">Description:</strong> {data.weather[0].description}
              </p>
              <div className="d-flex justify-content-center">
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  width={100}
                  height={100}
                  alt="Weather Icon"
                  
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
