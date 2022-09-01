import ccit from '@/utils/ccit'

export function getToken() {
  return ccit.storageGet('token')
}

export function setToken(token) {
  return ccit.storageSet({ token })
}

export function setUserAccount(account) {
  return ccit.storageSet({ account })
}

export function getUserAccount(account) {
  return ccit.storageGet('account')
}

export function removeToken() {
  return ccit.storageRemove('token')
}

export function getLock() {
  return ccit.storageGet('lock')
}

export function setLock(lock) {
  return ccit.storageSet({ lock })
}
export function removeLock() {
  return ccit.storageRemove('lock')
}
