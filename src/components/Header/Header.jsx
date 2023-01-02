// library
import React, { useRef, useEffect, memo } from "react";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// image
import logo from "../../assets/images/logo.png";
import avatar1 from "../../assets/images/avatar1.jpg";
import avatar2 from "../../assets/images/avatar2.jpg";
import avatar3 from "../../assets/images/avatar3.jpg";
import avatar4 from "../../assets/images/avatar4.jpg";
import avatar5 from "../../assets/images/avatar5.jpg";

// css
import "../../assets/css/header.css";

// redux
import { toggleUI } from "../../redux/reducers/cardUIReducer";

const Header = () => {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.products);
  const { userLogin, userProfile } = useSelector((state) => state.userReducer);

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const handleToggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const handleToggleCart = () => {
    dispatch(toggleUI());
  };

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

  useEffect(() => {
    localStorage.setItem('totalQuantity', totalQuantity)
  }, [totalQuantity])

  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to={'/'}>
                <img src={logo} alt="logo" />
              </Link>
              <h5>Shoes Store</h5>
            </div>

            {/* ============= menu ============= */}
            <div
              className="navigation"
              ref={menuRef}
              onClick={handleToggleMenu}
            >
              <div className="menu d-flex align-items-center gap-5">
                {nav__links.map((link, index) => {
                  if (link.path === '/cart' && userLogin === null) {
                    return (
                      <NavLink
                        key={index}
                        to={'/login'}
                        className={(navClass) =>
                          navClass.isActive ? "active__menu" : ""
                        }
                      >
                        {link.display}
                      </NavLink>
                    )
                  }
                  return (
                    <NavLink
                      key={index}
                      to={link.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__menu" : ""
                      }
                    >
                      {link.display}
                    </NavLink>
                  )
                })}
              </div>
            </div>

            {/* ========== nav right icon ===========  */}
            <div className="nav__right d-flex align-items-center gap-4">
              <span className="cart__icon" onClick={handleToggleCart}>
                <i className="ri-shopping-basket-line"></i>
                <span className="cart__badge">{totalQuantity}</span>
              </span>
              <span className="user gap-2 d-flex align-items-center justify-content-center">
                {userLogin === null ? <Link to={"/login"}>
                  <i className="ri-user-line"></i>
                </Link> : <span style={{ cursor: 'pointer' }} className="text-white" onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}><Link to={"/home"}><i className="fa fa-sign-out-alt"></i></Link></span>}
                {userLogin ? <span style={{ fontSize: '1rem' }}>
                  <Link to='/profile' className="text-black"><h5 className="fs-6">{(userLogin?.email.substring(0, 10) + '...')}</h5></Link>
                </span> : 'Your profile'}
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

export default memo(Header);
