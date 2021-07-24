import React from 'react'
import Dashboard from './features/Main/Dashboard'
import Users from './features/Main/Users/Page'
import CreactUser from './features/Main/Users/Page/Creat/CreactUser'
import EditUser from './features/Main/Users/Page/Edit/EditUser'

import Orders from './features/Main/Orders/Page'
import OrderMoth from './features/Main/Orders/Page/OrderMoth/index'
import EditOrder from './features/Main/Orders/Page/Edit'

import Comments from './features/Main/Comments/Page'
import Products from './features/Main/Products/Page'
import CreateProduct from './features/Main/Products/Page/CreateEdit'

import Slider from './features/Main/Slide/Page'
import EditCreat from './features/Main/Slide/Page/EditCreat'
import Login from './features/Main/Login/Page'
import LoginIdentify from './features/Main/Login/Page/LoginIdentify'
import SecurityCode from './features/Main/Login/Page/SecurityCode'
import RestPassword from './features/Main/Login/Page/RestPassword'
import Page404 from './Components/Page404'
import { NAME_URL_LOGIN, CREAT, EDIT, TITLE_MENU } from './dataDefault'

export const routes = [
  {
    path: `/${NAME_URL_LOGIN.login}`,
    exact: true,
    main: ({ match }) => <Login match={match} />,
  },
  {
    path: `/${NAME_URL_LOGIN.login}/${NAME_URL_LOGIN.identify}`,
    main: ({ match }) => <LoginIdentify match={match} />,
  },
  {
    path: `/${NAME_URL_LOGIN.login}/${NAME_URL_LOGIN.securityCode}`,
    main: ({ match }) => <SecurityCode match={match} />,
  },
  {
    path: `/${NAME_URL_LOGIN.login}/${NAME_URL_LOGIN.resetPassword}`,
    main: ({ match }) => <RestPassword match={match} />,
  },
  {
    path: `/${TITLE_MENU.DASHBOARD}`,
    exact: true,
    main: ({ match }) => <Dashboard match={match} />,
  },
  {
    path: `/${TITLE_MENU.USERS}`,
    exact: true,
    main: ({ match }) => <Users match={match} />,
  },
  {
    path: `/${TITLE_MENU.USERS}/${CREAT}`,
    exact: true,
    main: ({ match }) => <CreactUser match={match} />,
  },
  {
    path: `/${TITLE_MENU.USERS}/:id/${EDIT}`,
    exact: true,
    main: ({ match }) => <EditUser match={match} />,
  },
  {
    path: `/${TITLE_MENU.ORDERS}`,
    exact: true,
    main: ({ match }) => <Orders match={match} />,
  },
  {
    path: `/${TITLE_MENU.ORDERS}/:id/${EDIT}`,
    exact: true,
    main: ({ match }) => <EditOrder match={match} />,
  },
  {
    path: `/${TITLE_MENU.ORDERMOTH}`,
    exact: true,
    main: ({ match }) => <OrderMoth match={match} />,
  },
  {
    path: `/${TITLE_MENU.COMMENTS}`,
    exact: true,
    main: ({ match }) => <Comments match={match} />,
  },
  {
    path: `/${TITLE_MENU.PRODUCTS}`,
    exact: true,
    main: ({ match }) => <Products match={match} />,
  },
  {
    path: `/${TITLE_MENU.PRODUCTS}/${CREAT}`,
    exact: true,
    main: ({ match }) => <CreateProduct match={match} />,
  },
  {
    path: `/${TITLE_MENU.PRODUCTS}/:id/${EDIT}`,
    exact: true,
    main: ({ match }) => <CreateProduct match={match} />,
  },

  {
    path: `/${TITLE_MENU.SLIDE}`,
    exact: true,
    main: ({ match }) => <Slider match={match} />,
  },
  {
    path: `/${TITLE_MENU.SLIDE}/${CREAT}`,
    exact: true,
    main: ({ match }) => <EditCreat match={match} />,
  },
  {
    path: `/${TITLE_MENU.SLIDE}/:id/${EDIT}`,
    exact: true,
    main: ({ match }) => <EditCreat match={match} />,
  },

  {
    path: '*',
    exact: true,
    main: ({ match }) => <Page404 match={match} />,
  },
]
