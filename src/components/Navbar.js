import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'
import { useFilterSearch, useSearch } from '../SearchContextProvider';
const Navbar = (props) => {
    const [ search, setSearch ] = useSearch();
    const [ filterText, setFiltertext ] = useFilterSearch();

    const applySearch = ({ target: { value }}) => {
      setFiltertext(value);
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
                <a className="nav-link dropdown-toggle"  href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bi bi-gear-wide-connected"></i>
                </a>
                <div className="dropdown-menu" style={{right: "0", left: "auto", marginTop:".7rem"}} aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/#"><i className="bi bi-person"></i> Profile</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/#"><i className="bi bi-star-fill"></i>  Favourites</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/#"><i className="bi bi-calendar-check"></i> Appointments</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/#"><i className="bi bi-box-arrow-left"></i> Logout</a>
                </div>
              </li>
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;