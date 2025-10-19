import yaml
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the path to your player data
PLAYER_DATA_DIR = Path(__file__).parent.parent.parent / "data" / "players"
TIER_ORDER = ["S", "A", "B", "C", "D", "F"]
ROLE_ORDER = ["Top", "Jungle", "Mid", "ADC", "Support"]

def load_players_to_df(data_path: Path) -> pd.DataFrame:
    """
    Scans a directory for YAML files, parses them, and compiles them into a single DataFrame.
    """
    player_data = []
    player_files = list(data_path.glob("*.yml"))
    
    if not player_files:
        return pd.DataFrame() # Return empty DataFrame if no files found

    for file_path in player_files:
        with open(file_path, 'r') as f:
            data = yaml.safe_load(f)
            player_name = data['player_name']
            for champ in data.get('champions', []):
                player_data.append({
                    'player': player_name,
                    'role': champ['role'],
                    'tier': champ['tier'],
                    'champion': champ['name']
                })
    
    return pd.DataFrame(player_data)

@app.get("/api/players")
async def get_players():
    """
    Returns a list of all player names.
    """
    roster_df = load_players_to_df(PLAYER_DATA_DIR)
    if roster_df.empty:
        return {"players": []}
    return {"players": sorted(roster_df["player"].unique().tolist())}

@app.get("/api/roster")
async def get_roster(players: str):
    """
    Returns a list of players with their roles and champions, with shared picks identified.
    """
    roster_df = load_players_to_df(PLAYER_DATA_DIR)
    selected_players = players.split(",")
    
    if not selected_players or not players or roster_df.empty:
        return []
        
    filtered_df = roster_df[roster_df['player'].isin(selected_players)]
    
    # Find shared picks (champions that can be played by more than one player)
    champion_players = filtered_df.groupby('champion')['player'].nunique()
    shared_champion_names = champion_players[champion_players > 1].index.tolist()
    
    flex_groups = {
        champ_name: i for i, champ_name in enumerate(shared_champion_names)
    }

    # Build the player-centric roster
    player_roster = []
    for player in sorted(filtered_df['player'].unique()):
        player_df = filtered_df[filtered_df['player'] == player]
        player_roles = {}
        
        for role in ROLE_ORDER:
            role_df = player_df[player_df['role'] == role]
            if not role_df.empty:
                champs_by_tier = {}
                for _, row in role_df.iterrows():
                    tier = row['tier']
                    if tier not in champs_by_tier:
                        champs_by_tier[tier] = []
                    
                    flex_group = flex_groups.get(row['champion'])
                    
                    champs_by_tier[tier].append({
                        "name": row['champion'],
                        "flex_group": flex_group
                    })

                sorted_champs_by_tier = {
                    tier: champs_by_tier[tier] 
                    for tier in TIER_ORDER if tier in champs_by_tier
                }
                player_roles[role] = {"champions_by_tier": sorted_champs_by_tier}

        player_roster.append({
            "player": player,
            "roles": player_roles
        })
                
    return player_roster

@app.get("/")
async def root():
    return {"message": "RosterFactory API is running!"}
