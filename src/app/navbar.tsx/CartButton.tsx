'use client';

import { CartType } from '@/lib/db/addToCart';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

interface CartButtonProps {
  cart: CartType | null;
}

export default function CartButton({ cart }: CartButtonProps) {
  function closeDropDown() {
    const elem = document.activeElement as HTMLElement;

    if (elem) {
      elem.blur();
    }
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        <div className="indicator">
          <FaShoppingCart className="text-3xl text-secondary" />
          <span className="badge indicator-item badge-primary badge-sm">{cart?.size || 0}</span>
        </div>
      </label>
      <div
        className="card dropdown-content card-compact z-30 mt-2 w-48 bg-base-300 shadow"
        tabIndex={0}
      >
        <div className="card-body">
          <span className="text-md font-bold">{cart?.size || 0} Items</span>
          <span className="text-lg text-info">Subtotal: {formatPrice(cart?.subtotal || 0)}</span>
          <div className="card-actions">
            <Link onClick={closeDropDown} href="/cart" className="btn btn-secondary btn-block mt-4">
              View your cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
