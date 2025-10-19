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
