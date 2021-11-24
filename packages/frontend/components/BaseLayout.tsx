import React, { FC } from 'react'
import Container from './Container'

const BaseLayout: FC = ({ children }) => (
  <Container className="px-2 lg:px-4 lg:grid grid-cols-12 lg:gap-6 xl:gap-8">
    {children}
  </Container>
)

const BaseLayoutMain: FC = ({ children }) => (
  <main className="lg:col-span-9">{children}</main>
)

const BaseLayoutSide: FC = ({ children }) => (
  <div className="hidden lg:block lg:col-span-3">{children}</div>
)

export default BaseLayout

export { BaseLayoutMain, BaseLayoutSide }
