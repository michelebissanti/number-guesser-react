import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { LogoutButton } from './AuthComponents';
import { Trophy, Home, Gamepad2 } from 'lucide-react';
import './NavHeader.css';

function NavHeader(props) {
    const location = useLocation();

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="navbar-custom">
            <Container fluid>
                {/* Brand Section */}
                <Navbar.Brand as={Link} to="/" className="brand-section">
                    <div className="d-flex align-items-center gap-2">
                        <Gamepad2 size={24} className="brand-icon text-white" />
                        <span className="brand-text">Number Guesser</span>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Main Navigation */}
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            active={location.pathname === '/'}
                            className="nav-item-custom"
                        >
                            <Home size={18} className="me-2" />
                            <span>Home</span>
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/goals"
                            active={location.pathname === '/goals'}
                            className="nav-item-custom"
                        >
                            <Trophy size={18} className="me-2" />
                            <span>Obiettivi</span>
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/play"
                            active={location.pathname === '/play'}
                            className="nav-item-custom"
                        >
                            <Gamepad2 size={18} className="me-2" />
                            <span>Gioca</span>
                        </Nav.Link>
                    </Nav>

                    {/* Auth Section */}
                    <Nav>
                        {props.loggedIn ? (
                            <LogoutButton logout={props.handleLogout} />
                        ) : (
                            <Link to="/login" className="btn btn-outline-light login-button">
                                Login
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavHeader;