import { product } from '@prisma/client';
import Link from 'next/link';
import PriceTag from './PriceTag';
import Image from 'next/image';

interface ProductCardProps {
  product: product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew = Date.now() - new Date(product.createAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={'/products/' + product.id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-2xl"
    >
      <figure>
        <Image
          className="h-64 object-cover"
          width={800}
          height={600}
          src={product.imageUrl}
          alt={product.name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          {isNew && <div className="badge badge-secondary rounded-[8px] p-4 text-lg"> NEW </div>}
        </h2>
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
}
