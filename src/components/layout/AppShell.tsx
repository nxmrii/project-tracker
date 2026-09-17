import type { ReactNode } from "react"

import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

type Props = {
  children: ReactNode
}

function AppShell({
  children,
}: Props) {

  return (
    <div className="app-shell">

      <Sidebar />

      <div className="main-area">

        <Topbar />

        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  )
}

export default AppShell