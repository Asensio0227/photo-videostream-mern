import React from 'react'
import styled from "styled-components";
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <Wrapper>
      <Outlet/>
    </Wrapper>
  )
}

const Wrapper = styled.main``;

export default SharedLayout