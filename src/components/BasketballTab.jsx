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

