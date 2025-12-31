import React, { HTMLAttributes } from 'react'
import { Table } from '@tanstack/react-table'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../pagination'
import { cn } from '../../../lib/utils'

type DataTablePaginationProps<TData> = {
  table: Table<TData>
} & HTMLAttributes<HTMLDivElement>

export function DataTablePagination<TData>({ table, className }: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()

  // Calculate which pages to show (3 pages at a time)
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      // If total pages is 3 or less, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage === 1) {
      // If first page: show current + next 2
      return [1, 2, 3]
    } else if (currentPage === totalPages) {
      // If last page: show previous 2 + current
      return [totalPages - 2, totalPages - 1, totalPages]
    } else {
      // Otherwise: show previous + current + next
      return [currentPage - 1, currentPage, currentPage + 1]
    }
  }

  const visiblePages = getVisiblePages()
  const firstVisiblePage = visiblePages[0] || 1
  const lastVisiblePage = visiblePages[visiblePages.length - 1] || totalPages

  return (
    <div className={cn('flex items-center justify-center px-2', className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              className={
                !table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }
            />
          </PaginationItem>

          {/* Show ellipsis at start if needed */}
          {firstVisiblePage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => table.setPageIndex(0)} className="cursor-pointer">
                  1
                </PaginationLink>
              </PaginationItem>
              {firstVisiblePage > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => table.setPageIndex(page - 1)}
                isActive={page === currentPage}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {lastVisiblePage < totalPages && (
            <>
              {lastVisiblePage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  onClick={() => table.setPageIndex(totalPages - 1)}
                  className="cursor-pointer"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              className={
                !table.getCanNextPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
