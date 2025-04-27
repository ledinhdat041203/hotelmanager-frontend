import { useEffect, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import "../styles/BookingDetailPage.css";
import backgroundImage from "../assets/images/bg.jpg";
import { useParams } from "react-router-dom";
import { findBookingById, updateBooking } from "../services/booking";
import { calculateTime } from "../utils/caculate-time";
import { findByRoomType, findRoomTypeByRoomId } from "../services/room";
import { calculatePrice } from "../utils/caculate-price";
import Drawer from "../components/modal/Drawer";
import InvoiceDrawer from "../components/modal/InvoiceDrawer";

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

const channels = [
  { id: "direct", name: "Khách đến trực tiếp", icon: "fa-solid fa-store" },
  { id: "facebook", name: "Facebook", icon: "fa-brands fa-facebook" },
  { id: "zalo", name: "Zalo", icon: "fa-solid fa-comment-dots" },
  { id: "online", name: "Đặt online", icon: "fa-solid fa-globe" },
];

export default function BookingDetail() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [quantities, setQuantities] = useState({});

  const [searchRoom, setSearchRoom] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [booking, setBooking] = useState({
    id: "",
    customerName: "",
    customerPhone: "",
    cccd: "",
    checkInDate: "",
    checkOutDate: "",
    type: "",
    status: "",
    unitPrice: 0,
    totalPrice: 0,
    depositAmount: 0,
    channel: "",
  });
  const [room, setRoom] = useState({
    roomId: "",
    roomName: "",
    status: 1,
    clean: "",
    state: "",
  });

  const [rooms, setRooms] = useState([]);

  const [roomType, setRoomType] = useState({
    roomTypeId: "",
    roomTypeName: "",
    priceByDay: 0,
    priceByHour: 0,
    priceOvernight: 0,
    status: 1,
  });

  const [timeQuantity, setTimeQuantity] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  const quantity = 1;

  const { id: bookingId } = useParams();

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
    // setRoomName(room.name);
    setRoom(room);
    setSearchRoom(room.roomName); // Điền tên phòng vào input
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
        room.roomName.toLowerCase().includes(value.toLowerCase())
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

  const fetchRoomType = async (roomId) => {
    const roomType = await findRoomTypeByRoomId(roomId);
    if (roomType) {
      console.log("room type", roomType);
      setRoomType(roomType);
    }
  };
  const fetchBooking = async () => {
    const { booking, room } = await findBookingById(bookingId);
    if (booking && room) {
      // console.log("----", booking);
      fetchRoomType(room.roomId);
      setRoom(room);
      setBooking(booking);
    }
  };
  const fetchRooms = async (roomTypeId) => {
    const rooms = await findByRoomType(roomTypeId, 1);

    if (rooms) {
      setRooms(rooms);
    } else {
      setRooms([]);
    }
  };

  const handleEditBooking = async () => {
    const updatedBooking = await updateBooking({
      ...booking,
      roomId: room.roomId,
      bookingId,
    });
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  useEffect(() => {
    setSearchRoom(room.roomName);
  }, [room.roomName]);

  useEffect(() => {
    if (roomType.roomTypeId) {
      const price =
        booking.type == "Ngày"
          ? roomType.priceByDay
          : booking.type == "Đêm"
          ? roomType.priceOvernight
          : roomType.priceByHour;

      console.log("check dame", booking.type, price, roomType);

      const timeQuantity = calculateTime(
        booking.checkInDate,
        booking.checkOutDate
      );
      const totalPrice = calculatePrice({
        checkInStr: booking.checkInDate,
        checkOutStr: booking.checkOutDate,
        type: booking.type,
        price: price,
      });
      setTimeQuantity(timeQuantity);
      setBooking((prev) => ({ ...prev, totalPrice, unitPrice: price }));
    }
  }, [booking.checkInDate, booking.checkOutDate, booking.type]);

  useEffect(() => {
    const timeQuantity = calculateTime(
      booking.checkInDate,
      booking.checkOutDate
    );

    setTimeQuantity(timeQuantity);
  }, [booking.checkInDate, booking.checkOutDate]);

  useEffect(() => {
    if (roomType.roomTypeId) fetchRooms(roomType.roomTypeId);
  }, [roomType.roomTypeId]);

  useEffect(() => {
    console.log("change", booking);
  }, [booking]);

  return (
    <div className="booking-detail-page">
      <div className="booking-detail-container">
        {/* Customer Information Section */}
        <div className="customer-info">
          {/* Customer */}
          <div className="customer-section">
            <h3 className="section-title">Khách hàng</h3>
            {booking.customerName === "" ? (
              <div className="search-customer">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Nhập tên, SĐT, mã CCCD khách hàng"
                  className="search-customer-input"
                  value={booking.customerName}
                  onChange={(e) =>
                    setBooking((prev) => ({
                      ...prev,
                      customerName: e.target.value,
                    }))
                  }
                />
                <button
                //  onClick={handleOpenCustomerModal}
                >
                  <i class="fa-solid fa-circle-plus"></i>
                </button>
              </div>
            ) : (
              <div className="search-customer">
                <i class="fa-regular fa-user"></i>
                <span>{booking.customerName}</span>
                <button
                  onClick={() =>
                    setBooking((prev) => ({ ...prev, customerName: "" }))
                  }
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}
          </div>

          {/* Sales Channel */}
          <div className="sales-channel">
            <h3 className="section-title">Kênh bán</h3>
            <div className="channel-dropdown">
              <div
                className="channel-selected"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <i
                  className={
                    channels.find((ch) => ch.name === booking.channel)?.icon
                  }
                ></i>
                <span>
                  {channels.find((ch) => ch.name === booking.channel)?.name}
                </span>
              </div>
              {isDropdownOpen && (
                <div className="channel-options">
                  {channels.map((channel) => (
                    <div
                      key={channel.id}
                      className="channel-option"
                      onClick={() => {
                        setBooking((prev) => ({
                          ...prev,
                          channel: channel.name,
                        }));

                        setIsDropdownOpen(false);
                      }}
                    >
                      <i className={channel.icon}></i>
                      <span>{channel.name}</span>
                    </div>
                  ))}
                </div>
              )}
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
              <div className="search-service" style={{ maxWidth: "400px" }}>
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm dịch vụ"
                  className="search-service-input"
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
                  {room.roomName} - {roomType.roomTypeName}
                </h2>
              </div>

              <div className="content-body">
                <div className="room-details">
                  <div className="table-header" style={{ maxHeight: "50px" }}>
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
                                key={room.roomId}
                                className="autocomplete-item"
                                onClick={() => handleSelectRoom(room)}
                              >
                                {room.roomName}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <select
                        className="input-select"
                        value={booking.type} // Giá trị mặc định
                        onChange={(e) => {
                          // Xử lý khi người dùng thay đổi lựa chọn
                          console.log("Selected type:", e.target.value);
                          setBooking((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }));
                        }}
                      >
                        <option value="Ngày">Ngày</option>
                        <option value="Đêm">Đêm</option>
                        <option value="Giờ">Giờ</option>
                      </select>

                      <input
                        type="datetime-local"
                        className="input-date"
                        value={booking.checkInDate}
                        onChange={(e) =>
                          setBooking((prev) => ({
                            ...prev,
                            checkInDate: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="datetime-local"
                        className="input-date"
                        value={booking.checkOutDate}
                        onChange={(e) =>
                          setBooking((prev) => ({
                            ...prev,
                            checkOutDate: e.target.value,
                          }))
                        }
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
                    <div className="table-row" key={booking.id}>
                      <span>1.</span>
                      <span>{roomType.roomTypeName}</span>
                      <div className="quantity-control">
                        <span>{timeQuantity}</span>
                      </div>
                      <span>{booking.unitPrice.toLocaleString()} VNĐ</span>
                      <span>
                        {booking.totalPrice.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </div>

                    {selectedServices.map((service, index) => (
                      <div className="table-row" key={service.id}>
                        <span>{index + 2}.</span>
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
                <span>{booking.totalPrice.toLocaleString()} VNĐ</span>
              </div>
            </div>

            <div className="content-detail-footer">
              <div className="footer-buttons">
                <button className="add-button">Hủy Đơn</button>
                <button className="edit-button" onClick={handleEditBooking}>
                  Lưu
                </button>
                <button
                  className="add-button"
                  onClick={() => {
                    setOpenDrawer(true);
                  }}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InvoiceDrawer
        isOpen={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        bookingId={bookingId}
      />
    </div>
  );
}
