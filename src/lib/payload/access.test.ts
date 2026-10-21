import type { Access } from 'payload';
import { describe, expect, it } from 'vitest';

import { adminOrSelf } from './access';

type AccessArgs = Parameters<Access>[0];

const call = (user: unknown, id?: number) => adminOrSelf({ req: { user }, id } as unknown as AccessArgs);

describe('adminOrSelf (Users.update)', () => {
  it('anonyme Massenänderung ohne id ändert nichts', () => {
    expect(call(undefined)).toBe(false);
    expect(call(null)).toBe(false);
  });

  it('anonym mit id ändert nichts', () => {
    expect(call(undefined, 1)).toBe(false);
  });

  it('Admin darf alle Konten ändern', () => {
    expect(call({ id: 1, role: 'admin' })).toBe(true);
  });

  it('Redaktion bekommt nur das eigene Konto, auch bei der Massenänderung', () => {
    expect(call({ id: 7, role: 'editor' })).toEqual({ id: { equals: 7 } });
    expect(call({ id: 7, role: 'editor' }, 1)).toEqual({ id: { equals: 7 } });
  });
});
