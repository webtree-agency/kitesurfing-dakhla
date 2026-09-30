import * as migration_20260731_152042_initial from './20260731_152042_initial';
import * as migration_20260930_065013_payload_3_90 from './20260930_065013_payload_3_90';

export const migrations = [
  {
    up: migration_20260731_152042_initial.up,
    down: migration_20260731_152042_initial.down,
    name: '20260731_152042_initial',
  },
  {
    up: migration_20260930_065013_payload_3_90.up,
    down: migration_20260930_065013_payload_3_90.down,
    name: '20260930_065013_payload_3_90',
  },
];
