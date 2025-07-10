#! sh
docker run --rm --name tic-tac-toe -it -v $PWD:/tic-tac-toe denoland/deno:2.3.3 run --allow-env /tic-tac-toe/src/main.ts
