import fs from 'fs';
import path from 'path';

const out = path.resolve(__dirname, '../src/api/generated/index.ts');

fs.writeFileSync(out, `export * from './types';\n`, {
  encoding: 'utf8',
});

console.log('✔ Generated index.ts');
