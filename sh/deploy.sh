pushd /home/projects/gofield-frontend
deno run --allow-write --allow-read ./deno/dispose-next-folder.ts
git pull origin main
pm2 reload "gofield-frontend"
popd