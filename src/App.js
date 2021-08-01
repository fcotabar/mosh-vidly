import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { NavBar } from './components/NavBar';

import Movies from './components/Movies';
import { Customers } from './components/Customers';
import { Rentals } from './components/Rentals';
import { NotFound } from './components/NotFound';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Logout from './components/Logout';
import { ProtectedRoute } from './common/ProtectedRoute';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container mt-5">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

// function App() {
//   const state = {};

//   return (
//     <>
//       <ToastContainer />
//       <NavBar />
//       <main className="container mt-5">
//         <Switch>
//           <Route path="/register" component={RegisterForm} />
//           <Route path="/login" component={LoginForm} />
//           <Route path="/movies/:id" component={MovieForm} />
//           <Route path="/movies" component={Movies} />
//           <Route path="/customers" component={Customers} />
//           <Route path="/rentals" component={Rentals} />
//           <Route path="/not-found" component={NotFound} />
//           <Redirect exact from="/" to="/movies" />
//           <Redirect to="/not-found" />
//         </Switch>
//       </main>
//     </>
//   );
// }

export default App;
