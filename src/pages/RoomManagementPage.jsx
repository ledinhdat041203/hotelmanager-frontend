import React, { useCallback, useEffect, useState } from "react";
import "../styles/RoomManagementPage.css";
import RoomTypeModal from "../components/modal/RoomTypeModal";
import RoomModal from "../components/modal/RoomModal";
import {
  createRoomType,
  searchRoomType,
  updateRoomType,
} from "../services/room-type";
import { debounce } from "lodash";

const rooms = [
  {
    id: 1,
    name: "Phòng 101",
    roomType: "Phòng 01 giường đôi",
    priceHour: "180,000",
    priceDay: "720,000",
    priceNight: "720,000",
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
  },
  {
    id: 2,
    name: "Phòng 102",
    roomType: "Phòng 01 giường đơn",
    priceHour: "150,000",
    priceDay: "600,000",
    priceNight: "600,000",
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
  },
  {
    id: 3,
    name: "Phòng 103",
    roomType: "Phòng 02 giường đơn",
    priceHour: "200,000",
    priceDay: "800,000",
    priceNight: "800,000",
    status: "Ngừng kinh doanh",
    branch: "Chi nhánh khác",
  },
  {
    id: 4,
    name: "Phòng 201",
    roomType: "Phòng 01 giường đôi",
    priceHour: "180,000",
    priceDay: "720,000",
    priceNight: "720,000",
    status: "Đang kinh doanh",
    branch: "Chi nhánh trung tâm",
  },
  {
    id: 5,
    name: "Phòng 202",
    roomType: "Phòng 01 giường đơn",
    priceHour: "150,000",
    priceDay: "600,000",
    priceNight: "600,000",
    status: "Đang kinh doanh",
    branch: "Chi nhánh khác",
  },
];

