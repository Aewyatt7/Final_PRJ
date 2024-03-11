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