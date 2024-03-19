import React, { useEffect, useState } from "react";
const sportsbooks =["DraftKings","BetMGM","FanDuel"];

const GambleSite = () => {
  const [sportsData, setSportsData] = useState([]);
  const [filteredSportsData, setFilteredSportsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState([]);
  const [gamesWanted, setGamesWanted] = useState([])
  const [oddsData, setOddsData] = useState([]);

  const apiKey = "05abdb2810a898d570328f0ff0ad3581";
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
            return Promise.all(responsesArray.map((response) => response.json()));

        })
        .then((dataArray) => {
            console.log('betting odds data top level array', dataArray);

            // Set the state variable to the dataArray variable
            setOddsData(dataArray);

            const basketballNBA = dataArray[1];
            basketballNBA.forEach(obj => {
                const id = obj.id;
                const sportKey = obj.sport_key;
                const sportTitle = obj.sport_title;
                const commenceTime = obj.commence_time;
                const homeTeam = obj.home_team;
                const awayTeam = obj.away_team;
                const bookMakers = obj.bookMakers;
              

                console.log(`ID: ${id}, Sport Key: ${sportKey}, Sport Title: ${sportTitle}, Commence Time: ${commenceTime}, Home Team: ${homeTeam}`);
            });
        })
        .catch((err) => {
            console.error(err);
        });
}, [gamesWanted]);


  
console.log(sportsbooks)
console.log(oddsData[1].map(thing2 => thing2.bookmakers).filter(thing => {
  console.log(thing.title, thing)
  return sportsbooks.includes(thing.title)}))
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
        {oddsData[1].map(thing2 => thing2.bookmakers).filter(thing => sportsbooks.includes(thing.title)).map((obj) => {
          return(
            <ul>{obj.markets.map(market => {
              return <li>{market.outcomes.map(outcome => { 
                return <p>{outcome.name}:{outcome.price}</p>
              })}</li>
            })}</ul>
            
          )
        })}
        
      </div>
      <div>
        <p>Games </p>
      </div>
    </div>
  );
  

  function handleSportChange(event) {
    const selectedSport = event.target.value;
    setSelectedSport(selectedSport);
    console.log("selected sport", selectedSport);

    const tempGames = sportsData.filter((sport) =>
      selectedSport.includes(sport.group)
    );
    console.log("sorting practice", tempGames);
      setGamesWanted (tempGames);
    console.log("Temp League:", tempGames);
  }
};

export default GambleSite;


// look up how to iterate over react  promised objects???
//XML format... learn about it
//stockdash

