import React from 'react'
import  logo from "../assets/not-found.svg";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper className='full-page container'>
      <article>
        <img src={logo} alt="not found" />
        <h1>Ohh! Page Not Found</h1>
        <p>We seem not to find page you're looking for </p>
        <Link to="/" >
          Back home
        </Link>
      </article>
    </Wrapper>
  )
};

const Wrapper = styled.section`
min-height: calc(100vh - 7rem);
text-align: center;
margin: 0 auto;
img {
  height: 20rem;
  object-fit: contain;
}
p {
  margin: 0 auto;
}
a {
  border-bottom: 5px solid var(--primary-500);
  padding: .375rem .75rem;
  transition: var(--transition);
  color: var(--primary-500);
  font-size: 1.3rem;
  display: inline-block;
  text-align: center;
  font-weight: 700;
  &:hover {
    color: var(--primary-200);
  }
}
`;

export default Error