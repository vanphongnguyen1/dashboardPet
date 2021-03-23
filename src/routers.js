import React from 'react'
import Dashboard from './Components/Main/Dashboard'
import Users from './Components/Main/Users'
import CreactUser from './Components/Main/Users/CreactUser'
import EditUser from './Components/Main/Users/EditUser'

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
    path: '/customers',
    exact: true,
    main: ({ match }) => <Users match={match}/>
  },
  {
    path: '/customers/creact',
    exact: true,
    main: ({ match }) => <CreactUser match={match}/>
  },
  {
    path: '/customers/edit',
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
