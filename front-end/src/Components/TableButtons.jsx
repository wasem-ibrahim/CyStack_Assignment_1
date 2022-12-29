import React from "react";
import { BsCloudArrowDownFill, BsFillFilterSquareFill } from "react-icons/bs";

function TableButtons({
  handleFilterExpired,
  filterExpired,
  currentPage,
  handlePageChange,
  perPage,
  handleDownload,
  filteredCertificates,
  lightTheme
}) {
  return (
    <div className="flex justify-between items-center">
      <button
        className="text-white font-bold py-2 px-4 mb-8 rounded bg-green-500 hover:bg-green-600"
        onClick={handleFilterExpired}>
        {filterExpired ? "Show All" : "Filter Expired"}
      </button>

      <div className="flex items-center text-lg mb-8">
        <h1 className={`${lightTheme ? "text-black" : "text-white"} mr-2`}> Page : </h1>
        <div>
          <input
            type="number"
            value={currentPage}
            onChange={handlePageChange}
            min="1"
            max={Math.ceil(filteredCertificates.length / perPage)}
            className=" border rounded py-2 px-3 w-16 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      <button
        className=" flex gap-2  items-center text-white font-bold py-2 px-4 mb-8 rounded bg-green-500 hover:bg-green-600"
        onClick={handleDownload}>
        Download CSV <BsCloudArrowDownFill size={20} />
      </button>
    </div>
  );
}

export default TableButtons;
