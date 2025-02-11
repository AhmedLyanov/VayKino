import { useState } from "react";
import "./style.css";

export const PaginationArrows = ({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  currentPageTransform,
  setCurrentPageTransform,
  elWidth,
}) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage2, setCurrentPage2] = useState(currentPage);
  const handlePrevPage = () => {
    if (currentPage > 1 && currentPage2 > 1) {
      setCurrentPageTransform(currentPageTransform - elWidth - 53);
    }

    if (currentPage2 > 1) {
      setCurrentPage2(currentPage2 - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }

    if (currentPage2 < totalPages) {
      setCurrentPage2(currentPage2 + 1);
      setCurrentPageTransform(currentPageTransform + elWidth + 53);
    }
  };

  return (
    <div className="pagination_arrows-cont">
      <div
        className="pagination_arrows-arrow"
        onClick={handlePrevPage}
        style={currentPage2 === 1 ? { cursor: "not-allowed" } : {}}
      >
        <svg
          width="27"
          height="24"
          viewBox="0 0 27 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.939341 10.9392C0.353554 11.525 0.353554 12.4748 0.939341 13.0605L10.4853 22.6065C11.0711 23.1923 12.0208 23.1923 12.6066 22.6065C13.1924 22.0207 13.1924 21.0709 12.6066 20.4852L4.12132 11.9999L12.6066 3.5146C13.1924 2.92881 13.1924 1.97906 12.6066 1.39328C12.0208 0.807489 11.0711 0.807489 10.4853 1.39328L0.939341 10.9392ZM27 10.4999L2 10.4999V13.4999L27 13.4999V10.4999Z"
            fill={currentPage2 === 1 ? "#606060" : "white"}
          />
        </svg>
      </div>
      <div className="pagination_arrows-value">
        {currentPage2} / {totalPages}
      </div>
      <div
        className="pagination_arrows-arrow"
        onClick={handleNextPage}
        style={currentPage2 === totalPages ? { cursor: "not-allowed" } : {}}
      >
        <svg
          width="27"
          height="24"
          viewBox="0 0 27 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.0607 13.0605C26.6464 12.4748 26.6464 11.525 26.0607 10.9392L16.5147 1.39328C15.9289 0.807489 14.9792 0.807489 14.3934 1.39328C13.8076 1.97906 13.8076 2.92881 14.3934 3.5146L22.8787 11.9999L14.3934 20.4852C13.8076 21.0709 13.8076 22.0207 14.3934 22.6065C14.9792 23.1923 15.9289 23.1923 16.5147 22.6065L26.0607 13.0605ZM0 13.4999L25 13.4999V10.4999L0 10.4999L0 13.4999Z"
            fill={currentPage2 === totalPages ? "#606060" : "white"}
          />
        </svg>
      </div>
    </div>
  );
};
