import React from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
interface IForm {
  keyword: string;
}

function Header() {
  const homeMatch = useMatch('/');
  const comingMatch = useMatch('/coming-soon');
  const nowMatch = useMatch('/now-playing');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const navigate = useNavigate();

  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`, { state: { keyword: data.keyword } });
  };

  return (
    <Nav>
      <Col>
        <Logo
          variants={logoVariants}
          as={motion.span}
          initial="initial"
          animate="animate"
          transition={{ type: 'spring' }}
        >
          <Link to="/">Shionflix </Link>
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
      </Col>
      <Col>
        <form onSubmit={handleSubmit(onValid)}>
          <input {...register('keyword')} placeholder="search" />
          <button>Click</button>
        </form>
        <span>{errors?.keyword?.message}</span>
      </Col>
    </Nav>
  );
}

const Nav = styled.nav`
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

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const logoVariants: Variants = {
  initial: { scale: 0.8, opacity: 0.4 },
  animate: { scale: 1.0, opacity: 1 },
};

const Logo = styled(motion.span)`
  margin-right: 50px;
  color: red;
  font-weight: bold;
`;

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

export default Header;
