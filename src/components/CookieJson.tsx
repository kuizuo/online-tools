/** @jsxImportSource @emotion/react */
import * as React from 'react'
import { useState, useContext } from 'react'

import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'

import SwapVertIcon from '@mui/icons-material/SwapVert'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DownloadIcon from '@mui/icons-material/Download'

import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@emotion/react'

import { copyTextToClipboard } from '../utils/copyToClipboard'
import { downloadByData } from '../utils/file'
import { cookie2json, json2cookie } from '../utils'
import { ThemeContext } from '../contexts/theme-context'

interface SnackbarStatus {
  open: boolean
  message?: string
  severity?: AlertColor
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function CookieJson() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')
  const [type, setType] = useState('json')
  const [snackStatus, setSnackStatus] = useState<SnackbarStatus>({
    open: false,
    message: '',
    severity: 'success',
  })
  const { theme } = useContext(ThemeContext)

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string)
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      // return
    }

    setSnackStatus({
      open: false,
    })
  }

  function transform() {
    if (!code) return

    if (type === 'json') {
      setResult(cookie2json(code))
    } else {
      setResult(json2cookie(code))
    }
  }

  function swapCode() {
    if (!code && !result) return

    setCode(result)
    setResult(code)
  }

  function copyCode() {
    if (!result) return

    if (copyTextToClipboard(result)) {
      setSnackStatus({ open: true, message: '复制成功', severity: 'success' })
    } else {
      setSnackStatus({ open: true, message: '复制失败', severity: 'error' })
    }
  }

  function downloadCode() {
    if (!result) return

    let ext = type === 'json' ? 'json' : 'txt'
    downloadByData(result, 'output.' + ext)
    setSnackStatus({ open: true, message: '下载成功', severity: 'success' })
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
        <Select
          labelId='select-option-label'
          id='select'
          value={type}
          label='类型'
          onChange={handleChangeType}
          css={css`
            .MuiSelect-select {
              padding: 5px 14px;
            }
          `}
        >
          <MenuItem value={'json'}>COOKIE转JSON</MenuItem>
          <MenuItem value={'cookie'}>JSON转COOKIE</MenuItem>
        </Select>
        <Button variant='contained' color='secondary' onClick={transform}>
          转换
        </Button>
        <Button variant='contained' startIcon={<SwapVertIcon />} onClick={swapCode}>
          交换
        </Button>
        <Button variant='contained' startIcon={<ContentCopyIcon />} onClick={copyCode}>
          复制
        </Button>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackStatus.open} autoHideDuration={2000} onClose={handleClose} key={snackStatus.message}>
          <Alert severity={snackStatus.severity} sx={{ width: '100%' }}>
            {snackStatus.message}
          </Alert>
        </Snackbar>
        <Button variant='contained' startIcon={<DownloadIcon />} onClick={downloadCode}>
          下载
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
