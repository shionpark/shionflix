import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useScroll, useMotionValueEvent } from 'framer-motion';
import { UserMenu, SearchForm } from '.';

function Header() {
  const navAnimation = useAnimation();
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (y) => {
    if (y < 0.1) {
      navAnimation.start('top');
    } else {
      navAnimation.start('scroll');
    }
  });

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={'top'}>
      <Col>
        <UserMenu />
      </Col>
      <Col>
        <SearchForm />
      </Col>
    </Nav>
  );
}

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const navVariants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
};

const Col = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
