// library
import React, { useRef, useEffect } from "react";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// logo 
import logo from "../../assets/images/logo.png";

// css
import "../../assets/css/header.css";

// redux
import { toggleUI } from "../../redux/reducers/cardUIReducer";
// import { getProfileApi } from '../../redux/reducers/userReducer'

const Header = () => {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.products);
  // const { user } = useSelector(state => state.user)

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  // show menu in mobile device
  const handleToggleMenu = () => menuRef.current.classList.toggle("show__menu");

  // Invoice handling function open cart 
  const handleToggleCart = () => {
    dispatch(toggleUI());
  };

  const handleNavigateProfile = () => {
    // dispatch(getProfileApi())
  }
  const nav__links = [
    {
      display: "Home",
      path: "/home",
    },
    {
      display: "All-Shoes",
      path: "/search",
    },
    {
      display: "Cart",
      path: "/cart",
    },
  
  ];

  useEffect(() => {
    // scrollbar handler function
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="logo" />
              <h5>Shoes Store</h5>
            </div>

            {/* ============= menu ============= */}
            <div
              className="navigation"
              ref={menuRef}
              onClick={handleToggleMenu}
            >
              <div className="menu d-flex align-items-center gap-5">
                {nav__links.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive ? "active__menu" : ""
                    }
                  >
                    {link.display}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* ========== nav right icon ===========  */}
            <div className="nav__right d-flex align-items-center gap-4">
              <span className="cart__icon" onClick={handleToggleCart}>
                <i className="ri-shopping-basket-line"></i>
                <span className="cart__badge">{totalQuantity}</span>
              </span>
              <span className="user gap-2 d-flex align-items-center justify-content-center">
                  <Link to={"/login"}>
                    <i className="ri-user-line"></i>
                  </Link>
                  {/* {user ? <span style={{fontSize: '.8rem'}}>
                    <Link to='/profile' onClick={handleNavigateProfile} className="text-black">{user.email}</Link>
                    </span> : ''} */}
                   <span style={{fontSize: '.8rem'}}>
                    <Link to='/profile' onClick={handleNavigateProfile} className="text-black">Username</Link>
                    </span>
                </span>
              <span className="mobile__menu" onClick={handleToggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
