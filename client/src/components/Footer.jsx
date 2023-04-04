import React from 'react'
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <p>
         copy right &copy;
        <span>{new Date().getFullYear()}</span>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
text-align: center;
padding: 4rem 0;
background: var(--primary-700);
p {
  color: var(--white);
  margin: 0 auto;
}
`;

export default Footer