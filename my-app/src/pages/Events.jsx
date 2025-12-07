import React, { useState } from "react";
import { FaEdit, FaTrash, FaBell, FaCalendar, FaList } from "react-icons/fa";

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

const AdminEventScreens = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Ganesh Festival",
            category: "Festival",
            startDate: "2025-09-01",
            startTime: "10:00",
            endDate: "2025-09-01",
            endTime: "18:00",
            location: "Temple Hall",
            status: "Upcoming",
        },
        {
            id: 2,
            title: "Monthly Pooja",
            category: "Pooja",
            startDate: "2025-08-25",
            startTime: "06:00",
            endDate: "2025-08-25",
            endTime: "09:00",
            location: "Main Mandapam",
            status: "Completed",
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editEvent, setEditEvent] = useState(null);
    const [view, setView] = useState("list"); // list or calendar
    const [showNotifModal, setShowNotifModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState("");

    // 📌 Save Event
    const handleSaveEvent = (e) => {
        e.preventDefault();
        const form = e.target;
        const newEvent = {
            id: editEvent ? editEvent.id : events.length + 1,
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            startDate: form.startDate.value,
            startTime: form.startTime.value,
            endDate: form.endDate.value,
            endTime: form.endTime.value,
            location: form.location.value,
            status: form.status.value,
        };

        if (editEvent) {
            setEvents(events.map((ev) => (ev.id === editEvent.id ? newEvent : ev)));
        } else {
            setEvents([...events, newEvent]);
        }

        setShowModal(false);
        setEditEvent(null);
        form.reset();
    };

    // 📌 Delete Event
    const handleDelete = (id) => {
        if (window.confirm("Delete this event permanently?")) {
            setEvents(events.filter((ev) => ev.id !== id));
        }
    };

    return (
        <div className="container-fluid" style={{ marginTop: "50px" }}>
            <div className="row">
                {/* Sidebar */}
                <div className="col-lg-2 d-none d-lg-block"></div>

                {/* Main Content */}
                <div className="col-lg-10 col-md-12 col-sm-12 p-3">
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            color: primaryColor,
                        }}
                    >
                        🎉 Event Management
                    </h2>

                    {/* Toolbar */}
                    <div className="d-flex flex-wrap justify-content-between mb-3 gap-2">
                        <div className="d-flex gap-2 flex-wrap">
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => setView("list")}
                            >
                                <FaList /> List View
                            </button>
                            <button
                                className="btn btn-outline-success"
                                onClick={() => setView("calendar")}
                            >
                                <FaCalendar /> Calendar View
                            </button>
                        </div>
                        <div>
                            <button
                                className="btn text-white"
                                style={{ backgroundColor: primaryColor }}
                                onClick={() => {
                                    setEditEvent(null);
                                    setShowModal(true);
                                }}
                            >
                                ➕ Add Event
                            </button>
                        </div>
                    </div>

                    {/* 📌 Event List View */}
                    {view === "list" && (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>ID</th>
                                        <th style={tableHeaderStyle}>Title</th>
                                        <th style={tableHeaderStyle}>Category</th>
                                        <th style={tableHeaderStyle}>Start Date & Time</th>
                                        <th style={tableHeaderStyle}>End Date & Time</th>
                                        <th style={tableHeaderStyle}>Location</th>
                                        <th style={tableHeaderStyle}>Status</th>
                                        <th style={tableHeaderStyle}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((ev) => (
                                        <tr key={ev.id}>
                                            <td style={tableCellStyle}>{ev.id}</td>
                                            <td style={tableCellStyle}>{ev.title}</td>
                                            <td style={tableCellStyle}>{ev.category}</td>
                                            <td style={tableCellStyle}>
                                                {ev.startDate} {ev.startTime}
                                            </td>
                                            <td style={tableCellStyle}>
                                                {ev.endDate} {ev.endTime}
                                            </td>
                                            <td style={tableCellStyle}>{ev.location}</td>
                                            <td style={tableCellStyle}>{ev.status}</td>
                                            <td style={tableCellStyle}>
                                                <button
                                                    onClick={() => {
                                                        setEditEvent(ev);
                                                        setShowModal(true);
                                                    }}
                                                    style={{
                                                        ...buttonStyle,
                                                        backgroundColor: primaryColor,
                                                        color: "white",
                                                    }}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(ev.id)}
                                                    style={{
                                                        ...buttonStyle,
                                                        backgroundColor: "red",
                                                        color: "white",
                                                    }}
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedEvent(ev.title);
                                                        setShowNotifModal(true);
                                                    }}
                                                    style={{
                                                        ...buttonStyle,
                                                        backgroundColor: "green",
                                                        color: "white",
                                                    }}
                                                >
                                                    <FaBell />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 📌 Calendar View Placeholder */}
                    {view === "calendar" && (
                        <div className="p-4 text-center border rounded">
                            <h5>📅 Calendar View (Integrate FullCalendar.js here)</h5>
                        </div>
                    )}

                    {/* 📌 Event Modal Form */}
                    {showModal && (
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                position: "fixed",
                                top: 20,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backdropFilter: "blur(1px)", // Blur effect
                                backgroundColor: "rgba(255,255,255,0.1)", // Light transparent background
                                zIndex: 1050,
                            }}
                        >
                            <div
                                className="bg-white p-4 rounded shadow"
                                style={{ maxWidth: "500px", width: "100%", marginTop: "28px" }}
                            >
                                <h4 style={{ color: primaryColor }}>
                                    {editEvent ? "Edit Event" : "Add Event"}
                                </h4>
                                <form
                                    onSubmit={handleSaveEvent}
                                    className="d-grid gap-3 mt-3"
                                >
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        defaultValue={editEvent?.title || ""}
                                        required
                                        className="form-control"
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        defaultValue={editEvent?.description || ""}
                                        className="form-control"
                                    />
                                    <select
                                        name="category"
                                        defaultValue={editEvent?.category || "Cultural"}
                                        className="form-select"
                                    >
                                        <option>Cultural</option>
                                        <option>Pooja</option>
                                        <option>Festival</option>
                                        <option>General</option>
                                    </select>
                                    <div className="d-flex gap-2 flex-wrap">
                                        <input
                                            type="date"
                                            name="startDate"
                                            defaultValue={editEvent?.startDate || ""}
                                            className="form-control"
                                            required
                                        />
                                        <input
                                            type="time"
                                            name="startTime"
                                            defaultValue={editEvent?.startTime || ""}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="d-flex gap-2 flex-wrap">
                                        <input
                                            type="date"
                                            name="endDate"
                                            defaultValue={editEvent?.endDate || ""}
                                            className="form-control"
                                            required
                                        />
                                        <input
                                            type="time"
                                            name="endTime"
                                            defaultValue={editEvent?.endTime || ""}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Location"
                                        defaultValue={editEvent?.location || ""}
                                        className="form-control"
                                    />
                                    <select
                                        name="status"
                                        defaultValue={editEvent?.status || "Draft"}
                                        className="form-select"
                                    >
                                        <option>Draft</option>
                                        <option>Upcoming</option>
                                        <option>Completed</option>
                                        <option>Cancelled</option>
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

                    {/* 📌 Notification Modal */}
                    {showNotifModal && (
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backdropFilter: "blur(6px)", // Blur effect
                                backgroundColor: "rgba(255,255,255,0.1)", // Light transparent background
                                zIndex: 1050,
                            }}
                        >
                            <div
                                className="bg-white p-4 rounded shadow"
                                style={{ maxWidth: "600px", width: "100%" }}
                            >
                                <h4 style={{ color: primaryColor }}>📢 Send Notification</h4>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        alert("Notification Sent!");
                                        setShowNotifModal(false);
                                    }}
                                    className="d-grid gap-3 mt-3"
                                >
                                    <input
                                        type="text"
                                        name="notifTitle"
                                        placeholder="Notification Title"
                                        required
                                        className="form-control"
                                    />
                                    <textarea
                                        name="message"
                                        placeholder="Message"
                                        required
                                        className="form-control"
                                    />
                                    <input
                                        type="datetime-local"
                                        name="schedule"
                                        className="form-control"
                                    />
                                    <div className="text-end">
                                        <button
                                            type="button"
                                            onClick={() => setShowNotifModal(false)}
                                            className="btn btn-secondary me-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn text-white"
                                            style={{ backgroundColor: primaryColor }}
                                        >
                                            Send
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

export default AdminEventScreens;
