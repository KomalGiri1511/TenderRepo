import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminPortalHeader } from '../admin/AdminPortalHeader';
import { AdminFloatingNav } from '../admin/AdminFloatingNav';

export const AdminPortalLayout = () => {
  return (
    <div className="min-h-screen relative">
      <AdminPortalHeader />
      <Outlet />
      <AdminFloatingNav />
    </div>
  );
};

export default AdminPortalLayout;

