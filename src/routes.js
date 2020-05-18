import React from 'react';
import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';

// lazy load all the views
const Home = React.lazy(() => import('./pages/Home'));

const routes = [

  // other pages
  { path: '/home', name: 'Home', component: Home, route: Route, title: 'Home' },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/home" />,
    route: Route,
    title: 'Home'
  },
  
]

export { routes };