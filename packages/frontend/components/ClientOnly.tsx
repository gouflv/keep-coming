import { FC, useEffect, useState } from 'react'

const ClientOnly: FC = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  })

  if (!mounted) return null

  return <>{children}</>
}

export default ClientOnly
