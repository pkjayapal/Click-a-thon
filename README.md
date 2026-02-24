# Click-a-thon
Click-a-thon is a lightweight browser-based clicking game built with plain HTML, CSS, and JavaScript.

## The goal is simple:

Click as many times as you can in 5 seconds.

When the timer starts, you have five seconds to click the main button as fast as possible. When time runs out, your final score is displayed — and if you beat your previous best, a new high score is saved.

## Features

* 5-second countdown timer
* Real-time score tracking
* Persistent high score (stored in localStorage)
* Start and 🔄 Reset controls
* Clean, responsive UI
* No external libraries

## How It Works

The game state is managed in game.js.
The timer runs using setInterval.
The score increments on each button click.

The high score is stored using localStorage to persist across sessions.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- No frameworks. No dependencies.

## How to Run

Clone the repository:

git clone https://github.com/pkjayapal/Click-a-thon.git

Open index.html in your browser.

That’s it — no build step required.

### Alternate option (if you don't want to use git commands or tools)
You can click on the code dropdown button and download the entire zip file (3 project files + readme.md + license) and extract it to a folder and open the index.html

## Known Issue (Intentional for Demo)

Clicking Reset currently clears the high score.
This behavior is intentional for demonstrating AI-assisted bug fixing workflows.

## Purpose

This project is used as a demo application for showcasing:

AI-assisted code fixes

Single-agent vs multi-agent orchestration

Automated GitHub workflows

Engineering change governance concepts
