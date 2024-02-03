'use client';

import { useState, useTransition } from 'react';
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa';

interface CartButtonProps {
  productId: string;
  incrementProduct: (productId: string) => Promise<void>;
}

export default function CartButton({ productId, incrementProduct }: CartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setSuccess] = useState(false);

  return (
    <div className="items flex gap-2">
      <button
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProduct(productId);
            setSuccess(true);
          });
        }}
        className="text-md btn btn-primary font-bold"
      >
        ADD TO CART
        <FaShoppingCart className="text-lg" />
      </button>
      {isPending && <span className="loading loading-dots loading-lg" />}
      {!isPending && isSuccess && (
        <span className="my-auto flex gap-2 text-success">
          {' '}
          Added to Cart! <FaCheckCircle className="my-auto" />
        </span>
      )}
    </div>
  );
}
