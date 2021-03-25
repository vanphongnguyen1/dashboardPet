import React from 'react'
import Dashboard from './features/Main/Dashboard'
import Users from './features/Main/Users/Page'
import CreactUser from './features/Main/Users/Page/Creat/CreactUser'
import EditUser from './features/Main/Users/Page/Edit/EditUser'

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
    path: '/users/edit',
    exact: true,
    main: ({ match }) => <EditUser match={match}/>
  },
  // {
  //   path: '/:group/:url',
  //   exact: true,
  //   auth: true,
  //   main: ({match}) => <RootInfoProduct match={match}/>
  // },
]
