import { Link } from 'react-router-dom'
import logo from '../images/logo.svg'
import styled from 'styled-components';
import Button from './Button';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import placeholderDp from '../images/placeholderDp.png';

export default function NavBar(props) {
  var tokenExists = localStorage.getItem("authToken") !== null;
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(tokenExists);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const currentUser = props.updateUser ? props.updateUser : JSON.parse(localStorage.getItem('currentUser'));

  const userLogout = () => {
    localStorage.clear();
    setIsUserAuthenticated(false);
  }

  const searchIcon = {
    left: '20px', pointerEvents: 'none', color: 'var(--base-50)', top: '50%', transform: 'translateY(-50%)', position: 'absolute'
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <RoundIconButton>
        <img style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: 'var(--br-round)' }} src={currentUser.profileImage ? currentUser.profileImage : placeholderDp} alt="" />
      </RoundIconButton>
    </a>
  ));



  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

      const iconStyle = {
        transform: 'translateY(2px)',
        marginRight: '12px'
      }

      const profileUrl = "/user/" + currentUser.username;

      return (
        <DropdownMenu
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled m-0" style={{ display: 'grid', gap: '4px' }}>
            <div style={{ paddingBottom: '4px', borderBottom: '1px solid var(--base-20)' }}>
              <Link to={profileUrl}>
                <MenuItem>
                  <h4>{currentUser.name}</h4>
                  <span style={{ color: 'var(--base-50)', fontWeight: '400', fontSize: 'var(--fs-b3)' }}>@{currentUser.username}</span>
                </MenuItem>
              </Link>
            </div>
            <MenuItem>
              <i className='bx bx-sm bx-fw bx-wallet-alt' style={iconStyle}></i>
              My Wallet
            </MenuItem>
            <MenuItem>
              <i className='bx bx-sm bx-fw bx-heart' style={iconStyle}></i>
              My Likes
            </MenuItem>
            <MenuItem>
              <i className='bx bx-sm bx-fw bx-cog' style={iconStyle}></i>
              Settings
            </MenuItem>

            <div style={{ paddingTop: '4px', borderTop: '1px solid var(--base-20)' }}>
              <MenuItem>
                <i className='bx bx-sm bx-fw bx-support' style={iconStyle}></i>
                Support
              </MenuItem>
            </div>
            <Link to="/" onClick={userLogout}>
              <MenuItem>
                <i className='bx bx-sm bx-fw bx-log-out' style={iconStyle}></i>
                Sign out
              </MenuItem>
            </Link>
          </ul>
        </DropdownMenu>
      );
    },
  );

  const MobileNav = () => (
    <MobileMenu>
      <MobileMenuInner>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: '8px', width: '100%' }}>
            <img src={logo} alt="logo" style={{ height: '41px' }} />

            <div style={{ display: 'flex' }}>
              <MobileRoundIconButton style={{ marginRight: '8px' }}>
                <box-icon name='search' size="md" color="var(--base-50)"></box-icon>
              </MobileRoundIconButton>
              <MobileRoundIconButton onClick={() => { setShowMobileNav(false) }}>
                <box-icon name='x' size="md" color="var(--base-50)"></box-icon>
              </MobileRoundIconButton>
            </div>
          </div>

          <MobileNavLink href="/explore" style={{ marginTop: '24px' }}>Home</MobileNavLink>
          <MobileNavLink href="/explore">Explore</MobileNavLink>
          <MobileNavLink href="/about">About</MobileNavLink>
          <MobileNavLink href="/explore">Contact</MobileNavLink>

          <MobileNavLink href="/login" style={{ marginTop: '24px' }}>Log in</MobileNavLink>
          <MobileNavLink href="/signup">Sign up</MobileNavLink>

        </div>
      </MobileMenuInner>
    </MobileMenu>
  );

  return (
    <Navbar>
      {showMobileNav ? <MobileNav /> : null}

      <NavbarInner>
        <Link to='/' style={{ marginRight: '16px' }}><img src={logo} alt="logo" /></Link>
        <NavLink href="/explore">Explore</NavLink>
        <NavLink href="/about">About</NavLink>
        <SearchBarWrap>
          <div style={{ position: 'relative', zIndex: '99' }}>
            <box-icon name='search' style={searchIcon}></box-icon>
            <input placeholder="Search Shilly..." style={{ borderRadius: 'var(--br-round)', paddingLeft: '48px' }}></input>
          </div>
          <div style={{ position: 'relative' }}></div>
        </SearchBarWrap>


        {window.innerWidth > 800 && !isUserAuthenticated ? <a href="/login"><Button variant='secondary' style={{ height: '48px' }}>Log in</Button></a> : null}
        {window.innerWidth > 800 && !isUserAuthenticated ? <a href="/signup"><Button variant='primary' style={{ height: '48px', marginLeft: '8px' }}>Sign up</Button></a> : null}

        {isUserAuthenticated &&
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
            </Dropdown.Menu>
          </Dropdown>
        }

        {window.innerWidth < 800 ?
          <div style={{ display: 'flex' }}>
            <MobileRoundIconButton style={{ marginRight: '8px' }}>
              <box-icon name='search' size="md" color="var(--base-50)"></box-icon>
            </MobileRoundIconButton>
            <MobileRoundIconButton onClick={() => { setShowMobileNav(true) }}>
              <box-icon name='menu' size="md" color="var(--base-50)"></box-icon>
            </MobileRoundIconButton>
          </div> : null
        }

      </NavbarInner>
    </Navbar>
  );
}

const Navbar = styled.nav`
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding: 8px 24px;

  @media (min-width: 640px) {
    padding-top: 16px;
  }
`;

const NavbarInner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const SearchBarWrap = styled.div`
  flex: 1 1 0%;
  justify-content: center;
  position: relative;
  display: none;

  @media (min-width: 800px) {
    display: block;
    padding: 0 20px;
  }
`;

const NavLink = styled.a`
  display: none;

  @media (min-width: 800px) {
    display: block;
    padding: 14px 12px;
    font-size: var(--fs-b2);
  }
`;

const MobileNavLink = styled.a`
  font-size: 28px;
  padding-top: 8px;
  font-weight: bold;
  display: block;

  @media (min-width: 800px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
`;

const MobileMenuInner = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: var(--base-10);
  padding: 0 24px;
`;

const MobileRoundIconButton = styled.div`
  padding: 10px 10px 4px;
  border-radius: var(--br-round);
  box-shadow: var(--shadow); 
  background-color: white;
  transition: 200ms ease-out;
  cursor: pointer;
  display: block;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  @media (min-width: 800px) {
    display: none;
  }
`;

const RoundIconButton = styled.div`
  padding: 10px;
  border-radius: var(--br-round);
  box-shadow: var(--shadow); 
  background-color: var(--base-10);
  transition: 200ms ease-out;
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

const DropdownMenu = styled.div`
  border-radius: var(--br-md);
  padding: 4px;
  width: 240px;
  border: none;
  transform: translate(-180px, 70px)!important;
  box-shadow: var(--shadow-md);

  @media (max-width: 800px) {
    margin: 0px;
    min-width: calc(100vw - 48px);
    box-shadow: var(--shadow-md);
    position: absolute;
    transform: translate(-40vw, 70px)!important;
    right: 0px;
    z-index: 9999;
}
`;

const MenuItem = styled.li`
  border-radius: var(--br-md);
  padding: 12px 8px;
  font-weight: bold;
  color: var(--base);
  background-color: var(--base-10);
  transition: 200ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: var(--accent-pink-a10);
    color: var(--accent-pink);
  }
`;