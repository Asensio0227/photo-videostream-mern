import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Wrapper className="">
      <article className=" full-page container">
        <div className="section-title">
          <h2>about us</h2>
          <div></div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, reprehenderit laudantium facilis ipsa neque enim nesciunt officia, consequatur iure alias hic nihil ducimus. Quasi, rem iure possimus sapiente cupiditate voluptatibus velit, deserunt repellat, sequi dolore laboriosam! Pariatur excepturi delectus repellendus. Eaque molestiae odit adipisci? Molestiae asperiores laborum illo eligendi ducimus!
        </p>
        <Link to="/" className='btn btn-hero'>
          back home
        </Link>
      </article>
    </Wrapper>
  )
}

const Wrapper = styled.section`
width: 90vw;
margin: 0 auto;
max-width: 1170px;
a {
  color: var(--white);
}
`

export default About