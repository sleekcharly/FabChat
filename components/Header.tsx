import React from 'react';
import Logo from './Logo';

type Props = {};

function Header({}: Props) {
  return (
    <header>
      {/* logo */}
      <Logo />
    </header>
  );
}

export default Header;
