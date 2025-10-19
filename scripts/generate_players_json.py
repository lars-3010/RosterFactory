
import os
import yaml
import json

def generate_players_json():
    """
    Reads all YAML files from the data/players directory,
    consolidates them into a single JSON file, and places
    it in the frontend/public directory.
    """
    players_data = []
    data_dir = "data/players"
    output_dir = "frontend/public"
    output_file = os.path.join(output_dir, "players.json")

    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    for filename in os.listdir(data_dir):
        if filename.endswith(".yml"):
            filepath = os.path.join(data_dir, filename)
            with open(filepath, "r") as f:
                player_data = yaml.safe_load(f)
                players_data.append(player_data)

    with open(output_file, "w") as f:
        json.dump(players_data, f, indent=2)

    print(f"Successfully generated {output_file}")

if __name__ == "__main__":
    generate_players_json()
