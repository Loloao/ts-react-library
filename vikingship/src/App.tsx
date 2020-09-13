import React, { ReactElement, , { useEffect, useState } } from 'react'
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Input from './components/Input/input'
import AutoComplete from './components/AutoComplete/autoComplete'
// 引入 icon svg 字体
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

// 此处是引入所有图标，也可单个图标引入
library.add(fas)

function App(): ReactElement {
  const [title, setTitle] = useState('')
  const postData = {
    title: 'my title',
    body: 'hello man'
  }
  useEffect(() => {
    axios.get('https://jsonplaceholder.com/posts/1', postData).then(resp => {
      setTitle(resp.data.title)
    })
  })
  return (
    <div className="App">
      <Menu>
        <MenuItem>cool link1</MenuItem>
        <MenuItem>cool link2</MenuItem>
        <MenuItem>cool link3</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
          <MenuItem>dropdown3</MenuItem>
        </SubMenu>
      </Menu>
      <Button size={'lg'} btnType={'link'}>
        hello
      </Button>
      <Button size={'sm'} btnType={'default'}>
        hello
      </Button>
      <Button size={'lg'} btnType={'primary'}>
        hello
      </Button>
      <Input prepend="http://" append=".com" />
      <AutoComplete />
    </div>
  )
}

export default App
