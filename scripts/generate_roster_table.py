import os
import yaml
from pathlib import Path

def get_player_data():
    """Reads all player YAML files and returns a dictionary of player data."""
    player_data = {}
    data_dir = Path("data/players")
    for file_path in data_dir.glob("*.yml"):
        with open(file_path, "r") as f:
            data = yaml.safe_load(f)
            player_name = data["player_name"]
            player_data[player_name] = {"champions": data["champions"]}
    return player_data

def generate_markdown_table(player_data):
    """Generates a Markdown table from player data."""
    roles = ["Top", "Jungle", "Mid", "ADC", "Support"]
    header = "| Player | " + " | ".join(roles) + " |\n"
    separator = "|---" * (len(roles) + 1) + "|\n"
    
    body = ""
    for player_name, data in sorted(player_data.items()):
        row = f"| {player_name} |"
        champions_by_role = {}
        for champion in data["champions"]:
            role = champion["role"]
            if role not in champions_by_role:
                champions_by_role[role] = []
            champions_by_role[role].append(champion)

        for role in roles:
            if role in champions_by_role:
                # Sort champions by tier (S, A, B, ...)
                sorted_champions = sorted(champions_by_role[role], key=lambda x: x.get("tier", "Z"))
                champions_str = "<br>".join([f"**{c['tier']}**: {c['name']}" for c in sorted_champions])
                row += f" {champions_str} |"
            else:
                row += " |"
        body += row + "\n"
        
    return header + separator + body

def update_readme(table):
    """Updates the README.md file with the generated table."""
    readme_path = "README.md"
    with open(readme_path, "r") as f:
        content = f.read()

    start_marker = "<!-- ROSTER_TABLE_START -->"
    end_marker = "<!-- ROSTER_TABLE_END -->"

    start_index = content.find(start_marker)
    end_index = content.find(end_marker)

    if start_index != -1 and end_index != -1:
        new_content = (
            content[:start_index + len(start_marker)] + 
            "\n\n" + table + "\n" + 
            content[end_index:]
        )
        with open(readme_path, "w") as f:
            f.write(new_content)
        print("README.md updated successfully.")
    else:
        print("Could not find markers in README.md. Please add them.")

if __name__ == "__main__":
    player_data = get_player_data()
    markdown_table = generate_markdown_table(player_data)
    update_readme(markdown_table)
