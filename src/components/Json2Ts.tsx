/** @jsxImportSource @emotion/react */
import * as React from 'react'
import { useState, useContext } from 'react'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

import { json2Ts } from '../utils'

import { ThemeContext } from '../contexts/theme-context'

export default function Json2Ts() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')

  const { theme } = useContext(ThemeContext)

  function transform() {
    if (!code) return
    setResult(json2Ts(code))
  }

  return (
    <div>
      <CodeMirror
        value={code}
        height='200px'
        extensions={[javascript({ jsx: true })]}
        theme={theme}
        onChange={(value, viewUpdate) => {
          setCode(value)
        }}
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 1 }} style={{ margin: '2px 0' }}>
        <Button variant='contained' onClick={transform}>
          转化
        </Button>
      </Stack>
      <CodeMirror
        value={result}
        height='200px'
        extensions={[javascript({ jsx: true })]}
        theme={theme}
        onChange={(value, viewUpdate) => {
          setResult(value)
        }}
      />
    </div>
  )
}
