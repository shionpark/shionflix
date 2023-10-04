import React from 'react';
import { Link, useMatch } from 'react-router-dom';

function Header() {
  const homeMatch = useMatch('/');
  const comingMatch = useMatch('/coming-soon');
  const nowMatch = useMatch('/now-playing');
  return (
    <ul>
      <li>
        <Link to="/">popular {homeMatch && <Circle />}</Link>
      </li>
      <li>
        <Link to="/coming-soon">coming soon {comingMatch && <Circle />}</Link>
      </li>
      <li>
        <Link to="/now-playing">now playing {nowMatch && <Circle />}</Link>
      </li>
    </ul>
  );
}

const Circle = () => {
  return (
    <span
      style={{
        width: '5px',
        height: '5px',
        borderRadius: '5px',
        backgroundColor: 'red',
      }}
    >
      ⬅️
    </span>
  );
};

export default Header;
