import { useNavigate } from "@tanstack/react-router"
import { logout } from "../../features/auth/api/auth.api"

function LogoutButton() {
  const navigate = useNavigate()

  function handleLogout() {
    logout()

    navigate({
      to: "/login",
    })
  }

  return (
    <button
      className="logout-button"
      onClick={handleLogout}
    >
      <span>↪</span>
      Logout
    </button>
  )
}

export default LogoutButton