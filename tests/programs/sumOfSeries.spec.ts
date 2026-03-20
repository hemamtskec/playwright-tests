import { test, expect } from '@playwright/test';

test('sum of series', async () => {
  let n = 6;
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  console.log("Sum of series for ",n," is " , sum);

  expect(sum).toBe(21);
});