import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import SearchBox from '../search-box';
import usePrice from '../../hooks/usePrice';
import userIcon from './Profile.svg';
import MiniBasket from '../mini-basket';

export default function Header() {
  const { basket } = useSelector(state => state.basketReducer);
  const price = usePrice({ price: parseFloat(basket.basketTotalPrice) });
  return (
    <header className='header'>
      <Navbar className='primary-navbar' collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="#home">Eteration</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="search-box-container me-auto">
              <SearchBox />
            </Nav>
            <Nav >
              <NavDropdown className="basket-dropdown" title={basket.basketItem.length === 0 ? '0.00' : <span><i className="bi bi-wallet"></i> {price}</span>}>
                <MiniBasket/>
              </NavDropdown>
              <Nav.Link href="#">
                <span> <img src={userIcon} /> </span> Kerem
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
