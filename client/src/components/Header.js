import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <div className="header-blue">
            <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
                <div className="container">
                    <Link className="navbar-brand" to="#">Hbusiness</Link>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse"
                        id="navcol-1">
                        <ul className="nav navbar-nav">
                            <li className="dropdown"><Link className="dropdown-toggle nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false" to="#">elements </Link>
                                <div className="dropdown-menu" role="menu">
                                    <Link className="dropdown-item" role="presentation" to="student">étudiants</Link>
                                    <Link className="dropdown-item" role="presentation" to="prof">professeurs</Link>
                                    <Link className="dropdown-item" role="presentation" to="module">Modules</Link>
                                </div>
                            </li>
                        </ul>
                        {/* <form className="form-inline mr-auto" target="_self">
                            <div className="form-group">
                                <label htmlFor="search-field">
                                    <i className="fa fa-search"></i>
                                </label>
                                <input className="form-control search-field" type="search" name="search" id="search-field" />
                            </div>
                        </form> */}
                        </div>
                </div>
            </nav>
            <div className="container hero">
                <div className="row">
                    <div className="col-12 col-lg-6 col-xl-5 offset-xl-1">
                        <h1>Gestion d'Ecole.</h1>
                        <p>un système central sous forme d'une plateforme qui permet d'assurer la gestion des services de scolarité. </p>
                        <button className="btn btn-light btn-lg action-button" type="button">voir plus</button>
                    </div>
                    <div
                        className="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block phone-holder">
                        
                    </div>
                </div>
            </div>
        </div>

    )
}
