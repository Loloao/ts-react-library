import React, { ReactElement } from 'react'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'

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
      <Button size={ButtonSize.Large} btnType={ButtonType.Link}>
        hello
      </Button>
      <Button size={ButtonSize.Small} btnType={ButtonType.Default}>
        hello
      </Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Primary}>
        hello
      </Button>
    </div>
  )
}

export default App
