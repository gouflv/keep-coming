import { FC } from 'react'
import clsx from 'clsx'

export type ButtonType = 'normal' | 'primary'

export type ButtonSize = 'sm' | 'base' | 'lg'

export type ButtonProps = {
  type?: ButtonType
  size?: ButtonSize
  round?: boolean
  className?: string
}

const Button: FC<ButtonProps> = ({
  type = 'normal',
  size = 'base',
  round,
  className,
  children,
}) => {
  const commonClasses = ['text-center rounded']

  const typeClasses: Record<ButtonType, string[]> = {
    normal: ['bg-gray-100 hover:bg-gray-200'],
    primary: ['bg-blue-500 text-white'],
  }

  const sizeClasses: Record<ButtonSize, string[]> = {
    sm: ['px-2 py-1 text-sm'],
    base: ['px-4 py-2 text-base'],
    lg: ['px-6 py-3 text-lg'],
  }

  const cls = clsx(
    ...commonClasses,
    ...typeClasses[type],
    ...sizeClasses[size],
    round && 'rounded-full',
    className,
  )

  return <div className={cls}>{children}</div>
}

export default Button
