import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'

const NavBar = () => {
  const searchModal = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserDetails] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()
  useEffect(() => {
    M.Modal.init(searchModal.current)
  }, [])
  const renderList = () => {
    if (state) {
      return [
        <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{ color: "black" }}>Find a friend…</i></li>,
        <li key="2"><Link to="/profile">Me…</Link></li>,
        <li key="3"><Link to="/create">Whisper…</Link></li>,
        <li key="4"><Link to="/myfollowingpost">My whisperers…</Link></li>,
        <li key="5">
          <button className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear()
              dispatch({ type: "CLEAR" })
              history.push('/signin')
            }}
          >
            Check-Out!
            </button>
        </li>
      ]
    } else {
      return [
        <li key="6"><Link to="/signin">Check-In!</Link></li>,
        <li key="7"><Link to="/signup">Sign-Up!</Link></li>

      ]
    }
  }

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('/search-users', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
      .then(results => {
        setUserDetails(results.user)
      })
  }
  return (
    <nav class="red-text #e53935 white">
      <div className="nav-wrapper white red-text">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">Whisper</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}

        </ul>
      </div>
      <div id="modal1" class="modal" ref={searchModal} style={{ color: "black" }}>
        <div className="modal-content">
          <input
            type="text"
            placeholder="find friends…"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map(item => {
              return <Link to={item._id !== state._id ? "/profile/" + item._id : '/profile'} onClick={() => {
                M.Modal.getInstance(searchModal.current).close()
                setSearch('')
              }}><li className="collection-item">{item.email}</li></Link>
            })}

          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>Close this</button>
        </div>
      </div>
    </nav>
  )
}


export default NavBar