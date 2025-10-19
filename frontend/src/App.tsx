import { useState, useEffect } from 'react';
import './App.css';

// --- TYPE DEFINITIONS ---
interface Champion {
  name: string;
  flex_group: number | null;
}

interface ChampionsByTier {
  [tier: string]: Champion[];
}

interface RoleInfo {
  champions_by_tier: ChampionsByTier;
}

interface Player {
  player: string;
  roles: Record<string, RoleInfo>;
}

const ROLE_ORDER = ["Top", "Jungle", "Mid", "ADC", "Support"];

// --- HELPER COMPONENTS ---
const InfoCallout = () => (
  <div className="info-callout">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <p>Click a cell to lock in a player for a role. Click again to unlock.</p>
  </div>
);

const ChampionList = ({ champions_by_tier }: { champions_by_tier: ChampionsByTier }) => (
  <>
    {Object.entries(champions_by_tier).map(([tier, champs]) => (
      <div key={tier} className="tier-group">
        <strong>{tier}: </strong>
        {champs.map((champ, champIndex) => (
          <span key={champ.name}>
            {champ.flex_group !== null ? (
              <span className={`flex-group-${champ.flex_group % 6}`}>{champ.name}</span>
            ) : (
              champ.name
            )}
            {champIndex < champs.length - 1 && ', '}
          </span>
        ))}
      </div>
    ))}
  </>
);

// --- DATA TRANSFORMATION LOGIC ---
const transformPlayerData = (playersData: any[], selectedPlayerNames: string[]): Player[] => {
  const selectedData = playersData.filter(p => selectedPlayerNames.includes(p.player_name));

  const championPlayerMap: Record<string, string[]> = {};
  selectedData.forEach(player => {
    player.champions.forEach((champ: any) => {
      if (!championPlayerMap[champ.name]) {
        championPlayerMap[champ.name] = [];
      }
      championPlayerMap[champ.name].push(player.player_name);
    });
  });

  const flexChampions: Record<string, number> = {};
  let flexGroupCounter = 1;
  Object.entries(championPlayerMap).forEach(([champName, players]) => {
    if (players.length > 1) {
      flexChampions[champName] = flexGroupCounter++;
    }
  });

  const transformedRoster = selectedData.map(player => {
    const roles: Record<string, RoleInfo> = {};
    player.champions.forEach((champ: any) => {
      if (!roles[champ.role]) {
        roles[champ.role] = { champions_by_tier: {} };
      }
      if (!roles[champ.role].champions_by_tier[champ.tier]) {
        roles[champ.role].champions_by_tier[champ.tier] = [];
      }
      roles[champ.role].champions_by_tier[champ.tier].push({
        name: champ.name,
        flex_group: flexChampions[champ.name] || null,
      });
    });

    Object.values(roles).forEach(roleInfo => {
        const sortedTiers: ChampionsByTier = {};
        const tierOrder = ['S', 'A', 'B', 'C', 'D'];
        tierOrder.forEach(tier => {
            if (roleInfo.champions_by_tier[tier]) {
                sortedTiers[tier] = roleInfo.champions_by_tier[tier];
            }
        });
        roleInfo.champions_by_tier = sortedTiers;
    });


    return {
      player: player.player_name,
      roles: roles,
    };
  });

  return transformedRoster;
};

// --- MAIN APP COMPONENT ---
function App() {
  const [allPlayersData, setAllPlayersData] = useState<any[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [roster, setRoster] = useState<Player[]>([]);
  const [lockedSelections, setLockedSelections] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('players.json')
      .then(response => response.json())
      .then(data => {
        setAllPlayersData(data);
        const playerNames = data.map((p: any) => p.player_name);
        setPlayers(playerNames);
      });
  }, []);

  const handlePlayerSelection = (player: string) => {
    setSelectedPlayers(prev => prev.includes(player) ? prev.filter(p => p !== player) : [...prev, player]);
  };

  const generateRoster = () => {
    if (selectedPlayers.length === 0) {
      setRoster([]);
      return;
    }
    const newRoster = transformPlayerData(allPlayersData, selectedPlayers);
    setRoster(newRoster);
    setLockedSelections({});
  };

  const handleLockIn = (role: string, player: string) => {
    setLockedSelections(prev => {
      const newLocks = { ...prev };
      if (newLocks[role] === player) {
        delete newLocks[role];
      } else {
        newLocks[role] = player;
      }
      return newLocks;
    });
  };

  const getCellClassName = (role: string, player: string) => {
    const isLocked = lockedSelections[role] === player;
    if (isLocked) return 'locked-in';

    const isPlayerLockedElsewhere = Object.values(lockedSelections).includes(player);
    const isRoleLockedElsewhere = lockedSelections[role] !== undefined;

    if (Object.keys(lockedSelections).length > 0 && (isPlayerLockedElsewhere || isRoleLockedElsewhere)) {
      return 'disabled';
    }
    
    return ''
  }

  return (
    <div className="App">
      <header className="App-header"><h1>RosterFactory</h1></header>
      <main>
        <div className="player-selection">
          <h2>Select Players</h2>
          <div className="player-list">
            {players.map(player => (
              <div key={player}>
                <input type="checkbox" id={player} value={player} onChange={() => handlePlayerSelection(player)} />
                <label htmlFor={player}>{player}</label>
              </div>
            ))}
          </div>
          <button onClick={generateRoster}>Generate Roster</button>
        </div>
        <div className="roster-container">
          <InfoCallout />
          <div className="roster-display">
            {roster.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Player</th>
                    {ROLE_ORDER.map(role => <th key={role}>{role}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {roster.map(({ player, roles }) => (
                    <tr key={player}>
                      <td className="player-cell">{player}</td>
                      {ROLE_ORDER.map(role => (
                        <td key={role} 
                            onClick={() => roles[role] && handleLockIn(role, player)} 
                            className={getCellClassName(role, player)}>
                          {roles[role] && <ChampionList champions_by_tier={roles[role].champions_by_tier} />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Select players and click "Generate Roster" to see the results.</p>
            )}
          </div>
        </div>
      </main>
      <footer className="App-footer">
        <p>
          Want to add your champions?
          <a
            href="https://github.com/lars-3010/RosterFactory/tree/main/data/players"
            target="_blank"
            rel="noopener noreferrer"
          >
            Add your player file here
          </a>
          and open a pull request!
        </p>
      </footer>
    </div>
  );
}

export default App;