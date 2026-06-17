import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';
import {
  FormatTimestamp,
  GetDuration,
  GetWorldFromImageName,
  IsValidDate,
} from './helpers';

test('FormatTimestamp formats valid unix timestamps', () => {
  expect(FormatTimestamp(1700000000)).toMatch(/Nov\./);
});

test('FormatTimestamp handles invalid timestamps', () => {
  expect(FormatTimestamp('invalid')).toBe('N/A (invalid)');
});

test('GetDuration returns whole minutes by default', () => {
  expect(GetDuration(1700000000, 1700003600)).toBe(60);
});

test('GetWorldFromImageName extracts the world name', () => {
  expect(GetWorldFromImageName('DemoPlayer-1700000000-1700003600_overworld.png')).toBe('overworld');
});

test('GetWorldFromImageName falls back to the full title', () => {
  expect(GetWorldFromImageName('invalid-name')).toBe('invalid-name');
});

test('IsValidDate validates numeric timestamps', () => {
  expect(IsValidDate(1700000000)).toBe(true);
  expect(IsValidDate(-1)).toBe(false);
});
