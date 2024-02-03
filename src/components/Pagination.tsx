import Link from 'next/link';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationBar({ currentPage, totalPages }: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page < maxPage; page++) {
    numberedPageItems.push(
      <Link
        className={`btn join-item ${currentPage === page ? 'btn-active pointer-events-none' : ''}`}
        href={'?page=' + page}
        key={page}
      >
        {page}
      </Link>,
    );
  }

  return (
    <>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link className="btn join-item" href={'?' + (currentPage - 1)}>
            {' '}
            <MdKeyboardDoubleArrowLeft />
          </Link>
        )}
        <button className="btn join-item pointer-events-none">Page {currentPage}</button>
        {currentPage < totalPages && (
          <Link className="btn join-item" href={'?' + (currentPage + 1)}>
            {' '}
            <MdKeyboardDoubleArrowRight />
          </Link>
        )}
      </div>
    </>
  );
}
