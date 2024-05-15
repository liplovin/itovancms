import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import AddPost from '../pages/add-post';
import AddUser from '../pages/add-user';
import ManagePost from '../pages/manage-post';
import ManageUser from '../pages/manage-user';
import EditPost from '../pages/edit-post';
import EditUser from '../pages/edit-user';
import ProtectedRoute from './ProtectedRoute';

const AdminRoutes = () => {
    return (
        <Switch>
            <ProtectedRoute path="/admin/dashboard" component={AdminDashboard} />
            <ProtectedRoute path="/admin/addpost" component={AddPost} />
            <ProtectedRoute path="/admin/adduser" component={AddUser} />
            <ProtectedRoute path="/admin/manage-post" component={ManagePost} />
            <ProtectedRoute path="/admin/manage-user" component={ManageUser} />
            <ProtectedRoute path="/admin/edit-post/:id" component={EditPost} />
            <ProtectedRoute path="/admin/edit-user/:id" component={EditUser} />

        </Switch>
    );
};

export default AdminRoutes;
