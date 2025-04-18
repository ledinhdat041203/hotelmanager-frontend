import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import "../styles/BookingDetailPage.css";
import backgroundImage from "../assets/images/bg.jpg";

const services = [
  {
    id: 1,
    name: "Golf (Day)",
    price: 3000000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Fishing (Session)",
    price: 200000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Childcare (Day)",
    price: 500000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Car Rental (Day)",
    price: 2000000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Motorcycle Rental (Day)",
    price: 150000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Massage (Session)",
    price: 700000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Sauna (Session)",
    price: 400000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Haircut (Session)",
    price: 100000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Chips",
    price: 30000,
    unit: "pack",
    category: "Đồ ăn",
    image: "/placeholder.svg",
  },
  {
    id: 10,
    name: "Dried Beef",
    price: 80000,
    unit: "portion",
    category: "Đồ ăn",
    image: "/placeholder.svg",
  },
  {
    id: 11,
    name: "Giặt ủi (Bộ)",
    price: 100000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 12,
    name: "Dọn phòng (Lần)",
    price: 50000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 13,
    name: "Thuê xe đạp (Ngày)",
    price: 80000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 14,
    name: "Hướng dẫn viên du lịch (Ngày)",
    price: 1500000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 15,
    name: "Đặt vé máy bay",
    price: 300000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 16,
    name: "Đặt vé tàu",
    price: 200000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 17,
    name: "Thuê lều cắm trại (Ngày)",
    price: 100000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 18,
    name: "Dịch vụ spa (Lần)",
    price: 1200000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 19,
    name: "Dịch vụ làm móng (Lần)",
    price: 300000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 20,
    name: "Dịch vụ trang điểm (Lần)",
    price: 500000,
    category: "Dịch vụ",
    image: "/placeholder.svg",
  },
  {
    id: 21,
    name: "Nước suối",
    price: 10000,
    unit: "chai",
    category: "Đồ uống",
    image: "/placeholder.svg",
  },
  {
    id: 22,
    name: "Cà phê",
    price: 30000,
    unit: "ly",
    category: "Đồ uống",
    image: "/placeholder.svg",
  },
  {
    id: 23,
    name: "Trà sữa",
    price: 40000,
    unit: "ly",
    category: "Đồ uống",
    image: "/placeholder.svg",
  },
  {
    id: 24,
    name: "Nước ngọt",
    price: 20000,
    unit: "lon",
    category: "Đồ uống",
    image: "/placeholder.svg",
  },
  {
    id: 25,
    name: "Bánh mì",
    price: 15000,
    unit: "ổ",
    category: "Đồ ăn",
    image: "/placeholder.svg",
  },
  {
    id: 26,
    name: "Phở bò",
    price: 50000,
    unit: "tô",
    category: "Đồ ăn",
    image: "/placeholder.svg",
  },
  {
    id: 27,
    name: "Cơm gà",
    price: 60000,
    unit: "phần",
    category: "Đồ ăn",
    image: "/placeholder.svg",
  },
  {
    id: 28,
    name: "Bún chả",
    price: 55000,
    unit: "phần",
    category: "Đồ ăn",
    image: "/placeholder.svg",
  },
  {
    id: 29,
    name: "Cháo gà",
    price: 40000,
    unit: "tô",
    category: "Đồ ăn",
    image: "/placeholder.svg",
  },
  {
    id: 30,
    name: "Trái cây tươi",
    price: 30000,
    unit: "phần",
    category: "Đồ ăn",
    image: "/placeholder.svg",
  },
];

const booking = {
  roomTypes: "Vip đơn",
  roomName: "P101",
  type: "day",
  checkInDate: "2023-10-01T14:00",
  checkOutDate: "2023-10-01T16:00",
  totalPrice: 2000000,
};

const rooms = [
  { id: 1, name: "P101" },
  { id: 2, name: "P102" },
  { id: 3, name: "P103" },
  { id: 4, name: "P104" },
  { id: 5, name: "P201" },
  { id: 6, name: "P202" },
];

