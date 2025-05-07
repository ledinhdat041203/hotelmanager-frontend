import React, { use, useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import AddEmployeeModal from "../components/modal/AddEmployeeModal";
import { da, ro } from "date-fns/locale";
import { createUser, searchUser, updateUser } from "../services/user";
import { debounce } from "lodash";

export default function EmployeeManagement() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [employees, setEmployees] = useState([]);

  //   const employees = [
  //     {
  //       id: 1,
  //       name: "Nguyễn Văn A",
  //       position: "Lễ tân",
  //       phone: "0901234567",
  //       email: "a.nguyen@email.com",
  //       status: "Đang làm việc",
  //       address: "123 Đường ABC, Quận 1, TP.HCM",
  //       startDate: "01/01/2023",
  //       note: "Nhân viên làm việc tốt",
  //     },
  //     {
  //       id: 2,
  //       name: "Trần Thị B",
  //       position: "Quản lý",
  //       phone: "0912345678",
  //       email: "b.tran@email.com",
  //       status: "Đã nghỉ",
  //       address: "456 Đường DEF, Quận 3, TP.HCM",
  //       startDate: "15/03/2022",
  //       note: "Đã chuyển công tác",
  //     },
  //   ];

  const [employee, setEmployee] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    status: 1,
    startDate: null,
    address: "",
    avatar: null,
    gender: "Nam",
    dateOfBirth: null,
    notes: "",
  });
  const [searchName, setSearchName] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleSaveEmployee = async () => {
    if (!isEdit) {
      const newEmp = await createUser(employee);
      if (newEmp) {
        setEmployees((prev) => [newEmp, ...prev]);
      }
    } else {
      console.log("update", employee);
      const updatedUser = await updateUser(employee);
      if (updateUser) {
        setEmployees((prev) =>
          prev.map((item) =>
            item.userId === updatedUser.userId ? updatedUser : item
          )
        );
      }
    }

    setEmployee({
      fullName: "",
      email: "",
      phone: "",
      role: "",
      status: 1,
      startDate: null,
      address: "",
      avatar: null,
      gender: "Nam",
      dateOfBirth: null,
      notes: "",
    });
  };

  const handleChangeSearchName = (e) => {
    const newValue = e.target.value;
    setSearchName(e.target.value);
    debouncedSearch(newValue, status, role);
  };

  const debouncedSearch = useCallback(
    debounce(async (searchName, status, role) => {
      try {
        const users = await searchUser({ userName: searchName, status, role });
        if (users) {
          setEmployees(users);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    }, 1000),
    []
  );

  const handleEditEmp = (emp) => {
    setEmployee(emp);
    setIsEdit(true);
    setShowAddModal(true);
  };

  const fetchUsers = async (searchName = null, status = null, role = null) => {
    try {
      const users = await searchUser({ userName: searchName, status, role });
      if (users) {
        setEmployees(users);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container room-management">
      <h2 className="text-4xl font-bold text-green-700 mb-8">
        Quản lí nhân viên
      </h2>

      <div className="flex flex-wrap gap-4 mb-8 items-end">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchName}
          onChange={(e) => handleChangeSearchName(e)}
          className="border rounded-lg px-4 py-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:border-green-300 shadow-sm"
        />

        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-green-300 shadow-sm"
          value={role}
          onChange={(e) => {
            const newValue = e.target.value === "" ? null : e.target.value;
            setRole(e.target.value);
            fetchUsers(searchName, status, newValue);
          }}
        >
          <option value="">Chức vụ</option>
          <option>Quản lý</option>
          <option>Lễ tân</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-green-300 shadow-sm"
          value={status}
          onChange={(e) => {
            const newValue =
              e.target.value === "" ? null : Number(e.target.value);
            setStatus(newValue);
            fetchUsers(searchName, newValue, role);
          }}
        >
          <option value="">Trạng thái</option>
          <option value={1}>Đang làm việc</option>
          <option value={0}>Đã nghỉ</option>
        </select>

        <button
          className="border-none ml-auto bg-green-600 text-white text-sm px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          onClick={() => setShowAddModal(true)}
        >
          + Thêm mới
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-green-100 text-green-900 text-left">
              <th className="px-5 py-3 border-b-2"></th>
              <th className="px-5 py-3 border-b-2">STT</th>
              <th className="px-5 py-3 border-b-2">Họ tên</th>
              <th className="px-5 py-3 border-b-2"> Chức vụ</th>
              <th className="px-5 py-3 border-b-2">Điện thoại</th>
              <th className="px-5 py-3 border-b-2">Email</th>
              <th className="px-5 py-3 border-b-2">Trạng thái</th>
              <th className="px-5 py-3 border-b-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <React.Fragment key={emp.userId}>
                <tr className="hover:bg-green-50 group">
                  <td
                    className="px-5 py-3 border-b cursor-pointer"
                    onClick={() => toggleRow(i)}
                  >
                    {expandedRow === i ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </td>
                  <td className="px-5 py-3 border-b">{i + 1}</td>
                  <td className="px-5 py-3 border-b font-medium text-gray-800">
                    {emp.fullName}
                  </td>
                  <td className="px-5 py-3 border-b text-gray-600">
                    {emp.role}
                  </td>
                  <td className="px-5 py-3 border-b text-gray-600">
                    {emp.phone}
                  </td>
                  <td className="px-5 py-3 border-b text-gray-600">
                    {emp.email}
                  </td>
                  <td className="px-5 py-3 border-b">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        emp.status === 1
                          ? "text-green-800 bg-green-200"
                          : "text-gray-600 bg-gray-200"
                      }`}
                    >
                      {emp.status === 1 ? "Đang làm việc" : "Đã nghỉ"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditEmp(emp)}
                        title="Sửa thông tin"
                        className="border-none w-8 h-8 flex items-center justify-center rounded-full 
                 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 
                 transition duration-150"
                      >
                        <i className="fas fa-edit text-sm"></i>
                      </button>

                      <button
                        // onClick={() =>
                        //   handleChangeStatusRoom(room.roomId, room.status)
                        // }
                        // title={
                        //   room.status === 1 ? "Khoá phòng" : "Mở khoá phòng"
                        // }
                        className="border-none w-8 h-8 flex items-center justify-center rounded-full 
                 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 
                 transition duration-150"
                      >
                        {true ? (
                          <i className="fa-solid fa-lock text-sm"></i>
                        ) : (
                          <i className="fa-solid fa-lock-open text-sm text-blue-600"></i>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRow === i && (
                  <tr className="border border-gray-400 bg-green-100 text-sm">
                    <td
                      colSpan={8}
                      className="px-6 py-4 border-b text-gray-700"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        {/* Avatar */}
                        <img
                          src={emp.avatar}
                          alt="Avatar"
                          className="w-24 h-24 rounded-full object-cover border shadow"
                        />

                        {/* Thông tin chi tiết */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                          <p>
                            <strong>Họ tên:</strong> {emp.fullName}
                          </p>
                          <p>
                            <strong>Giới tính:</strong> {emp.gender}
                          </p>
                          <p>
                            <strong>Email:</strong> {emp.email}
                          </p>
                          <p>
                            <strong>Số điện thoại:</strong> {emp.phone}
                          </p>
                          <p>
                            <strong>Ngày sinh:</strong>{" "}
                            {emp.dateOfBirth
                              ? new Date(emp.dateOfBirth).toLocaleDateString(
                                  "vi-VN"
                                )
                              : "Chưa cập nhật"}
                          </p>
                          <p>
                            <strong>Ngày vào làm:</strong>{" "}
                            {emp.startDate
                              ? new Date(emp.startDate).toLocaleDateString(
                                  "vi-VN"
                                )
                              : "Chưa cập nhật"}
                          </p>
                          <p className="col-span-2">
                            <strong>Địa chỉ:</strong>{" "}
                            {emp.address || "Chưa cập nhật"}
                          </p>
                          <p className="col-span-2">
                            <strong>Ghi chú:</strong> {emp.notes || "Không có"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <AddEmployeeModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        employee={employee}
        setEmployee={setEmployee}
        onSave={handleSaveEmployee}
      />
    </div>
  );
}
