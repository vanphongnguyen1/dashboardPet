import React from 'react'
import Dashboard from './features/Main/Dashboard'
import Users from './features/Main/Users/Page'
import CreactUser from './features/Main/Users/Page/Creat/CreactUser'
import EditUser from './features/Main/Users/Page/Edit/EditUser'
import Orders from './features/Main/Orders/Page'
import EditOrder from './features/Main/Orders/Page/Edit'
import Comments from './features/Main/Comments/Page'
import Products from './features/Main/Products/Page'
import CreateProduct from './features/Main/Products/Page/Create'

export const routes = [
  // {
  //   path: '/',
  //   exact: true,
  //   main: ({ match }) => <Dashboard match={match}/>
  // },
  {
    path: '/dashboard',
    exact: true,
    main: ({ match }) => <Dashboard match={match}/>
  },
  {
    path: '/users',
    exact: true,
    main: ({ match }) => <Users match={match}/>
  },
  {
    path: '/users/creat',
    exact: true,
    main: ({ match }) => <CreactUser match={match}/>
  },
  {
    path: '/users/:id/edit',
    exact: true,
    main: ({ match }) => <EditUser match={match}/>
  },
  {
    path: '/orders',
    exact: true,
    main: ({ match }) => <Orders match={match}/>
  },
  {
    path: '/orders/:id/edit',
    exact: true,
    main: ({ match }) => <EditOrder match={match}/>
  },
  {
    path: '/comments',
    exact: true,
    main: ({ match }) => <Comments match={match}/>
  },
  {
    path: '/products',
    exact: true,
    main: ({ match }) => <Products match={match}/>
  },
  {
    path: '/products/creat',
    exact: true,
    main: ({ match }) => <CreateProduct match={match}/>
  },
  {
    path: '/products/:id/edit',
    exact: true,
    main: ({ match }) => <CreateProduct match={match}/>
  },
  // {
  //   path: '/comments/edit',
  //   exact: true,
  //   main: ({ match }) => <EditOrder match={match}/>
  // },
  // {
  //   path: '/:group/:url',
  //   exact: true,
  //   auth: true,
  //   main: ({match}) => <RootInfoProduct match={match}/>
  // },
]
