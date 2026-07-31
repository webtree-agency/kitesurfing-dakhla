import * as migration_20260731_152042_initial from './20260731_152042_initial';

export const migrations = [
  {
    up: migration_20260731_152042_initial.up,
    down: migration_20260731_152042_initial.down,
    name: '20260731_152042_initial'
  },
];
