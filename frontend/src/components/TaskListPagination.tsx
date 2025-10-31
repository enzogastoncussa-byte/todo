import { cn } from "../lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

// Interface defining the props for the TaskListPagination component
interface TaskListPaginationProps {
  handleNext: () => void;
  handlePrev: () => void;
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

// React functional component that renders pagination controls for a task list
export const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  currentPage,
  totalPages,
}: TaskListPaginationProps) => {
  // Function to generate an array of page numbers to display in the pagination component
  const generatePages = () => {
    const pages: number[] = [];

    // If there are fewer than 5 total pages, display all page numbers
    if (totalPages < 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If current page is in the middle, show 5 pages centered on current page
      if (currentPage > 2 && currentPage < totalPages - 2) {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      } else if (currentPage <= 2) {
        // If current page is near the start, show first 5 pages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // If current page is near the end, show last 5 pages
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  // Generate the array of page numbers to display
  const pagesNumbers = generatePages();

  // Render the pagination UI
  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent>
          {/* Previous page button */}
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              onClick={currentPage === 1 ? undefined : handlePrev}
              className={cn(
                "cursor-pointer",
                currentPage === 1 && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>

          {/* Show first page and ellipsis if current page is greater than 3 */}
          {currentPage > 3 && (
            <>
              {/* Link to first page */}
              <PaginationItem>
                <PaginationLink
                  size="sm"
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                  onClick={() => handlePageChange(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {/* Ellipsis indicating skipped pages */}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {/* Render the list of page number links */}
          {pagesNumbers.map((page) => {
            // Highlight the current page
            if (page === currentPage) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive
                    size="sm"
                    className="bg-blue-500 text-white"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            } else {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    size="sm"
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}

          {/* Show ellipsis and last page if current page is less than totalPages - 2 and greater than 3 */}
          {currentPage < totalPages - 2 && currentPage > 3 && (
            <>
              {/* Ellipsis indicating skipped pages */}
              {/* Next page button */}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              {/* Link to last page */}
              <PaginationItem>
                <PaginationLink
                  size="sm"
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              size="sm"
              onClick={currentPage === totalPages ? undefined : handleNext}
              className={cn(
                "cursor-pointer",
                currentPage === totalPages && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
