import React, { useContext, FunctionComponentElement, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({ index, children, title, className }) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpened)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical',
  })
  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    setOpen(!menuOpen)
  }
  let timer: NodeJS.Timeout
  const handleMouse = (e: React.MouseEvent, toggle: boolean): void => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {}
  const hoverEvents =
    context.mode === 'horizontal'
      ? {
          onMouseEnter: (e: React.MouseEvent): void => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent): void => {
            handleMouse(e, false)
          },
        }
      : {}
  const renderChildren = (): React.ReactElement => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem')
      }
    })
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul data-testid="test-subMmenu" className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
