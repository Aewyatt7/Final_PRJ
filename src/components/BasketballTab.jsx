import React from 'react';

const BasketballTab = ({ sportsData }) => {
  const basketballSports = sportsData.filter(sport => sport.group === 'Basketball');
  const nbaData = basketballSports.find(sport => sport.title === 'NBA');

  //if truthy NBAteams will be assigned value of nbaData.teams
  //if falsy will be assigned to an empty array
  const nbaTeams = nbaData ? nbaData.teams : [];

  return (
    <div>
      <h2>NBA Teams</h2>
      <select>
        {nbaTeams.map((team, index) => (
          <option key={index}>{team}</option>
        ))}
      </select>
    </div>
  );
};

export default BasketballTab;



/*oddsData.map((sportOdds, index) => (
          <p>{sportOdds}</p>
          
        
          <div key={index}>
            <h3>{sportOdds.sport_title}</h3>
            {sportOdds.bookmakers.map((bookmaker, bookmakerIndex) => (
              <div key={bookmakerIndex}>
                <h4>{bookmaker.title}</h4>
                {bookmaker.markets.map((market, marketIndex) => (
                  <div key={marketIndex}>
                    <h5>{market.key.toUpperCase()}</h5>
                    {market.outcomes.map((outcome, outcomeIndex) => (
                      <div key={outcomeIndex}>
                        <p>{outcome.name}: {outcome.price}</p>
                      </div>
                      ))}
                      </div>
                      ))}
                      </div>
                      ))}
                      </div>
                    ))*/


                    [2].bookmakers[2].markets[0]

                    {
                      "key": "h2h",
                      "last_update": "2024-03-12T22:55:34Z",
                      "outcomes": [
                          {
                              "name": "Memphis Grizzlies",
                              "price": 2.15
                          },
                          {
                              "name": "Washington Wizards",
                              "price": 1.71
                          }
                      ]
                  }


    //Bundles all your promises and consumes all of them
    Promise.all(fetchPromises)
    .then((responsesArray) => {
        return Promise.all (responsesArray.map((response) => response.json()));
        