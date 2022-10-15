import { move } from "https://deno.land/std@0.159.0/fs/move.ts";
import * as path from "https://deno.land/std@0.159.0/path/mod.ts";
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

// .next.old 폴더 삭제
try {
  await Deno.remove(path.join(__dirname, '..', '.next.old'), { recursive: true });
} catch (e) {

}

// .next 폴더 이름을 .next.old 으로 변경
try {
  await move(path.join(__dirname, '..', '.next/'), path.join(__dirname, '..', '.next.old/'));
} catch (e) {

}

// .next.new/.next 폴더를 .next 으로 이동
try {
  await move(path.join(__dirname, '..', '.next.new', '.next/'), path.join(__dirname, '..', '.next/'));
} catch (e) {

}

// .next.new 폴더 삭제
try {
  await Deno.remove(path.join(__dirname, '..', '.next.new'), { recursive: true });
} catch (e) {
  
}
// deno run --allow-write --allow-read ${path}