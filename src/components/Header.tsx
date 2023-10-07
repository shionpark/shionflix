import React from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

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
    <>
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
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('keyword', { required: '필수 항목입니다.' })}
          type="text"
          placeholder="search"
        />
        <button>Click</button>
      </form>
      <span>{errors?.keyword?.message}</span>
    </>
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
