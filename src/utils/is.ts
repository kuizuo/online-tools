export function isJson(val: string) {
  if (typeof val === 'string') {
    try {
      var obj = JSON.parse(val)
      if (obj && typeof obj === 'object') {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}
