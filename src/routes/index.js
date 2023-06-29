import usersRoute from "./usersRoute";
import categoriesRoute from "./categoriesRoute";
import productsRoute from "./productsRoute";
import paymentsRoute from "./paymentsRoute";
import cupomsRoute from "./cupomsRoute";
import addressRoute from "./addressRoute";
import ordersRoute from "./ordersRoute";
import orderProductsRoute from "./orderProductsRoute";

function Routes(app) {
  usersRoute(app);
  cupomsRoute(app);
  productsRoute(app);
  categoriesRoute(app);
  paymentsRoute(app);
  addressRoute(app);
  ordersRoute(app);
  orderProductsRoute(app);
}

export default Routes;
