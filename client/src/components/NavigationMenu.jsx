import React, { Component } from 'react'
import { observer, inject }  from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { 
  Navbar, 
  Nav, 
  NavDropdown, 
  Form, 
  FormControl, 
  Button 
} from 'react-bootstrap/lib'

class NavigationMenu extends Component {
  render() {
    const user = this.props.userStore.user;
    return (
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand
          href="#" 
          onClick={() => this.props.history.push('/')}
        >
          Curricoo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link
              href="#" 
              onClick={() => this.props.history.push('/')}
            >
              Home
            </Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>{ user ? 'Logout' : 'Login' }</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const ConnectedNavigationMenu = inject(
    'userStore'
  )(observer(withRouter(NavigationMenu)));
export default ConnectedNavigationMenu;