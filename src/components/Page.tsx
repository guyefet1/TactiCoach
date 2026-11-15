import type { ReactNode } from 'react'

interface PageProps {
  title: string
  description?: string
  children: ReactNode
}

function Page({ title, description, children }: PageProps) {
  return (
    <section className="page">
      <header className="page-heading">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </header>
      {children}
    </section>
  )
}

export default Page
