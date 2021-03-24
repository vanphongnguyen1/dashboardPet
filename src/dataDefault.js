export const DASHBOARD = 'Dashboard'
export const ORDERS = 'Orders'
export const CUSTOMERS = 'Users'
export const PRODUCTPORFOLIO = 'Product portfolio'
export const PRODUCTS = 'Products'
export const COMMENTS = 'Comments'
export const SETTING = 'Setting'
export const LOGOUT = 'Logout'
export const CREACT = 'creact'
export const EDIT = 'edit'

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/,
  PHONE: /(09|03|08|05|07)+([0-9]{8})\b/,
}

export const MENU = [
  {
    icon: 'fas fa-th-large',
    title: DASHBOARD
  },
  {
    icon: 'fas fa-shopping-cart',
    title: ORDERS
  },
  {
    icon: 'fas fa-user-friends',
    title: CUSTOMERS
  },
  {
    icon: 'fas fa-book',
    title: PRODUCTPORFOLIO
  },
  {
    icon: 'fas fa-tags',
    title: PRODUCTS
  },
  {
    icon: 'fas fa-comment-alt-lines',
    title: COMMENTS
  },
  {
    icon: 'fas fa-cog',
    title: SETTING
  },
  {
    icon: 'fas fa-sign-out-alt',
    title: LOGOUT
  },
]
