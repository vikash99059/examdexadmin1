import React, { useState } from "react";
import { FaEdit, FaTrash, FaArchive } from "react-icons/fa";

const primaryColor = "#5d9cc6ff";

const tableHeaderStyle = {
  border: "1px solid #ddd",
  textAlign: "center",
  fontWeight: "bold",
  backgroundColor: primaryColor,
  color: "white",
  padding: "10px",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  textAlign: "center",
  padding: "8px",
};

const buttonStyle = {
  padding: "6px 10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  margin: "0 5px",
};

const News = () => {
  const [newsList, setNewsList] = useState([
    {
      id: 1,
      title: "Ganesh Festival Announcement",
      category: "Festivals",
      mediaType: "Image",
      status: "Published",
      createdBy: "Admin",
      createdDate: "2025-08-15",
    },
    {
      id: 2,
      title: "Temple Renovation Update",
      category: "Infrastructure Updates",
      mediaType: "Text",
      status: "Draft",
      createdBy: "Manager",
      createdDate: "2025-08-10",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editNews, setEditNews] = useState(null);

  // 📌 Filter + Search
  const filteredNews = newsList.filter((n) => {
    return (
      n.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory ? n.category === filterCategory : true) &&
      (filterStatus ? n.status === filterStatus : true)
    );
  });

  // 📌 Handle Save News
  const handleSaveNews = (e) => {
    e.preventDefault();
    const form = e.target;
    const newNews = {
      id: editNews ? editNews.id : newsList.length + 1,
      title: form.title.value,
      category: form.category.value,
      mediaType: form.mediaType.value,
      status: form.status.value,
      createdBy: "Admin",
      createdDate: new Date().toISOString().split("T")[0],
    };

    if (editNews) {
      setNewsList(newsList.map((n) => (n.id === editNews.id ? newNews : n)));
    } else {
      setNewsList([...newsList, newNews]);
    }

    setShowModal(false);
    setEditNews(null);
    form.reset();
  };

  // 📌 Delete News
  const handleDelete = (id) => {
    if (window.confirm("Delete this news permanently?")) {
      setNewsList(newsList.filter((n) => n.id !== id));
    }
  };

  // 📌 Archive News
  const handleArchive = (id) => {
    setNewsList(newsList.filter((n) => n.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-2 d-none d-lg-block"></div>

        {/* Main Content */}
        <div style={{marginTop:"120px"}} className="col-lg-10 col-md-12 col-sm-12 p-3">
          {/* 🔍 Search + Filter + Add Button */}
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
            <div className="d-flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ width: "200px" }}
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="form-select"
                style={{ width: "150px" }}
              >
                <option value="">Categories</option>
                <option>General</option>
                <option>Rituals</option>
                <option>Festivals</option>
                <option>Infrastructure Updates</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select"
                style={{ width: "100px" }}
              >
                <option value="">status</option>
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditNews(null);
                setShowModal(true);
              }}
              className="btn text-white"
              style={{ backgroundColor: primaryColor }}
            >
              ➕ Add News
            </button>
          </div>

          {/* 📌 News List Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>ID</th>
                  <th style={tableHeaderStyle}>Title</th>
                  <th style={tableHeaderStyle}>Category</th>
                  <th style={tableHeaderStyle}>Media Type</th>
                  <th style={tableHeaderStyle}>Status</th>
                  <th style={tableHeaderStyle}>Created By</th>
                  <th style={tableHeaderStyle}>Created Date</th>
                  <th style={tableHeaderStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((news) => (
                  <tr key={news.id}>
                    <td style={tableCellStyle}>{news.id}</td>
                    <td style={tableCellStyle}>{news.title}</td>
                    <td style={tableCellStyle}>{news.category}</td>
                    <td style={tableCellStyle}>{news.mediaType}</td>
                    <td style={tableCellStyle}>{news.status}</td>
                    <td style={tableCellStyle}>{news.createdBy}</td>
                    <td style={tableCellStyle}>{news.createdDate}</td>
                    <td style={tableCellStyle}>
                      <button
                        onClick={() => {
                          setEditNews(news);
                          setShowModal(true);
                        }}
                        style={{ ...buttonStyle, backgroundColor: primaryColor, color: "white" }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(news.id)}
                        style={{ ...buttonStyle, backgroundColor: "red", color: "white" }}
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleArchive(news.id)}
                        style={{ ...buttonStyle, backgroundColor: "orange", color: "white" }}
                      >
                        <FaArchive />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📌 Modal Form */}
          {showModal && (
            <div
              style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "999",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "25px",
                  borderRadius: "12px",
                  width: "100%",
                  maxWidth: "600px",
                  boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
                }}
              >
                <h3 style={{ marginBottom: "15px", color: primaryColor }}>
                  {editNews ? "Edit News" : "Add News"}
                </h3>
                <form onSubmit={handleSaveNews} className="d-grid gap-3">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={editNews?.title || ""}
                    required
                    className="form-control"
                  />
                  <textarea
                    name="content"
                    placeholder="Content"
                    defaultValue={editNews?.content || ""}
                    className="form-control"
                  />
                  <select
                    name="category"
                    defaultValue={editNews?.category || "General"}
                    className="form-select"
                  >
                    <option>General</option>
                    <option>Rituals</option>
                    <option>Festivals</option>
                    <option>Infrastructure Updates</option>
                  </select>
                  <input type="file" name="media" accept="image/*,video/*" className="form-control" />
                  <select
                    name="mediaType"
                    defaultValue={editNews?.mediaType || "Text"}
                    className="form-select"
                  >
                    <option>Text</option>
                    <option>Image</option>
                    <option>Video</option>
                  </select>
                  <select
                    name="status"
                    defaultValue={editNews?.status || "Draft"}
                    className="form-select"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                  <div className="text-end">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="btn btn-secondary me-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
