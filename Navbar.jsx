import { NavLink } from 'react-router-dom';

export function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <span className="navbar-brand">User Behavior App</span>
                <div className="navbar-nav">
                    <NavLink className="nav-link" to="/">User Behavior Data</NavLink>
                    <NavLink className="nav-link" to="/search">Search Through Dataset</NavLink>
                </div>
            </div>
        </nav>
    );
}