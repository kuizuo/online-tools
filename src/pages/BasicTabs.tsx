import * as React from 'react'
import KeepAlive from 'react-activation'
import { AliveScope } from 'react-activation'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import QuerystringJson from '../components/QuerystringJson'
import CookieJson from '../components/CookieJson'
import UrlEncode from '../components/UrlEncode'
import SwitchTheme from '../components/SwitchTheme'
import useTheme from '../hooks/useTheme'
import { ThemeContext } from '../contexts/theme-context'

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}> {children}</Box>}
    </div>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)
  const { theme, toggleTheme } = useTheme()

  // const components = [QuerystringJson.name, CookieJson.name, UrlEncode.name]

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label='查询字符串与json转换' />
            <Tab label='cookie与json转化' />
            <Tab label='urlencode编码' />
            <SwitchTheme></SwitchTheme>
          </Tabs>
        </Box>
        <AliveScope>
          <TabPanel value={value} index={0}>
            <KeepAlive>
              <QuerystringJson></QuerystringJson>
            </KeepAlive>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <KeepAlive>
              <CookieJson></CookieJson>
            </KeepAlive>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <KeepAlive>
              <UrlEncode></UrlEncode>
            </KeepAlive>
          </TabPanel>
        </AliveScope>
      </ThemeContext.Provider>
    </Box>
  )
}
