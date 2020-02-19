/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// import MAX_SIGNED_31_BIT_INT from './maxSigned31BitInt';

const MAX_SIGNED_31_BIT_INT = 1073741823

// type ExpirationTime = number;

const NoWork = 0
const Sync = 1
const Never = MAX_SIGNED_31_BIT_INT

const UNIT_SIZE = 10
const MAGIC_NUMBER_OFFSET = 2

// 1 unit of expiration time represents 10ms.
function msToExpirationTime(ms) {
  // Always add an offset so that we don't clash with the magic number for NoWork.
  return ((ms / UNIT_SIZE) | 0) + MAGIC_NUMBER_OFFSET
}

function expirationTimeToMs(expirationTime) {
  return (expirationTime - MAGIC_NUMBER_OFFSET) * UNIT_SIZE
}

function ceiling(num, precision) {
  return (((num / precision) | 0) + 1) * precision
}

function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
  return (
    MAGIC_NUMBER_OFFSET +
    ceiling(
      currentTime - MAGIC_NUMBER_OFFSET + expirationInMs / UNIT_SIZE,
      bucketSizeMs / UNIT_SIZE,
    )
  )
}

const LOW_PRIORITY_EXPIRATION = 5000
const LOW_PRIORITY_BATCH_SIZE = 250

function computeAsyncExpiration(currentTime) {
  return computeExpirationBucket(
    currentTime,
    LOW_PRIORITY_EXPIRATION,
    LOW_PRIORITY_BATCH_SIZE,
  )
}

// const HIGH_PRIORITY_EXPIRATION = __DEV__ ? 500 : 150;
const HIGH_PRIORITY_EXPIRATION = 500
const HIGH_PRIORITY_BATCH_SIZE = 100

function computeInteractiveExpiration(currentTime) {
  return computeExpirationBucket(
    currentTime,
    HIGH_PRIORITY_EXPIRATION,
    HIGH_PRIORITY_BATCH_SIZE,
  )
}

const TEST_NUM = 10019
console.log(computeInteractiveExpiration(TEST_NUM))
console.log(computeAsyncExpiration(TEST_NUM))
