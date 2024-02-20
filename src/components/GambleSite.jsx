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
        const response = await fetch(
          `https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`
        );

        const data = await response.json();
        setSportsData(data);
        const filteredData = data.filter((sport) =>
          sportsWanted.includes(sport.group)
        );

        setFilteredSportsData(filteredData);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSportsData();
  }, []);

  useEffect(() => {
    const fetchOddsData = async () => {
      try {
        if (selectedSport) {
          const response = await fetch(oddsApiUrl);
          const data = await response.json();
          setOddsData(data);
        }
      } catch (error) {
        console.error("Error fetching odds data:", error);
      }
    };

    fetchOddsData();
  }, [selectedSport, oddsApiUrl]);

  const handleSportChange = (event) => {
    const selectedSport = event.target.value;
    setSelectedSport(selectedSport);
  };

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
      
      {oddsData.length > 0 && (
        <div>
          <h2>Odds for {selectedSport}</h2>
          <ul>
            {oddsData.map((game, index) => (
              <li key={index}>
                {/* Render details of each game */}
                {/* Example: {game.teams} - {game.odds} */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GambleSite;
