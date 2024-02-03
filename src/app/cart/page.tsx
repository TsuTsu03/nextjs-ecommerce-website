import { getCart } from '@/lib/db/addToCart';
import CartEntry from './CartEntry';
import { setProductQuantity } from './actions';
import { formatPrice } from '@/lib/format';

export const metadata = {
  title: 'Your Cart - Budol Shop',
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Your Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry setProductQuantity={setProductQuantity} cartItem={cartItem} key={cartItem.id} />
      ))}
      {!cart?.items.length && <p className="text-lg text-warning">Your Cart is Empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="my-2 text-2xl font-bold">Total: {formatPrice(cart?.subtotal || 0)}</p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
}
