import { FC } from 'react'

const Container: FC<{ className?: string }> = ({ className, children }) => (
  <div className={`container max-w-5xl mx-auto ${className}`}>{children}</div>
)

export default Container
