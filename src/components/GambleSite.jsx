import React, { useEffect, useState } from "react";

const GambleSite = () => {
  const [sportsData, setSportsData] = useState([]);
  const [filteredSportsData, setFilteredSportsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState([]);
  const [gamesWanted, setGamesWanted] = useState([])
  const [oddsData, setOddsData] = useState([]);
  const apiKey = "d117bdc20de0d410334b155416a20786";
  const oddsApiUrl = "https://api.the-odds-api.com/v4";
  const sportsWanted = [
    //"American Football",
    "Basketball",
    //"Ice Hockey",
    //"Tennis",
    //"Boxing",
    //"Mixed Martial Arts",
    //"Soccer",
    //"Golf",
  ];

// multple fetches at the "same time"
//and then handle all of their resolutions



  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const response = await fetch(`${oddsApiUrl}/sports/?apiKey=${apiKey}`);

        const data = await response.json();
        console.log(data)
        //reconsider using this maybe we dont need the setsportsData
        setSportsData(data);
        console.log(sportsData)
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
    //This will run after any time the user picks a new sport in the dropdown
    //We want to fetch all the markets data at once
    //We start with an array of all the sport leagues
    //We want to get the market data FOR EACH LEAGUE

    const fetchPromises = gamesWanted.map((sportLeague) => {
      //You can list multiple markets as a API parameter later when you want to change this
      return fetch(`${oddsApiUrl}/sports/${sportLeague.key}/odds?apiKey=${apiKey}&regions=us&markets=h2h,spreads,totals`);
    });

    //Bundles all your promises and consumes all of them
    Promise.all(fetchPromises)
    .then((responsesArray) => {
        console.log (responsesArray)
        return responsesArray.map((response) => response.json());
    })
    .then((dataArray) => {
      console.log('betting odds data', dataArray);

      //setOddsData(dataArray.map((response) => response.json()));
      //Store this inside of some new state variable
    })
    .catch((err) => {
      console.error(err);
    });
  }, [gamesWanted]);

  


  return (
    <div>
      <h2>All Sports Available for Betting</h2>
      <select onChange={handleSportChange} value={selectedSport.length > 0 ? selectedSport[0].key : ""}>
        <option>Select a sport</option>
        {sportsWanted.map((sport, index) => (
          <option key={index} value={sport}>
            {sport}
          </option>
        ))}
      </select>
      
      <div>
        <p>Games</p>
  
      </div>
    </div>
  );

  function handleSportChange(event) {
    const selectedSport = event.target.value;
    setSelectedSport(selectedSport);
    console.log("selected sport", selectedSport);

    const tempGames = filteredSportsData.filter((sport) =>
      selectedSport.includes(sport.group)
    );
      setGamesWanted (tempGames);
    console.log("Temp League:", tempGames);
  }
};

export default GambleSite;


// look up how to iterate over react  promised objects???

