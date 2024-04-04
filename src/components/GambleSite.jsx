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

  const apiKey = "0bca924da199dd49f8995a73c8ee422d";
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
        `${oddsApiUrl}/sports/${sportLeague.key}/odds?apiKey=${apiKey}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
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
                console.log("OddsData", oddsData);

                return (
                  <>
                    <p>&nbsp;{/*Break between tables*/}</p>

                    <table border="1" width="400">
                      <tr align="center">
                        <th colSpan="7">
                          {obj.away_team} @ {obj.home_team}
                        </th>
                      </tr>
                      <tr align="center">
                        <th>Sportsbook</th>
                        <th colSpan="2">Moneyline</th>
                        <th colSpan="2">Spread</th>
                        <th colSpan="2">Total</th>
                      </tr>
                      {obj.bookmakers
                        .filter((book) => sportsbooks.includes(book.title))
                        .map((bookmaker) => {
                          console.log("bookmaker", bookmaker);
                          return (
                            <tr align="center">
                              <th> {bookmaker.title}</th>
                              {bookmaker.markets.map((market) => {
                                return market.outcomes.map(
                                  ({ name, price, point }) => {
                                    let sbTemp = "";

                                    if (name === "Over") {
                                      sbTemp = "O ";
                                    } else if (name === "Under") {
                                      sbTemp = "U ";
                                    }

                                    if (point !== "") {
                                      sbTemp += `${point}`;
                                    }

                                    sbTemp += price;

                                    return  <td>{sbTemp}</td>
                                 
                                  }
                                );
                              })}
                            </tr>
                          );
                        })}
                    </table>
                  </>
                );
              })}
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

//TO DO
