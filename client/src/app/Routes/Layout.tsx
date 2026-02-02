
import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../../widgets/navbar/ui/NavBar';

export default function Layout(): React.JSX.Element {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
