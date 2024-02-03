import { formatPrice } from '@/lib/format';

interface PriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  return (
    <span className={`badge rounded-[8px] p-4 text-lg ${className}`}>{formatPrice(price)}</span>
  );
}
