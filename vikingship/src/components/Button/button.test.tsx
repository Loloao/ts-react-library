import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

describe('test button component', () => {
  it('should render correct button', () => {
    const wrapper = render(<Button>Nice</Button>)
    const elem = wrapper.getByText('Nice')
    expect(elem).toBeInTheDocument()
    expect(elem.tagName).toEqual('BUTTON')
    expect(elem).toHaveClass('btn btn-default')
  })
  it('should render correct component based on different props', () => {})
  it('should render links when btnType equals link and href is provided', () => {})
  it('should render disabled button when disabled set to true', () => {})
})
