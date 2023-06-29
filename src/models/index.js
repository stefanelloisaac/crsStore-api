import Address from "./Address";
import Category from "./Category";
import Cupom from "./Cupom";
import User from "./User";
import Product from "./Product";
import Order from "./Order";
import OrderProduct from "./OrderProduct";
import Payment from "./Payment";

(async () => {
  await Address.sync({ force: true });
  await Category.sync({ force: true });
  await Cupom.sync({ force: true });
  await User.sync({ force: true });
  await Product.sync({ force: true });
  await Order.sync({ force: true });
  await OrderProduct.sync({ force: true });
  await Payment.sync({ force: true });
})();
