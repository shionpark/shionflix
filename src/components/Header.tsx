import React, { useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion, Variants, useAnimation } from 'framer-motion';
interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch('/');
  const comingMatch = useMatch('/coming-soon');
  const nowMatch = useMatch('/now-playing');
  const inputAnimation = useAnimation();

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

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
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: 'linear' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register('keyword', { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: 'linear' }}
            placeholder="Search title"
          />
        </Search>
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

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 0.8px solid whitesmoke;
`;

export default Header;
