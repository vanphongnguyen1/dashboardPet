export const CREAT = 'creat'
export const EDIT = 'edit'

export const STATUS_FETCH = {
  SUCCESS: 'success',
  LOADING: 'loading',
  FAILED: 'failed'
}

export const TITLE_MENU = {
  DASHBOARD: 'Dashboard',
  ORDERS: 'Orders',
  USERS: 'Users',
  PRODUCTPORFOLIO: 'Product portfolio',
  PRODUCTS: 'Products',
  COMMENTS: 'Comments',
  SETTING: 'Setting',
  LOGOUT: 'Logout'
}

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/,
  PHONE: /(09|03|08|05|07)+([0-9]{8})\b/,
}

export const MENU = [
  {
    icon: 'fas fa-th-large',
    title: TITLE_MENU.DASHBOARD
  },
  {
    icon: 'fas fa-shopping-cart',
    title: TITLE_MENU.ORDERS
  },
  {
    icon: 'fas fa-user-friends',
    title: TITLE_MENU.USERS
  },
  {
    icon: 'fas fa-book',
    title: TITLE_MENU.PRODUCTPORFOLIO
  },
  {
    icon: 'fas fa-tags',
    title: TITLE_MENU.PRODUCTS
  },
  {
    icon: 'fas fa-comment-alt-lines',
    title: TITLE_MENU.COMMENTS
  },
  {
    icon: 'fas fa-cog',
    title: TITLE_MENU.SETTING
  },
  {
    icon: 'fas fa-sign-out-alt',
    title: TITLE_MENU.LOGOUT
  },
]