export default function BookingDetail() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [quantities, setQuantities] = useState({});

  const [searchRoom, setSearchRoom] = useState(""); // Giá trị input phòng
  const [filteredRooms, setFilteredRooms] = useState([]); // Danh sách phòng gợi ý
  const [roomName, setRoomName] = useState(booking.roomName); // Giá trị phòng hiện tại

  const quantity = 1; // Lấy số lượng hiện tại

  const handleDelete = (id) => {
    setSelectedServices((prev) => prev.filter((service) => service.id !== id));
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      delete updatedQuantities[id];
      return updatedQuantities;
    });
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1), // Không cho giảm dưới 1
    }));
  };

  const handleSelectRoom = (room) => {
    setRoomName(room.name); // Cập nhật tên phòng
    setSearchRoom(room.name); // Điền tên phòng vào input
    setFilteredRooms([]); // Ẩn danh sách gợi ý
  };

  const handleRoomSearchChange = (e) => {
    const value = e.target.value;
    setSearchRoom(value);

    // Lọc danh sách phòng dựa trên từ khóa
    if (value.trim() === "") {
      setFilteredRooms([]);
    } else {
      const filtered = rooms.filter((room) =>
        room.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
  };

  const filteredServices = services.filter((s) => {
    const matchTab = activeTab === "Tất cả" || s.category === activeTab;
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
      exists ? [...selectedServices] : [...selectedServices, service]
    );
  };

  return (
    <div className="booking-detail-page">
      <div className="booking-detail-container">
        {/* Customer Information Section */}
        <div className="customer-info">
          {/* Customer */}
          <div className="customer-section">
            <h3 className="section-title">Khách hàng</h3>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nhập mã, Tên, SĐT khách hàng"
                className="input-field"
              />
              <button className="add-button">
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Sales Channel */}
          <div className="sales-channel">
            <h3 className="section-title">Kênh bán</h3>
            <div className="dropdown">
              <button className="dropdown-button">
                <span>Khách đến trực tiếp</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="notes-section">
            <h3 className="section-title">Ghi chú</h3>
            <span className="text-muted">Chưa có ghi chú</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Left Sidebar */}
          <div className="sidebar">
            <h3>Sản phẩm/Dịch vụ</h3>
            <div className="room-details">
              <div className="search-customer">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Nhập tên, SĐT, mã CCCD khách hàng"
                  className="search-customer-input"
                />
              </div>

              <div className="modal-tabs">
                {["Tất cả", "Dịch vụ", "Đồ ăn", "Đồ uống"].map((tab) => (
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
                      className="service-card"
                      onClick={() => toggleService(service)}
                    >
                      <img src={backgroundImage} alt={service.name} />
                      <div className="service-info">
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
          </div>

          {/* Main Content */}
          <div className="main-content-detail">
            <div className="content">
              <div className="content-header">
                <h2 className="content-title">
                  P.203 - Phòng 01 giường đôi cho 2 người
                </h2>
              </div>

              <div className="content-body">
                <div className="room-details">
                  <div className="table-header">
                    <span>Phòng</span>
                    <span>Hình thức</span>
                    <span>Nhận phòng</span>
                    <span>Trả phòng</span>
                  </div>
                  <div className="table-body">
                    <div className="table-row">
                      <div className="autocomplete-container">
                        <input
                          type="text"
                          className="autocomplete-input"
                          placeholder="Tên phòng"
                          value={searchRoom}
                          onChange={handleRoomSearchChange}
                        />
                        {filteredRooms.length > 0 && (
                          <div className="autocomplete-dropdown">
                            {filteredRooms.map((room) => (
                              <div
                                key={room.id}
                                className="autocomplete-item"
                                onClick={() => handleSelectRoom(room)}
                              >
                                {room.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <select
                        className="input-select"
                        defaultValue={booking.type} // Giá trị mặc định
                        onChange={(e) => {
                          // Xử lý khi người dùng thay đổi lựa chọn
                          console.log("Selected type:", e.target.value);
                        }}
                      >
                        <option value="day">Ngày</option>
                        <option value="night">Đêm</option>
                        <option value="hour">Giờ</option>
                      </select>

                      <input
                        type="datetime-local"
                        className="input-date"
                        defaultValue={booking.checkInDate}
                      />
                      <input
                        type="datetime-local"
                        className="input-date"
                        defaultValue={booking.checkOutDate}
                      />
                    </div>
                  </div>
                </div>

                <div className="room-items">
                  <div className="table-header">
                    <span>STT</span>
                    <span>Hạng mục</span>
                    <span>Số lượng</span>
                    <span>Đơn giá</span>
                    <span>Thành tiền</span>
                  </div>
                  <div className="table-body">
                    {selectedServices.map((service, index) => (
                      <div className="table-row" key={service.id}>
                        <span>{index + 1}</span>
                        <span>{service.name}</span>
                        <div className="quantity-control">
                          <button
                            className="decrement-btn"
                            onClick={() => handleDecrement(service.id)}
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            className="increment-btn"
                            onClick={() => handleIncrement(service.id)}
                          >
                            +
                          </button>
                        </div>
                        <span>{service.price.toLocaleString("vi-VN")}</span>
                        <span>
                          {(
                            (quantities[service.id] || 1) * service.price
                          ).toLocaleString("vi-VN")}{" "}
                          VND
                        </span>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(service.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="content-footer">
                <span>Tổng tiền</span>
                <span>100000</span>
              </div>
            </div>

            <div className="content-detail-footer">
              <div className="footer-buttons">
                <button className="add-button">Hủy</button>
                <button className="add-button">Thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
