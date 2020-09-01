import React from 'react'
import classnames from 'classnames'

// export enum ButtonSize {
//   Large = 'lg',
//   Small = 'sm',
// }
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link',
// }

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
}

// 我们需要将 button 和 a 标签的原生属性和 button 组件的特殊属性结合
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// Partial 表示将所有属性设为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, size, disabled, children, href, className, ...restProps } = props
  const classNames = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  })
  if (btnType === 'link') {
    return (
      <a className={classNames} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classNames} disabled={disabled}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button
