/// <reference types="node" />
import { describe, it as test } from 'node:test';
import { strict as assert } from 'node:assert';
import { permissionFor } from './trackingConsent';
import { ADS_ID } from './marketingTracking';
describe('Advertising permission', () => {
  test('UK visitors have no measurement before acceptance', () => assert.equal(permissionFor(null, 'GB'), false));
  test('unknown locations are blocked', () => assert.equal(permissionFor(null, 'unknown'), false));
  test('acceptance permits UK measurement', () => assert.equal(permissionFor('accepted', 'GB'), true));
  test('rejection overrides an unregulated location', () => assert.equal(permissionFor('rejected', 'US'), false));
  test('ordinary measurement remains enabled elsewhere without a choice', () => assert.equal(permissionFor(null, 'US'), true));
  test('destination matches the verified account tracking ID', () => assert.equal(ADS_ID, 'AW-17942512211'));
});