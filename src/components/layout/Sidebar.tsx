import { Link } from "@tanstack/react-router"
import LogoutButton from "./LogoutButton"

function Sidebar() {
  return (
    <aside className="sidebar">

      <div>
        <div className="sidebar-logo">
          <div className="logo-icon">
            P
          </div>

          <div>
            <h2>Project Tracker</h2>
            <span>Team Workspace</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/projects"
            className="nav-link"
          >
            <span>▦</span>
            Projects
          </Link>

        </nav>
      </div>

      <LogoutButton />

    </aside>
  )
}

export default Sidebar