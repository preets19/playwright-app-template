import { rm } from 'node:fs/promises';

const paths = ['playwright-report', 'test-results', '.tmp'];

await Promise.all(
  paths.map((path) => rm(path, { recursive: true, force: true }))
);
