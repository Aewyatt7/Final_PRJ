import React, { useEffect, useState } from "react";
const sportsbooks = ["DraftKings", "BetMGM", "FanDuel"];

const sportsConfig = {
  Basketball: {
    api: ["basketball_nba", "basketball_ncaab"],
  },
};

const GambleSite = () => {
  const [sportsData, setSportsData] = useState([]);
  const [filteredSportsData, setFilteredSportsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState([]);
  const [gamesWanted, setGamesWanted] = useState([]);
  const [oddsData, setOddsData] = useState([]);

  const apiKey = "18100a7eb1ac101521815a7ed8f9ce3c";
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

  {
  }

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const response = await fetch(`${oddsApiUrl}/sports/?apiKey=${apiKey}`);

        const data = await response.json();
        console.log(data);
        //reconsider using this maybe we dont need the setsportsData
        setSportsData(data);
        console.log(sportsData);
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
      return fetch(
        `${oddsApiUrl}/sports/${sportLeague.key}/odds?apiKey=${apiKey}&regions=us&markets=h2h,spreads,totals`
      );
    });

    //Bundles all your promises and consumes all of them
    Promise.all(fetchPromises)
      .then((responsesArray) => {
        return Promise.all(responsesArray.map((response) => response.json()));
      })
      .then((dataArray) => {
        console.log("betting odds data top level array", dataArray);

        // Set the state variable to the dataArray variable
        const filterBooks = dataArray
          .flat()
          .map((game) => game.bookmakers)
          .map((bookmakers) =>
            bookmakers.filter((book) => sportsbooks.includes(book.title))
          )
          .flat();
        setOddsData(dataArray);
        /*setOddsData(filterBooks);*/
      })
      .catch((err) => {
        console.error(err);
      });
  }, [gamesWanted]);

  console.log(sportsbooks);

  // console.log(oddsData[1]?.map(game => game.bookmakers).filter(bookmakers => {
  //   console.log(bookmakers.title, bookmakers)
  //   return sportsbooks.includes(bookmakers.title)
  // }))
  return (
    <div>
      <h2>Today's Games</h2>
      <select
        onChange={handleSportChange}
        value={selectedSport.length > 0 ? selectedSport[0].key : ""}
      >
        <option>Select a sport</option>
        {sportsWanted.map((sport, index) => (
          <option key={index} value={sport}>
            {sport}
          </option>
        ))}
      </select>
      <div>
        {/* oddsData - []
          -> game.bookmakers - map [[{}], [{}], [{}], [{}], [{}], [{}, {}, {}]]
          -> bookmakers - map [{}, {}, {}] -> filter book.title [{}, {}, {}] - [[{}], [{}], [{}], [{}], [{}], [{}, {}, {}]]
          -> flat - [{}, {}, {}, {}, {}, {}, {}]
        */}
        <table>
          <tbody>
            {oddsData.length > 0 &&
              oddsData[0].map((obj, idx) => {
                return (
                  <table border="1">
                    <tr align='center'>
                      <td>{obj.away_team} @ {obj.home_team}</td>
                    </tr>
                    {obj.bookmakers.map((bookmaker) => {
                      return (
                        <tr align='center'>
                          <td>{bookmaker.title}</td>
                          {bookmaker.markets.map((market) => {
                            return <td>{market.key}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </table>
                );
              })}
            {/*
              obj.markets.map((market, marketIdx) => {
                if (market.key == "h2h") {
                  return <div>h2h</div>;
                }
                if (market.key == "spreads") {
                  return <div>spreads</div>;
                }
                if (market.key == "totals") {
                  return <div>totals</div>;
                }

                return (
                  <tr key={`${idx}-${marketIdx}-${outcomeIdx}`}>
                    <td>{outcome.name}</td>
                   
                    <td>
                      <table>
                        <tr>
                          <th></th> 
                          <th>FanDuel</th>
                          <th>MGM</th>
                          <th>Draft Kings</th>
                        </tr>
                        <tr>
                          {" "}
                         
                          <th>ML:</th>
                          <td>DATA</td>
                          <td>{outcome.point}</td>
                          <td>DATA</td>
                        </tr>
                        <tr>
                          {" "}
                          
                          <th>Spread:</th>
                          <td>{outcome.price}</td>
                          <td>DATA</td>
                          <td>DATA</td>
                        </tr>
                        <tr>
                          {" "}
                          
                          <th>Total:</th>
                          <td>DATA</td>
                          <td>DATA</td>
                          <td>DATA</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                );
              })
            )}*/}
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleSportChange(event) {
    const selectedSport = event.target.value;
    setSelectedSport(selectedSport);
    console.log("selected sport", selectedSport);

    const tempGames = sportsData.filter(
      (sport) =>
        selectedSport.includes(sport.group) &&
        sportsConfig[selectedSport].api.includes(sport.key)
    );
    console.log("sorting practice", tempGames);
    setGamesWanted(tempGames);
    console.log("Temp League:", tempGames);
  }
};

export default GambleSite;

// look up how to iterate over react  promised objects???
//XML format... learn about it
//stockdash
// merge the data... after making the data
// How to sort an array in javascript
