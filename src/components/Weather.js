import React from "react";
import "./Weather.css";
import { useState } from "react";
import DisplayWeather from "./DisplayWeather";

const Weather = () => {
  // Synchronous code  - is executed in sequence – each statement waits for the previous statement to finish before executing. Asynchronous code doesn’t have to wait – your program can continue to run. You do this to keep your site or app responsive, reducing waiting time for the user.
  //   Always returns a Promise.

  // -------------------------
  //   What is a Promise?
  // "Producing code" is code that can take some time
  // "Consuming code" is code that must wait for the result
  // A Promise is a JavaScript object that links producing code and consuming code

  // --------------------------
  // The keyword await makes JavaScript wait until that promise settles and returns its result.
  const APIKEY = "0a8591bd66c49eaf8180d31b0258e312";
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });
  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      // spread operator
      setForm({ ...form, city: value });
    }

    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };

  return (
    <div className="weather">
      <span className="title">Weather App &nbsp; &nbsp; &nbsp;</span>
      <br />
      <form>
        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp;
        <input
          type="text"
          name="country"
          placeholder="country"
          onChange={(e) => handleChange(e)}
        />
        &nbsp;
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>
      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
