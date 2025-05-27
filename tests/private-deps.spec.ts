import { test, expect } from '@playwright/test';
import { greet } from '@amalulla/my-utils';

test('uses a private dependency @critical', async () => {
    const myUtils = require('@amalulla/my-utils');

    console.log(myUtils.capitalizeWords('hello maria'));
});