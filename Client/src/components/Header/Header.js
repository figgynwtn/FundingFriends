import 'src/components/Header/Header.css';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className="navigation">
        <div className="container">
          {/* Brand logo/name */}
          <RouterLink className="navbar-brand" to="/">
            <div className="heading">
              <span>Funding Friends</span>
            </div>
          </RouterLink>

          {/* Profile Link aligned to the right */}
          <div className="navbar-right">
            <RouterLink className="nav-link" to="/Login">
              Profile
            </RouterLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
