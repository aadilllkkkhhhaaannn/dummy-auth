import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://fakestoreapi.com/products";

const Home = () => {
  const isAuth = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  // fetch API
  const fetchUsers = async (url) => {
    try {
      const res = await fetch(url);
      const users = await res.json();
      if (users.length > 0) {
        setData([...users, ...users, ...users, ...users, ...users]);
      }
    } catch (error) {
      console.log(error, "ERROR");
    }
  };

  useEffect(() => {
    fetchUsers(API);
  }, []);

  // Filtering
  const filteredData = data.filter((item) => {
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.price.toLowerCase().includes(query)
    );
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          {/* Header with title + search */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h4 className="mb-0">Products</h4>
            <div className="input-group" style={{ maxWidth: "300px"}}>
              <input
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                type="text"
                className="form-control rounded-0 shadow-sm"
                placeholder="🔍 Search products..."
              />
              <button className="btn btn-dark rounded-0">Search</button>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: 60 }}>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => {
                  const { title, price, id, description, category, image } =
                    user;
                  return (
                    <tr key={id + "-" + index}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{title}</td>
                      <td>
                        {description
                          ? description.substring(0, 30) + "..."
                          : "No description"}
                      </td>
                      <td>{category}</td>
                      <td>${price.toFixed(2)}</td>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td>
                        <img
                          style={{ width: "70px", borderRadius: "8px" }}
                          src={image}
                          alt={title}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Buttons */}
          <div className="d-flex justify-content-center mt-4">
            <nav className="w-100">
              <ul
                className="pagination flex-wrap justify-content-center"
                style={{ gap: "6px" }}
              >
                {/* Previous */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link border-0 px-3 py-2 rounded bg-light text-dark fw-semibold shadow-sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    ← Prev
                  </button>
                </li>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className="page-item">
                    <button
                      className={`page-link border-0 px-3 py-2 rounded fw-bold shadow-sm ${
                        currentPage === i + 1
                          ? "bg-dark text-white"
                          : "bg-white text-dark"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                {/* Next */}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link border-0 px-3 py-2 rounded bg-light text-dark fw-semibold shadow-sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  >
                    Next →
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
