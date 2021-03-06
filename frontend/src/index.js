import HomeScreen from './srceens/HomeScreen';
import ProductScreen from './srceens/ProductScreen';
import { hideLoading, parseRequestUrl, showLoading } from './utils';
import Error404Screen from './srceens/Error404Screen';
import CartScreen from './srceens/CartScreen';
import SigninScreen from './srceens/SigninScreen';
import Header from './components/Header';
import RegisterScreen from './srceens/RegisterScreen';
import ProfileScreen from './srceens/PrrofileScreen';
import ShippingScreen from './srceens/ShippingScreen';
import PaymentScreen from './srceens/PaymentScreen';
import PlaceOrderScreen from './srceens/PlaceOrderScreen';
import OrderScreen from './srceens/OrderScreen';
import DashboardScreen from './srceens/DashboardScreen';
import ProductListScreen from './srceens/ProductListScreen';

const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/signin': SigninScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
  '/shipping': ShippingScreen,
  '/payment': PaymentScreen,
  '/placeorder': PlaceOrderScreen,
  '/order/:id': OrderScreen,
  '/dashboard': DashboardScreen,
  '/productlist': ProductListScreen,
};
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
