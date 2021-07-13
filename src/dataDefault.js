export const CREAT = 'creat'
export const EDIT = 'edit'

export const STATUS_HANDLE = {
  PENDING: 'pending',

  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',

  REJECTED: 'rejected',
  ACCEPTED: 'accepted'
}

export const NAME_URL_LOGIN = {
  login: 'login',
  identify: 'identify',
  securityCode: 'security-code',
  resetPassword: 'reset-password'
}

export const API_NAME = {
  USERS: 'users',
  ORDERS: 'orders',
  CUSTOMERS: 'customers',
  COMMENTS: 'comments',
  PRODUCTS: 'products',
  DETAILORDER: 'detailOrder',

  TYPEPRODUCT: 'typeProduct',
  PRODUCTDETAILORDER: 'productDetailOrder',

  GROUPS: 'groups',
  LINEAGE: 'lineage',
  GENDER: 'gender',
  CARTS: 'carts',

  IMAGES: 'images',
  KEYSEARCH: 'keySearch',
  PEYMENT: 'peyment',
  STATUS: 'status',
  TRASPORT: 'trasport',
  SLIDER: 'slider',
  STATUSCOMMENTS: 'statusComments',
}

export const STATUS_FETCH = {
  SUCCESS: 'success',
  LOADING: 'loading',
  FAILED: 'failed'
}

export const TITLE_MENU = {
  DASHBOARD: 'dashboard',
  ORDERS: 'orders',
  USERS: 'users',
  SLIDE: 'slider',
  PRODUCTS: 'products',
  COMMENTS: 'comments',
}

export const REGEX = {
  // EMAIL: /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/,
  EMAIL: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
  PHONE: /(09|03|08|05|07)+([0-9]{8})\b/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
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
    title: TITLE_MENU.SLIDE
  },
  {
    icon: 'fas fa-images',
    title: TITLE_MENU.PRODUCTS
  },
  {
    icon: 'fas fa-comment-alt-lines',
    title: TITLE_MENU.COMMENTS
  },
]
