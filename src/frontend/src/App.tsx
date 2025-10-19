import { useState, useEffect } from 'react';
import './App.css';

interface Champion {
  name: string;
  flex_group: number | null;
}

interface PlayerInfo {
  player: string;
  champions_by_tier: Record<string, Champion[]>;
}

const TIER_COLUMNS = ['S', 'A', 'B'];

function App() {
  const [players, setPlayers] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [roster, setRoster] = useState<Record<string, PlayerInfo[]>>({});

  useEffect(() => {
    fetch('http://localhost:8000/api/players')
      .then(response => response.json())
      .then(data => setPlayers(data.players));
  }, []);

  const handlePlayerSelection = (player: string) => {
    setSelectedPlayers(prevSelected =>
      prevSelected.includes(player)
        ? prevSelected.filter(p => p !== player)
        : [...prevSelected, player]
    );
  };

  const generateRoster = () => {
    if (selectedPlayers.length === 0) {
      setRoster({});
      return;
    }
    const playerQuery = selectedPlayers.join(',');
    fetch(`http://localhost:8000/api/roster?players=${playerQuery}`)
      .then(response => response.json())
      .then(data => setRoster(data));
  };

  const renderChampion = (champ: Champion, isLast: boolean) => (
    <span key={champ.name}>
      {champ.flex_group !== null ? (
        <span className={`flex-group-${champ.flex_group % 6}`}>
          {champ.name}
        </span>
      ) : (
        champ.name
      )}
      {!isLast && ', '}
    </span>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>RosterFactory</h1>
      </header>
      <main>
        <div className="player-selection">
          <h2>Select Players</h2>
          <div className="player-list">
            {players.map(player => (
              <div key={player}>
                <input
                  type="checkbox"
                  id={player}
                  value={player}
                  onChange={() => handlePlayerSelection(player)}
                />
                <label htmlFor={player}>{player}</label>
              </div>
            ))}
          </div>
          <button onClick={generateRoster}>Generate Roster</button>
        </div>
        <div className="roster-display">
          <h2>Generated Roster</h2>
          {Object.keys(roster).length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Player</th>
                  {TIER_COLUMNS.map(tier => <th key={tier}>{tier}-Tier</th>)}
                </tr>
              </thead>
              <tbody>
                {Object.entries(roster).map(([role, playersInRole]) =>
                  playersInRole.map((playerInfo, index) => (
                    <tr key={`${role}-${playerInfo.player}-${index}`}>
                      {index === 0 && <td rowSpan={playersInRole.length} className="role-cell">{role}</td>}
                      <td>{playerInfo.player}</td>
                      {TIER_COLUMNS.map(tier => (
                        <td key={tier}>
                          {playerInfo.champions_by_tier[tier]?.map((champ, champIndex) => 
                            renderChampion(champ, champIndex === playerInfo.champions_by_tier[tier].length - 1)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <p>Select players and click "Generate Roster" to see the results.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;