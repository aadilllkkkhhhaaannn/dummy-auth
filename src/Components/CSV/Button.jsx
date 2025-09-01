import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React from "react";
import { CSVLink } from "react-csv";

const Button = ({ data }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Define table headers
    const headers = [
      "#",
      "Title",
      "Category",
      "Price",
      //   "image",
      //   "id",
      //   "description",
    ];

    // Convert data to rows
    const rows = data.map((item, index) => [
      index + 1,
      item.title,
      item.category,
      //   item.description,
      //   item.image,
      //   item.id,
      `$${item.price.toFixed(2)}`,
    ]);
    autoTable(doc, {
      head: [headers], // 👈 ye table ke upar wale column names (header row)
      body: rows, // 👈 ye tumhara actual data (har row me products ka data)
      startY: 20, // 👈 pdf ke top se 20px niche se table draw hona start hoga
    });

    doc.save("products.pdf");
  };

  return (
    <div className="d-flex gap-2">
      <CSVLink data={data} filename="products.csv" className="btn btn-success">
        Download CSV
      </CSVLink>

      <button onClick={downloadPDF} className="btn btn-danger">
        Download PDF
      </button>
    </div>
  );
};

export default Button;