const RoomManagement = () => {
  const [tab, setTab] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [status, setStatus] = useState("active");
  const [branch, setBranch] = useState("Chi nhánh trung tâm");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý trạng thái menu thả xuống
  const [isRoomTypeModalOpen, setIsRoomTypeModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const handleChangeTab = (newValue) => setTab(newValue);
  const [roomData, setRoomData] = useState(rooms); // Quản lý danh sách phòng
  const [roomTypeData, setRoomTypeData] = useState([]); // Quản lý danh sách hạng phòng
  const [roomType, setRoomType] = useState({
    roomTypeId: "",
    roomTypeName: "",
    priceByDay: 0,
    priceByHour: 0,
    priceOvernight: 0,
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleEditRoomType = (roomType) => {
    console.log("Chỉnh sửa phòng:", roomType);
    setRoomType({ ...roomType });
    setIsEdit(true);
    setIsRoomTypeModalOpen(true);
  };

  const handleDeleteRoomType = (roomTypeId) => {
    console.log("Xóa phòng có ID:", roomTypeId);
    // Thêm logic xóa phòng
    const updatedRoomTypeData = roomTypeData.filter(
      (roomType) => roomType.id !== roomTypeId
    );
    setRoomTypeData(updatedRoomTypeData); // Cập nhật danh sách phòng
  };

  const handleEditRoom = (room) => {
    console.log("Chỉnh sửa phòng:", room);
    // Thêm logic mở modal chỉnh sửa phòng
    setIsRoomModalOpen(true);
  };

  const handleDeleteRoom = (roomId) => {
    console.log("Xóa phòng có ID:", roomId);
    // Thêm logic xóa phòng
    const updatedRoomData = roomData.filter((room) => room.id !== roomId);
    setRoomData(updatedRoomData); // Cập nhật danh sách phòng
  };

  const handleSaveRoom = (roomData) => {
    console.log("Dữ liệu phòng mới:", roomData);
    // Thêm logic lưu phòng tại đây
  };

  const handleSave = async () => {
    console.log("Hạng phòng mới:", roomType);
    if (!isEdit) {
      const newRoomType = await createRoomType(
        roomType.roomTypeName,
        roomType.priceByDay,
        roomType.priceByHour,
        roomType.priceOvernight
      );

      if (newRoomType) {
        setRoomTypeData((prev) => [...prev, newRoomType]);
      }
    } else {
      console.log("update");
      const updatedRoomType = await updateRoomType(
        roomType.roomTypeId,
        roomType.roomTypeName,
        roomType.priceByDay,
        roomType.priceByHour,
        roomType.priceOvernight
      );
      if (updatedRoomType) {
        setRoomTypeData((prev) =>
          prev.map((item) =>
            item.roomTypeId === updatedRoomType.roomTypeId
              ? updatedRoomType
              : item
          )
        );
      }
    }
    setRoomType({
      roomTypeName: "",
      priceByDay: 0,
      priceByHour: 0,
      priceOvernight: 0,
    });
    setIsRoomTypeModalOpen(false); // Đóng modal sau khi lưu
  };

  const handleAddNew = (type) => {
    if (type === "room") {
      console.log("Thêm phòng");
      setIsRoomModalOpen(true); // Mở modal thêm hạng phòng
      // Logic thêm phòng
    } else if (type === "roomType") {
      console.log("Thêm loại phòng");
      setIsRoomTypeModalOpen(true); // Mở modal thêm hạng phòng

      // Logic thêm loại phòng
    }
    setIsDropdownOpen(false); // Đóng menu sau khi chọn
  };

  const debouncedSearch = useCallback(
    debounce(async (searchValue, statusValue) => {
      try {
        const roomTypes = await searchRoomType(searchValue, statusValue);
        setRoomTypeData(roomTypes);
        console.log("Kết quả tìm kiếm:", roomTypes);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    }, 1000), // Đợi 1 giây sau khi người dùng dừng nhập
    []
  );

  const handleChangeSearchData = (e) => {
    const newValue = e.target.value;
    setSearchData(e.target.value);
    debouncedSearch(newValue, status);
  };

  const handleChangeStatus = (e) => {
    const newValue = e.target.value;
    setStatus(newValue);
    fetchRoomTypes(searchData, newValue); // Gọi hàm tìm kiếm với giá trị mới
  };

  const fetchRoomTypes = async (search, status) => {
    const roomTypes = await searchRoomType(search, status);
    if (roomTypes) {
      setRoomTypeData(roomTypes);
    }
  };
  useEffect(() => {
    fetchRoomTypes(searchData, status);
  }, []);

  return (
    <div className="container room-management">
      <h2>Hạng phòng & Phòng</h2>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Tìm kiếm phòng/hạng phòng"
          className="search-input"
          value={searchData}
          onChange={(e) => handleChangeSearchData(e)}
        />
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="select-input"
        >
          <option value="Chi nhánh trung tâm">Chi nhánh trung tâm</option>
          <option value="Chi nhánh khác">Chi nhánh khác</option>
        </select>
      </div>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="active"
            checked={status === "active"}
            onChange={(e) => handleChangeStatus(e)}
          />{" "}
          Đang kinh doanh
        </label>
        <label>
          <input
            type="radio"
            value="inactive"
            checked={status === "inactive"}
            onChange={(e) => handleChangeStatus(e)}
          />{" "}
          Ngừng kinh doanh
        </label>
        <label>
          <input
            type="radio"
            value="all"
            checked={status === "all"}
            onChange={(e) => handleChangeStatus(e)}
          />{" "}
          Tất cả
        </label>
      </div>

      <div className="tab-header">
        <div className="tabs">
          <button
            className={tab === 0 ? "tab active" : "tab"}
            onClick={() => handleChangeTab(0)}
          >
            Hạng phòng
          </button>
          <button
            className={tab === 1 ? "tab active" : "tab"}
            onClick={() => handleChangeTab(1)}
          >
            Danh sách phòng
          </button>
        </div>
        <div className="add-button-container">
          <button
            className="add-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            + Thêm mới
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => handleAddNew("roomType")}
              >
                + Thêm loại phòng
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleAddNew("room")}
              >
                + Thêm phòng
              </button>
            </div>
          )}
        </div>
      </div>

      {tab === 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên hạng phòng</th>
              <th>Giá giờ</th>
              <th>Giá cả ngày</th>
              <th>Giá qua đêm</th>
              <th>Trạng thái</th>
              <th>Chi nhánh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roomTypeData.map((roomType, idx) => (
              <tr key={roomType.roomTypeId}>
                <td>{idx + 1}.</td>
                <td>{roomType.roomTypeName}</td>
                <td>{roomType.priceByHour}</td>
                <td>{roomType.priceByDay}</td>
                <td>{roomType.priceOvernight}</td>
                <td>
                  {roomType.status === 1
                    ? "Đang kinh doanh"
                    : "Ngừng kinh doanh"}
                </td>
                <td>{branch}</td>
                <td>
                  <button
                    className="action-button edit-button"
                    onClick={() => handleEditRoomType(roomType)}
                  >
                    <i className="fas fa-edit"></i> {/* Icon Edit */}
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDeleteRoomType(roomType.id)}
                  >
                    <i class="fa-solid fa-lock"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th></th>
              <th>Tên phòng</th>
              <th>Loại phòng</th>
              <th>Giá giờ</th>
              <th>Giá cả ngày</th>
              <th>Giá qua đêm</th>
              <th>Trạng thái</th>
              <th>Chi nhánh</th>
            </tr>
          </thead>
          <tbody>
            {roomData.map((room) => (
              <tr key={room.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{room.name}</td>
                <td>{room.roomType}</td>
                <td>{room.priceHour}</td>
                <td>{room.priceDay}</td>
                <td>{room.priceNight}</td>
                <td>{room.status}</td>
                <td>{room.branch}</td>
                <td>
                  <button
                    className="action-button edit-button"
                    onClick={() => handleEditRoom(room)}
                  >
                    <i className="fas fa-edit"></i> {/* Icon Edit */}
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    <i className="fas fa-trash"></i> {/* Icon Delete */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isRoomTypeModalOpen && (
        <RoomTypeModal
          roomType={roomType}
          setRoomType={setRoomType}
          onClose={() => setIsRoomTypeModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {isRoomModalOpen && (
        <RoomModal
          isOpen={isRoomModalOpen}
          onClose={() => setIsRoomModalOpen(false)}
          onSave={handleSaveRoom}
        />
      )}
    </div>
  );
};

export default RoomManagement;
