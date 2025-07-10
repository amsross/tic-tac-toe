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
   1. In a Docker container
      ```bash
      ./docker.sh
      ```
   1. In your terminal
      ```bash
      deno task dev
      ```
1. Commands
   - `reset` - Clear the current game state
   - `reset #` - Clear the current game state and set the difficulty level (1-10)
   - `exit` - Exit the game
1. Each time you win, the difficulty level increases by 1, up to a maximum of 10.
