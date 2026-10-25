import { describe, test, expect } from 'bun:test';
import { permissionFor } from './trackingConsent';
import { ADS_ID } from './marketingTracking';
describe('Advertising permission', () => {
  test('UK visitors have no measurement before acceptance', () => expect(permissionFor(null, 'GB')).toBe(false));
  test('unknown locations are blocked', () => expect(permissionFor(null, 'unknown')).toBe(false));
  test('acceptance permits UK measurement', () => expect(permissionFor('accepted', 'GB')).toBe(true));
  test('rejection overrides an unregulated location', () => expect(permissionFor('rejected', 'US')).toBe(false));
  test('ordinary measurement remains enabled elsewhere without a choice', () => expect(permissionFor(null, 'US')).toBe(true));
  test('destination matches the verified account tracking ID', () => expect(ADS_ID).toBe('AW-17942512211'));
});