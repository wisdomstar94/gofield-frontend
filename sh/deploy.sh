pushd /home/projects/gofield-frontend
~/.deno/bin/deno run --allow-write --allow-read ./deno/dispose-next-folder.ts
git pull origin main
npm i
pm2 reload "gofield-frontend"
popd