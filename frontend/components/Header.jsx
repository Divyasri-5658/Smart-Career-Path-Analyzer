import React, { useContext } from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
//import { UserAuthorContextObj } from '../../src/context/UserAuthorContext'

function Header() {
  const { signOut } = useClerk()
  const { isSignedIn, user } = useUser()
 // const { currentUser, setCurrentUser } = useContext(UserAuthorContextObj)
  const navigate = useNavigate()

  async function handleSignout() {
    await signOut()
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <nav className="header d-flex justify-content-between align-items-center">
      {/* Logo Section */}
      <div className="logo">
        <Link to="/">
          <img
            src="https://www.freeiconspng.com/uploads/edit-png-icon-blue-pencil-18.png"
            alt="logo"
            style={{ width: "65px" }}
          />
        </Link>
      </div>

      {/* Nav Links */}
      <ul className="d-flex justify-content-around list-unstyled ele mb-0">
        {!isSignedIn ? (
          <>
            <li>
              <Link to="/" className="link me-4">
                Home
              </Link>
              <Link to="Signin" className="link me-4">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="Signup" className="link me-4">
                Signup
              </Link>
            </li>
          </>
        ) : (
          <div className="user-button d-flex align-items-center gap-3">
            {/* Profile Section (image + name + role stacked vertically) */}
          

            {/* Signout Button */}
            <button className="btn btn-danger btn-sm" onClick={handleSignout}>
              Signout
            </button>
          </div>
        )}
      </ul>
    </nav>
  )
}

export default Header
