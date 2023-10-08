import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

const UserMenu = () => {
  const homeMatch = useMatch('/');
  const comingMatch = useMatch('/coming-soon');
  const nowMatch = useMatch('/now-playing');
  return (
    <>
      <Logo
        variants={logoVariants}
        as={motion.span}
        initial="initial"
        animate="animate"
        transition={{ type: 'spring' }}
      >
        <Link to="/">Shionflix</Link>
      </Logo>
      <Items>
        <Item>
          <Link to="/">popular {homeMatch && <Circle layoutId="circle" />}</Link>
        </Item>
        <Item>
          <Link to="/coming-soon">coming soon {comingMatch && <Circle layoutId="circle" />}</Link>
        </Item>
        <Item>
          <Link to="/now-playing">now playing {nowMatch && <Circle layoutId="circle" />}</Link>
        </Item>
      </Items>
    </>
  );
};

const Logo = styled(motion.span)`
  margin-right: 50px;
  color: red;
  font-weight: bold;
`;

const logoVariants: Variants = {
  initial: { scale: 0.8, opacity: 0.4 },
  animate: { scale: 1.0, opacity: 1 },
};

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

export default UserMenu;
