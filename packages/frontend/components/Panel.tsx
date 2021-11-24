import React, { FC, ReactElement } from 'react'
import clsx from 'clsx'

const Panel: FC<{ className?: string; title?: string | ReactElement }> = ({
  className,
  title,
  children,
}) => {
  const hasTitle = typeof title !== 'undefined'
  return (
    <section
      className={clsx(
        'bg-white p-4 shadow-sm rounded-sm',
        hasTitle && 'pt-2',
        className,
      )}
    >
      {/* Title */}
      {hasTitle && <div className="mb-2">{title}</div>}

      {/* Content */}
      {children}
    </section>
  )
}

export default Panel
