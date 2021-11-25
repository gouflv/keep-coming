import { ButtonHTMLAttributes, FC } from 'react'
import clsx from 'clsx'

export type ButtonType = 'normal' | 'primary'

export type ButtonSize = 'sm' | 'base' | 'lg'

export type ButtonProps = {
  type?: ButtonType
  size?: ButtonSize
  block?: boolean
  round?: boolean
  className?: string
  htmlType?: ButtonHTMLAttributes<unknown>['type']
}

const Button: FC<ButtonProps> = ({
  type = 'normal',
  size = 'base',
  block,
  round,
  className,
  htmlType = 'button',
  children,
}) => {
  const commonClasses = ['text-center rounded cursor-pointer']

  const typeClasses: Record<ButtonType, string[]> = {
    normal: ['bg-gray-100 hover:bg-gray-200'],
    primary: ['bg-blue-500 text-white hover:opacity-90'],
  }

  const sizeClasses: Record<ButtonSize, string[]> = {
    sm: ['px-2 py-1 text-sm'],
    base: ['px-3 py-1.5 text-sm'],
    lg: ['px-6 py-3 text-lg'],
  }

  const cls = clsx(
    ...commonClasses,
    ...typeClasses[type],
    ...sizeClasses[size],
    block && 'block w-full',
    round && 'rounded-full',
    className,
  )

  return (
    <button type={htmlType} className={cls}>
      {children}
    </button>
  )
}

export default Button
