import React, { useState, createContext, ReactElement } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'vertical' | 'horizontal'
type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
  defaultIndex?: string
  mode?: MenuMode
  className?: string
  style?: React.CSSProperties
  onSelect?: SelectCallback
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultOpenSubMenus, className, mode, children, defaultIndex, style, onSelect } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode === 'horizontal',
  })
  const handleClick = (index: string): void => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus,
  }
  // 保证 Menu 组件中只渲染 MenuItem 组件
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      // 将 index 属性传入 MenuItem 组件
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        })
      } else {
        window.console.log('warrning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    // 此处的 data-testid 用于在测试中获取对应节点
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: '0',
  defaultOpenSubMenus: [],
}

export default Menu
