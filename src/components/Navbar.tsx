import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { userContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbars: React.FC = () => {
  const context = useContext(userContext);
  const history = useHistory();
  const [userState, setUserState] = useState({
    showUserBoard: false,
    showAdminBoard: false, 
  });

  useEffect(() => {
        if (context) {          
          if (context.user?.user_rights_id.includes("admin")) {
            setUserState({              
              showUserBoard: true,
              showAdminBoard: true,
            });
          }
          if (context.user?.user_rights_id.includes("user")) {
            setUserState({              
              showUserBoard: true,
              showAdminBoard: false,
            });
          }
        }else{
          setUserState({
            showUserBoard: false,
            showAdminBoard: false,
          });
        }    
  }, [context]);

  const HandleLogout = () => {
    setUserState({
      showUserBoard: false,
      showAdminBoard: false,
    });
    context.actions.logout();
    history.push("/");
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">IT-Awareness</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {userState.showUserBoard && (
          <Nav>
            {/* <Nav.Link as={Link} to="/fragender">Training</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/lernmethode">Training Auswahl</Nav.Link> */}
            <Nav.Link as={Link} to="/themen">Themen Auswahl</Nav.Link>
            <Nav.Link as={Link} to="/statistik">Statistik</Nav.Link>
          </Nav>
        )}
        <Nav>
          {userState.showAdminBoard && (
            <NavDropdown title="AdminTools" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/kategorien">Kategorien</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/fragen">Fragen</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/antworten">Antworten</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/benutzer">Benutzer</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
        {!context.user && (
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/registrieren">Registrieren</Nav.Link>
          </Nav>
        )}
        {context.user && (
          <Nav className="ml-auto">
            <Navbar.Text>
              <p className="m-0 p-0"> Willkommen: {context.user.nickname} &nbsp;</p>
            </Navbar.Text>
            <Button onClick={() => HandleLogout()} variant="outline-light">
              Logout
            </Button>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbars;
