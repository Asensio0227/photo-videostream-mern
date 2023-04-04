import styled from 'styled-components';
import Links from "../data";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useRef,useState,useEffect } from 'react';

const Navbar = () => {
  const linksRef = useRef(null);
  const linksContainerRef = useRef(null);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const linkHeight = linksRef.current.getBoundingClientRect().height;

    if (showLinks) {
      linksContainerRef.current.style.height = `${linkHeight}px`;
    } else {
      linksContainerRef.current.style.height = `0px`;
    }
    
  }, [showLinks]);

  return (
    <Wrapper>
      <div className="nav-center">
        <div className="nav-header">
          <h4>
            sky<span>coding</span>
          </h4>
          <button className="nav-toggle" onClick={() =>setShowLinks(!showLinks)}>
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {
              Links.map((item,index) => {
                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
            isActive ? 'link active' : 'nlink'
          }
                  >
                      {item.text}
                  </NavLink>
                )
              })
            }
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
min-height: 5rem;
background: var(--white);
box-shadow: var(--shadow-2);
.nav-center {
  width: 90vw;
}
.nav-header{
  display: flex;
  align-items: center;
  justify-items: space-between;
}
@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: .6;
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
h4 {
  animation: 3s bounce infinite
}
span {
  color: var(--primary-500);
}
.nav-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.4rem;
  background: transparent;
  color: var(--primary-500);
  transition: var(--transition);
  border: none;
  cursor: pointer;
  &:hover {
    transform: rotate(90deg);
  }
}
.links-container {
  height: 0;
  overflow: hidden;
  transition: var(--transition);
}
.links {
    padding: 1rem;
}
.links a{
  display: block;
  padding: .5rem;
  text-transform: capitalize;
  color: var(--primary-500);
  font-size: 1.3rem;
  transition: var(--transition);
  cursor: pointer;
  &:hover {
    color: var(--primary-900);
    box-shadow: var(--shadow-2);
  }
}
.link{
  color: var(--primary-500);
}.active {
  color: var(--red-dark);
}
@media screen  and (min-width: 768px) {
  .nav-toggle {
    display: none;
  }
position:sticky;
top: 0;
left: 0;
z-index: 2;
.nav-center {
  width:90%;
  display: flex;
}
.nav-header h4 {
  padding-left: 1rem;
}
.links-container {
  height: auto !important;
}
.links {
  display:flex;
  width: 90vw;
  justify-content: center;
  transition: var(--transition);
  a:hover{
    box-shadow: none;
  }
}
}
`;

export default Navbar