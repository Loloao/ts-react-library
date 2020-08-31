import React, { useContext } from 'react'
import classnames from 'classnames'
import Menu, { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext)
  const classNames = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  })

  const handleClick = (): void => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }

  return (
    <li className={classNames} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem
