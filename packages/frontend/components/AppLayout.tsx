import React, { FC } from 'react'
import Footer from './Footer'
import Header from './Header'

const AppLayout: FC = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />

    <div className="flex-grow">{children}</div>

    <Footer />
  </div>
)

export default AppLayout
