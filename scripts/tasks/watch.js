import debounce from "../utils/debounce.js";
import build from "./build.js";

console.info('\n🔍 Watching for changes...');

const POSTS_DIR = './posts';
const DEBOUNCE_TIMEOUT = 500;

const watcher = Deno.watchFs(POSTS_DIR);
const debouncedHanlder = debounce((event) => {
  console.info('\n⚾️ Caught event:\n\n', event);
  
  build();
}, DEBOUNCE_TIMEOUT);

for await (const event of watcher) {
  debouncedHanlder(event);
}