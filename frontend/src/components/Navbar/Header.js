import React, { useEffect } from 'react';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../../actions/userActions'
import {
  listCategories,
} from '../../actions/categoryActions';

 

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

     const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;
  
  console.log(categories);

  useEffect(() => {
   dispatch(listCategories(''));
  }, [])
  

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar
        style={{ backgroundColor: '#f2f4f7' }}
        expand="lg"
        collapseOnSelect
        className="shadow-sm p-3 mb-5 bg-white rounded navbar-fixed-top"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={`${process.env.PUBLIC_URL}/logo3.png`} height="50" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="#">
                <Nav.Link className="text-dark navbar-text ">
                  <span style={{ fontSize: '250' }}>About us</span>
                </Nav.Link>
              </LinkContainer>
              {categories.slice(0, 4).map((category) => (
                <LinkContainer to="#" key={category._id}>
                  <Nav.Link className="text-dark navbar-text">
                    {category.categoryName}
                  </Nav.Link>
                </LinkContainer>
              ))}

              {/* <LinkContainer to="/cart">
                <Nav.Link className="text-dark navbar-text">Kids</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link className="text-dark ">Contact</Nav.Link>
              </LinkContainer> */}
              <LinkContainer to="#">
                <Nav.Link className="text-dark">English</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-bag-check text-dark"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-person-badge text-dark"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                    </svg>
                  }
                  id="username"
                >
                  {' '}
                  <div className="d-flex justify-content-center m-1">
                    {userInfo.name}
                  </div>
                  <hr />
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/promotions">
                    <NavDropdown.Item>Promotion list</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/subcategories">
                    <NavDropdown.Item>Sub Category</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/categorylist">
                    <NavDropdown.Item>Category</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header
