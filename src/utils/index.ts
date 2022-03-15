import { gbkEncodeURIComponent, gbkDecodeURIComponent } from './gbk'

type charsetType = 'utf-8' | 'gbk' | string | undefined

function qs2json(str: string, charset: charsetType = 'utf-8'): string {
  if (charset === 'utf-8') {
    // str = decodeURIComponent(str)
  } else {
    str = gbkDecodeURIComponent(str)
  }

  const newSearchParams = new URLSearchParams(str)
  let json: any = {}
  for (const [key, value] of newSearchParams) {
    json[key] = value
  }

  return JSON.stringify(json)
}

function json2qs(str: string, charset: charsetType = 'utf-8'): string {
  const newSearchParams = new URLSearchParams(eval(`(${str})`))

  let json: any = {}
  for (const [key, value] of newSearchParams) {
    if (charset === 'utf-8') {
      json[key] = value
    } else {
      json[gbkEncodeURIComponent(key)] = gbkEncodeURIComponent(value)
    }
  }

  return Object.keys(json)
    .map((key) => {
      return key + '=' + json[key]
    })
    .join('&')
}

function cookie2json(cookie: any): string {
  const json = cookie.split('; ').reduce((a: { [x: string]: any }, val: string) => ((a[val.slice(0, val.indexOf('=')).trim()] = val.slice(val.indexOf('=') + 1).trim()), a), {})
  return JSON.stringify(json)
}

function json2cookie(json: any) {
  return Object.keys(json)
    .map((key) => {
      return key + '=' + json[key]
    })
    .join('; ')
}

function urlencode(str: string, charset: charsetType = 'utf-8'): string {
  if (charset === 'utf-8') {
    return encodeURIComponent(str)
  } else {
    return gbkEncodeURIComponent(str)
  }
}

function urldecode(str: string, charset: charsetType = 'utf-8'): string {
  if (charset === 'utf-8') {
    return decodeURIComponent(str)
  } else {
    return gbkDecodeURIComponent(str)
  }
}

export { qs2json, json2qs, cookie2json, json2cookie, urlencode, urldecode }
