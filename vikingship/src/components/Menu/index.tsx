import { FC } from 'react'
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

// 这里如果直接用 Menu.Item 的形式会报错，因为 Menu 类型上没有 Item 这个属性
export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
