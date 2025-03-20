import React, { FC } from 'react';
import './Layout.scss';
import NavBar from '../NavBar/NavBar';
import { Outlet } from "react-router-dom";


interface LayoutProps {}

const Layout: FC<LayoutProps> = () => (
  <div>
  <NavBar />
  <main>
    <Outlet /> {/* כאן נטענים כל הדפים האחרים */}
  </main>
</div>
);

export default Layout;
