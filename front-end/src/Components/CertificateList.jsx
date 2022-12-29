import { useState } from "react";
import Papa from "papaparse";
import TableHeadings from "./TableHeadings";
import TableButtons from "./TableButtons";

function CertificateList({ certificates = [], lightTheme }) {
  const [filteredCertificates, setFilteredCertificates] = useState(certificates);
  const [filterExpired, setFilterExpired] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(25);
  const [sortCriteria, setSortCriteria] = useState("issuer");
  const [sortDirection, setSortDirection] = useState("asc");

  function handleSortChange(criteria) {
    if (sortCriteria === criteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortDirection("asc");
    }
  }

  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    if (a[sortCriteria] < b[sortCriteria]) {
      return sortDirection === "asc" ? -1 : 1;
    } else if (a[sortCriteria] > b[sortCriteria]) {
      return sortDirection === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  function handleFilterExpired() {
    setCurrentPage(1);
    setFilterExpired(!filterExpired);
    setFilteredCertificates(
      certificates.filter((certificate) => {
        if (filterExpired) {
          return true;
        } else {
          return Date.parse(certificate.valid_to) > Date.now();
        }
      })
    );
  }

  function handleDownload() {
    const csv = Papa.unparse(certificates);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "certificates.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handlePageChange(event) {
    if (event.target.value > 0) {
      setCurrentPage(Number(event.target.value));
    } else {
      setCurrentPage(1);
    }
  }

  function renderTable() {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return sortedCertificates.slice(startIndex, endIndex).map((certificate) => (
      <tr
        key={certificate.id}
        className={`${
          Date.parse(certificate.valid_to) > Date.now() ? "bg-green-200" : "bg-red-200"
        } hover:bg-gray-100 hover:scale-105  transition ease-in-out  border border-slate-600`}>
        <td className="w-1/3 break-words py-4 px-6">{certificate.issuer}</td>
        <td className="w-1/3 break-words py-4 px-6">{certificate.subject}</td>
        <td className="w-1/6 break-words py-4 px-6">{certificate.valid_from}</td>
        <td className="w-1/6 break-words py-4 px-6">{certificate.valid_to}</td>
      </tr>
    ));
  }

  return (
    <div className="container mx-auto py-10">
      <TableButtons
        handleFilterExpired={handleFilterExpired}
        filterExpired={filterExpired}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        perPage={perPage}
        handleDownload={handleDownload}
        filteredCertificates={filteredCertificates}
        lightTheme={lightTheme}
      />
      <table className="w-full text-left border-collapse table-fixed">
        <TableHeadings
          handleSortChange={handleSortChange}
          sortCriteria={sortCriteria}
          sortDirection={sortDirection}
        />

        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}

export default CertificateList;
