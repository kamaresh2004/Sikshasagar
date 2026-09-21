import { seed } from './main.js';

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('[seed] failed:', err);
    process.exit(1);
  });
