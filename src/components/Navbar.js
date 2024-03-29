import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContextProvider';
import '../css/Navbar.css'
import { useFilterSearch, useSearch } from '../context/SearchContextProvider';
import { httpGet } from '../utils/api';

const Navbar = (props) => {
    const [ search, setSearch ] = useSearch();
    const [ filterText, setFiltertext ] = useFilterSearch();
    const [authConfig, setAuthConfig] = useAuthContext();
    const navigate = useNavigate();
    const isSignedIn = authConfig !== null;

    const applySearch = ({ target: { value }}) => {
      setFiltertext(value);
    }

    const handleLogout = async (e) => {
      e.preventDefault();
      try {
        await httpGet('/authapi/logout');
        setAuthConfig(null);
        navigate('/login');
      } catch (err) {
        console.log("Error occurred while logging out ", err);
      }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/" >
          <div className="row navbar__title">
            <img className="navbar__img" src="/logo.1.svg" alt="Logo" />
            <p className="navbar__p">Build Your Future</p>
          </div>
          </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav" >
          {
            search? 
            <form className="form-inline my-2 my-lg-0 search__form ms-auto">
                      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={filterText} onChange={applySearch}/>
                      <button className="navbar__btn btn btn-secondary"  type="submit"><i className="bi bi-search"></i></button>
            </form>
            : <p className="ms-auto"></p>
          }
         
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle d-flex align-items-center" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bi bi-gear-wide-connected"></i>
                </span>
                <div className="dropdown-menu" style={{right: "0", left: "auto", marginTop:".7rem"}} aria-labelledby="navbarDropdown">
                  {
                    isSignedIn
                    ?(<>
                        <Link className="dropdown-item" to="/profile"><i className="bi bi-person"></i> Profile</Link>
                        {!authConfig?.isTutor && <div className="dropdown-divider"></div>}
                        {!authConfig?.isTutor && <Link className="dropdown-item" to="/favourite"><i className="bi bi-star-fill"></i> Favourites</Link>}
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/appointments"><i className="bi bi-calendar-check"></i> Appointments</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/login" onClick={handleLogout}><i className="bi bi-box-arrow-left"></i> Logout</Link>
                      </>)
                    :(<>
                        <Link className="dropdown-item" to="/login"><i className="bi bi-box-arrow-in-right"></i> SignIn</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/signup"><i className="bi bi-person-lines-fill"></i> SignUp</Link>
                      </>)
                  }
                  
                </div>
              </li>
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;