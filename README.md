<div align="center">

# RosterFactory

**An interactive tool to generate and organize team rosters from a pool of players.**

<br/>

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
<img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white" alt="Python" />
<img src="https://img.shields.io/badge/FastAPI-005571?logo=fastapi&logoColor=white" alt="FastAPI" />
<img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Task-4A4A4A" alt="Task" />
<img src="https://img.shields.io/badge/uv-9C4FFF" alt="uv" />

<br/>

**[Features](#-features)** • **[Getting Started](#-getting-started)**

</div>

---

## ✨ Features

- **Dynamic Roster Generation:** Select from a list of available players and instantly generate a roster.
- **Pivoted Table View:** View the roster with players as rows and roles as columns for a clear overview of each player's capabilities.
- **Tier-Based Grouping:** Champions are automatically grouped by tier (S, A, B, etc.) within each cell.
- **Shared Pick Highlighting:** Automatically highlights any champion that can be played by more than one of the selected players.
- **Interactive Drafting Mode:** Click a cell to "lock in" a player for a specific role. This grays out all other conflicting options, making it easy to build a final team composition.

## 📖 Player Roster

<!-- ROSTER_TABLE_START -->

| Player | Top | Jungle | Mid | ADC | Support |
|---|---|---|---|---|---|
| Ayoub | | | **A**: Mel | | **A**: Nautilus<br>**A**: Milio |
| Hendrik | **A**: Darius | | | | |
| Jan | **A**: Gnar | | | **A**: Jinx<br>**A**: Ashe<br>**S**: Sivir<br>**S**: Kai'Sa | |
| Lars | **A**: Jax<br>**A**: Fiora<br>**A**: Shen<br>**S**: Camille<br>**S**: Mordekaiser | **A**: Shen<br>**A**: Shyvana<br>**S**: Jarvan IV | **A**: Galio<br>**A**: Azir<br>**A**: Viktor<br>**A**: Anivia<br>**S**: Orianna | **A**: Ezreal<br>**A**: Senna<br>**A**: Seraphine | |
| Lukas | | **A**: Volibear | **A**: Veigar<br>**S**: Ahri | **A**: Ashe | |
| Marisa | | | | **A**: Jhin | **A**: Lulu<br>**S**: Nami |
| Maxim | **A**: Cho'Gath | **A**: Amumu<br>**A**: Diana<br>**A**: Evelynn<br>**A**: Jarvan IV<br>**A**: Shen<br>**A**: Seraphine<br>**B**: Rammus<br>**B**: Volibear<br>**B**: Shyvana<br>**B**: Nocturn<br>**B**: Nunu | **A**: Galio | | **A**: Lulu<br>**A**: Sona<br>**B**: Leona |
| Niklas | **A**: Cho'Gath<br>**A**: Garen<br>**A**: Jax<br>**A**: Yasuo<br>**S**: Tahm Kench | | | | |
| Simon | **S**: Mordekaiser | | **S**: Mordekaiser<br>**S**: Veigar | | |
| Timon | **A**: Shen | **A**: Jarvan IV | | | |

<!-- ROSTER_TABLE_END -->

## 🚀 Getting Started

### Prerequisites

<details>
<summary>macOS (Homebrew)</summary>

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install prerequisites
brew install python
brew install node
brew install go-task/tap/go-task
brew install uv
```

</details>

<details>
<summary>Windows</summary>

*   **Python:** Download and install from [python.org](https://www.python.org/downloads/).
*   **Node.js:** Download and install from [nodejs.org](https://nodejs.org/en/download/).
*   **Task:**
    *   Using Chocolatey: `choco install go-task`
    *   Other methods: See [Task installation guide](https://taskfile.dev/installation/).
*   **uv:**
    *   Using PowerShell: `powershell -c "irm https://astral.sh/uv/install.ps1 | iex"`

</details>

### Installation

To install all dependencies for both the backend and frontend, run:

```bash
task install
```

### Running the Application

To run the development servers, you'll need two separate terminals:

**Terminal 1: Run the Backend**

```bash
task dev:backend
```

**Terminal 2: Run the Frontend**

```bash
task dev:frontend
```

Once both servers are running, you can access the web UI at `http://localhost:5173` (or whatever port Vite is using).
