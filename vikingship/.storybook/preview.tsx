import React from 'react'
import '../src/styles/index.scss'
import { addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

export const parameters = {
  inline: true,
  header: false,
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
}

// 添加样式
const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}
const wrapperStory = (Story) => (
  <div style={wrapperStyle}>
    <h3></h3>
    <Story />
  </div>
)

// withInfo 为组件
addDecorator(withInfo)
addDecorator(wrapperStory)
