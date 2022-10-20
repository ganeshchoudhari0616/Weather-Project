import React, { useState } from "react";
import "./App.css";

function App() {
	const [location, setLocation] = useState("");
	const [data, setData] = useState({});

	const url = `http://api.weatherstack.com/current?access_key=8ef150d461a796dcce6a906699d7ff70&query=${location}`;

	const searchLocation = async (event) => {
		if (event.key === "Enter") {
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			if (data.success === false) {
				alert("Please enter valid name");
			} else {
				setData(data);
			}
			setLocation("");
		}
	};

	return (
		<>
			<div className="wrap">
				<div className="search">
					<input
						value={location}
						onChange={(event) => setLocation(event.target.value)}
						onKeyPress={searchLocation}
						placeholder="Enter Location"
						type="text"
					/>
				</div>
			</div>

			{data?.current?.temperature !== undefined && (
				<>
					<div className="widget">
						<div className="top">
							<h2>{data.location.localtime}</h2>
							<h2>{data.request.query}</h2>
							<h2>
								{data.current.temperature}
								°C
							</h2>
						</div>
						<div className="middle">
            <h1>{data.current.weather_descriptions[0]}</h1>
            <img src={data["current"]["weather_icons"][0]} alt="weather"/>
            </div>
						<div className="extra-temp">
							<div className="temp-info-minmax">
								<div className="two-sided-section">
									<p>
										<i className={"wi wi-humidity"}></i>
									</p>
									<p className="extra-info-leftside">
										{" "}
										{data?.current?.humidity} % <br />{" "}
										Humidity{" "}
									</p>
								</div>

								<div className="two-sided-section">
									<p>
										<i className={"wi wi-rain"}></i>
									</p>
									<p className="extra-info-leftside">
										{" "}
										{data?.current?.pressure} <br />{" "}
										Pressure{" "}
									</p>
								</div>

								<div className="two-sided-section">
									<p>
										<i className={"wi wi-strong-wind"}></i>
									</p>
									<p className="extra-info-leftside">
										{" "}
										{data?.current?.wind_speed}
										<br /> Speed{" "}
									</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default App;
