import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './style.css';
import Nav from './com/Navbar';
import Footer from './com/Footer';
import Home from './pages/Home';
import SinglePost from './pages/post'; // Assuming this is your SinglePost component
import Signin from './pages/signin';
import Signup from './pages/signup';
import News from './pages/news';
import Branches from './pages/branches';
import ErrorPage from './pages/ErrorPage';
import AuthProvider from './pages/AuthContext'; // Updated import statement
import ProtectedRoute from './pages/ProtectedRoute';
import Users from './pages/users';
import AdminRoutes from './pages/AdminRoutes';
import AddPost from './pages/add-post';
import ManagePostUser from './pages/manage-post-user';

const Layout = ({ children }) => (
  <>
    <Nav />
    <main>{children}</main>
    <Footer />
  </>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/news" component={News} />
            <Route path="/branches" component={Branches} />
            <Route path="/post/:id" component={SinglePost} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />


            <ProtectedRoute path="/users/dashboard" component={Users} exact />
            <ProtectedRoute path="/users/addpost" component={AddPost} />
            <ProtectedRoute path="/users/manage-post-users" component={ManagePostUser} />


            <AdminRoutes />

            <Route component={ErrorPage} />
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
