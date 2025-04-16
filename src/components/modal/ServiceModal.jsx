import React, { useState } from "react";
import { Search, X } from "lucide-react";
import "../../styles/ServiceModal.css";

const services = [
  {
    id: 1,
    name: "Golf (Day)",
    price: 3000000,
    category: "service",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Fishing (Session)",
    price: 200000,
    category: "service",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Childcare (Day)",
    price: 500000,
    category: "service",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Car Rental (Day)",
    price: 2000000,
    category: "service",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Motorcycle Rental (Day)",
    price: 150000,
    category: "service",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Massage (Session)",
    price: 700000,
    category: "service",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Sauna (Session)",
    price: 400000,
    category: "service",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Haircut (Session)",
    price: 100000,
    category: "service",
    image: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Chips",
    price: 30000,
    unit: "pack",
    category: "food",
    image: "/placeholder.svg",
  },
  {
    id: 10,
    name: "Dried Beef",
    price: 80000,
    unit: "portion",
    category: "food",
    image: "/placeholder.svg",
  },
];

const ServiceModal = ({
  isOpen,
  onClose,
  customerName = "Customer",
  roomNumber = "1",
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const filteredServices = services.filter((s) => {
    const matchTab = activeTab === "all" || s.category === activeTab;
    const matchSearch = s.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const displayed = filteredServices.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const toggleService = (service) => {
    const exists = selectedServices.find((s) => s.id === service.id);
    setSelectedServices(
      exists
        ? selectedServices.filter((s) => s.id !== service.id)
        : [...selectedServices, service]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay service-modal">
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <h2>Thêm sản phẩm, dịch vụ</h2>
            <p>
              {customerName} - Room {roomNumber}
            </p>
          </div>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Danh sách dịch vụ */}
          <div className="service-list">
            <div className="modal-search">
              <Search size={18} className="search-icon" />
              <input
                placeholder="Tìm kiếm dịch vụ"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="modal-tabs">
              {["all", "service", "food", "drink"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="modal-grid">
              {displayed.length ? (
                displayed.map((service) => (
                  <div
                    key={service.id}
                    className={`service-card ${
                      selectedServices.find((s) => s.id === service.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => toggleService(service)}
                  >
                    <img src={service.image} alt={service.name} />
                    <div>
                      <h4>{service.name}</h4>
                      <p>
                        {service.price.toLocaleString("vi-VN")}
                        {service.unit ? `/${service.unit}` : ""}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-services">No services found</div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    className={`page-dot ${
                      currentPage === idx ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(idx)}
                  ></button>
                ))}
              </div>
            )}
          </div>

          {/* Dịch vụ đã đặt */}
          <div className="selected-services">
            <h3>Dịch vụ đã chọn</h3>
            {selectedServices.length > 0 ? (
              <ul>
                {selectedServices.map((service) => (
                  <li key={service.id}>
                    <span>{service.name}</span>
                    <span>
                      {service.price.toLocaleString("vi-VN")}
                      {service.unit ? `/${service.unit}` : ""}
                    </span>
                    <button onClick={() => toggleService(service)}>Xóa</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Chưa có dịch vụ nào được chọn.</p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={() => {
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
