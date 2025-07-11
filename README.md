# TicTacToe Game

## References

1. [Artificial Intelligence Illuminated](https://books.google.com/books/about/Artificial_Intelligence_Illuminated.html?id=LcOLqodW28EC)
1. [Artificial Intelligence: A Modern Approach](https://aima.cs.berkeley.edu/)
1. https://en.wikipedia.org/wiki/Left-child_right-sibling_binary_tree
1. https://en.wikipedia.org/wiki/Minimax
1. https://www.math.umd.edu/~immortal/CMSC351/notes/minimax.pdf

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
   1. In your terminal
      ```bash
      deno task dev
      ```
   1. Download a static binary from the [latest release](https://github.com/amsross/tic-tac-toe/releases/latest)
   1. In a Docker container
      ```bash
      docker run --rm -it --name tic-tac-toe \
        -v $PWD:/tic-tac-toe denoland/deno:2.3.3 \
        run --allow-env /tic-tac-toe/src/main.ts
      ```
1. Commands
   - `reset` - Clear the current game state
   - `reset #` - Clear the current game state and set the difficulty level (1-10)
   - `exit` - Exit the game
1. Each time you win, the difficulty level increases by 1, up to a maximum of 10.
