import React, { ReactElement } from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
import { wrap } from 'module'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}
const generateMenu = (props: MenuProps): ReactElement => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1}>xyz</MenuItem>
      <MenuItem index={2} disabled={true}>
        disabled
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

// 此函数是因为判断 dropdown 能否显示是使用 css 的 display 属性
// 但是又不用引入 css 文件，使用这个函数来代替 css 的显示
const createStyleFile = () => {
  const cssFile = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test menu and menuItem component', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // 将 css 效果加至元素
    wrapper.container.append(createStyleFile())
    // 通过组件上的 data-testid 获取
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('1')
  })

  it('disabled item cant handle click', () => {
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('2')
  })

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  // 此处 subMenu 的隐显使用了异步，所以需要使用 react test library 的异步模型
  // https://testing-library.com/docs/dom-testing-library/api-async
  it('should show dropdown items when hover on subMenu', async () => {
    // expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await wait(
      () => {
        expect(wrapper.queryByText('drop1')).toBeVisible()
      },
      { timeout: 500 },
    )
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await wait(
      () => {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
      },
      { timeout: 500 },
    )
  })
})
