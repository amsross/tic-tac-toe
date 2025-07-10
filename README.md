# TicTacToe Game

## Development

1. Install dependencies
   ```bash
   deno install
   ```
1. Run tests
   ```bash
   deno task test
   ```
1. Run the code
   ```bash
   deno task dev:watch
   ```

## Playing the Game

1. Start the game
   ```bash
   ./docker.sh # Start the game in a Docker container
   # deno task dev # Start the game locally
   ```
1. Commands
   - `reset` - Clear the current game state
   - `reset #` - Clear the current game state and set the difficulty level (1-10)
   - `exit` - Exit the game
1. Each time you win, the difficulty level increases by 1, up to a maximum of 10.
