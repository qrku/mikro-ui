import { readFileSync, writeFileSync } from 'fs';

for (const file of ['dist/index.mjs', 'dist/index.js']) {
  const content = readFileSync(file, 'utf8');
  if (!content.startsWith("'use client'")) {
    writeFileSync(file, "'use client';\n" + content);
  }
}

console.log("'use client' prepended to dist/index.mjs and dist/index.js");
