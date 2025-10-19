<div align="center">

# RosterFactory

**A simple tool to generate team rosters based on player availability and roles.**

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

**[Getting Started](#-getting-started)**

</div>

---

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