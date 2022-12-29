import React from "react";
import { BsFillFilterSquareFill } from "react-icons/bs";

function TableHeadings({ handleSortChange, sortCriteria, sortDirection }) {
    return (
        <thead>
            <tr className="text-xl font-bold border border-slate-600">
                <th
                    className="hover:cursor-pointer w-34 py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600"
                    onClick={() => handleSortChange("issuer")}
                >
                    Issuer
                    {sortCriteria === "issuer" ? (
                        <i
                            className={`fas fa-sort-${
                                sortDirection === "asc" ? "up" : "down"
                            }`}
                        ></i>
                    ) : null}
                    <BsFillFilterSquareFill size={20} />
                </th>

                <th
                    className="hover:cursor-pointer w-1/3 py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600"
                    onClick={() => handleSortChange("subject")}
                >
                    Subject
                    {sortCriteria === "subject" ? (
                        <i
                            className={`fas fa-sort-${
                                sortDirection === "asc" ? "up" : "down"
                            }`}
                        ></i>
                    ) : null}
                    <BsFillFilterSquareFill size={20} />
                </th>

                <th
                    className="hover:cursor-pointer w-1/6 py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600"
                    onClick={() => handleSortChange("valid_from")}
                >
                    Valid From
                    {sortCriteria === "valid_from" ? (
                        <i
                            className={`fas fa-sort-${
                                sortDirection === "asc" ? "up" : "down"
                            }`}
                        ></i>
                    ) : null}
                    <BsFillFilterSquareFill size={20} />
                </th>
                <th
                    className="hover:cursor-pointer w-1/6 py-4 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600"
                    onClick={() => handleSortChange("valid_to")}
                >
                    Valid To
                    {sortCriteria === "valid_to" ? (
                        <i
                            className={`fas fa-sort-${
                                sortDirection === "asc" ? "up" : "down"
                            }`}
                        ></i>
                    ) : null}
                    <BsFillFilterSquareFill size={20} />
                </th>
            </tr>
        </thead>
    );
}

export default TableHeadings;
