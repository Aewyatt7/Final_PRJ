import React, { useEffect, useState } from "react";

const GambleSite = () => {
  const [sportsData, setSportsData] = useState([]);
  const [filteredSportsData, setFilteredSportsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [oddsData, setOddsData] = useState([]);
  const apiKey = "d117bdc20de0d410334b155416a20786";
  const oddsApiUrl = `https://api.the-odds-api.com/v4/sports/${selectedSport}/odds/?apiKey=${apiKey}`;
 
  const sportsWanted = [
    "American Football",
    "Basketball",
    "Ice Hockey",
    "Tennis",
    "Boxing",
    "Mixed Martial Arts",
    "Soccer",
    "Golf",
  ];

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const response = await fetch(`${oddsApiUrl}/sports/?apiKey=${apiKey}`);

        const data = await response.json();
        setSportsData(data);
        const filteredData = data.filter((sport) =>
          sportsWanted.includes(sport.group)
        );

        setSportsData(filteredData);
        setFilteredSportsData(filteredData);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSportsData();
  }, []);

  return (
    <div>
      <h2>All Sports Available for Betting</h2>
      <select onChange={handleSportChange} value={selectedSport}>
        <option>Select a sport</option>
        {sportsWanted.map((sport, index) => (
          <option key={index} value={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
  );

  function handleSportChange(event) {
    const selectedSport = event.target.value;
    setSelectedSport(selectedSport);
    console.log("selected sport", selectedSport);

    const gamesWanted = filteredSportsData.filter((sport) =>
      selectedSport.includes(sport.group)
    );

    console.log("Selected sport:", gamesWanted);
  }
};

export default GambleSite;
