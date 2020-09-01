import React, { ReactElement } from 'react'
import Button, { ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
// 引入 icon svg 字体
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// 此处是引入所有图标，也可单个图标引入
library.add(fas)

function App(): ReactElement {
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
    </div>
  )
}

export default App
