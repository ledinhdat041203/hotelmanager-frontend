import { assign } from "lodash";
import React, { useEffect, useState } from "react";
import { uploadAvatar } from "../../services/user";

export default function AddEmployeeModal({
  show,
  onClose,
  employee,
  setEmployee,
  onSave,
}) {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveAvatar = async () => {
    if (avatarFile) {
      const res = await uploadAvatar(avatarFile);
      if (res) {
        employee.avatar = res.url;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveAvatar(); // Đợi upload xong và set avatar
    onSave(); // Gọi sau khi avatar đã được set
    setAvatarPreview(null);
    onClose();
  };

  const handleClose = () => {
    setAvatarPreview(null);
    onClose(); // Close the modal after submitting
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file && file.size > 100 * 1024 * 1024) {
        alert("Ảnh vượt quá 2MB. Vui lòng chọn ảnh nhỏ hơn.");
        return;
      }

      setAvatarPreview(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  useEffect(() => {
    if (show) {
      setAvatarPreview(employee.avatar);
      console.log("llllll", employee);
    }
  }, [show]);
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-50 flex items-start justify-center pt-10 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 relative border border-green-100">
        <h3 className="text-2xl font-bold text-green-700 mb-6">
          Thêm nhân viên mới
        </h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="flex flex-col items-center gap-6 ">
            <div className="w-36 h-36 rounded-full border-4  overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Avatar
                </div>
              )}
            </div>
            <label className="relative cursor-pointer bg-green-50 hover:bg-green-100 border border-dashed  px-4 py-2 rounded-xl text-sm text-green-700 font-medium text-center w-full text-center">
              Chọn ảnh
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
            <div className="w-full">
              <label className="mb-1 font-medium text-gray-700 block">
                Ghi chú
              </label>
              <textarea
                rows="4"
                placeholder="Ghi chú thêm nếu cần"
                name="notes"
                value={employee.notes}
                onChange={handleInputChange}
                className="border  rounded-lg px-3 py-2 w-full  h-full focus:ring-2 focus:border-green-300 focus:outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Form fields column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Họ tên</label>
              <input
                type="text"
                placeholder="Nhập họ tên"
                name="fullName"
                value={employee.fullName}
                onChange={handleInputChange}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:border-green-300 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Chức vụ</label>
              <select
                className="border  rounded-lg px-4 py-2 focus:ring-2 focus:border-green-300 focus:outline-none"
                name="role"
                value={employee.role}
                onChange={handleInputChange}
              >
                <option value="">Chọn chức vụ</option>
                <option>Quản lý</option>
                <option>Lễ tân</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="border  rounded-lg px-4 py-2 focus:ring-2 focus:border-green-300 focus:outline-none"
                name="email"
                value={employee.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Điện thoại
              </label>
              <input
                type="text"
                placeholder="0123456789"
                className="border  rounded-lg px-4 py-2 focus:ring-2 focus:border-green-300 focus:outline-none"
                name="phone"
                value={employee.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Trạng thái
              </label>
              <select
                className="border  rounded-lg px-4 py-2 focus:ring-2 focus:border-green-300 focus:outline-none"
                name="status"
                value={employee.status}
                onChange={handleInputChange}
              >
                <option value={1}>Đang làm việc</option>
                <option value={0}>Đã nghỉ</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Ngày vào làm
              </label>
              <input
                type="date"
                className="border  rounded-lg px-4 py-2 focus:ring-2 focus:border-green-300 focus:outline-none"
                name="startDate"
                value={employee.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Ngày sinh
              </label>
              <input
                type="date"
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:border-green-300 focus:outline-none"
                name="dateOfBirth"
                value={employee.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Giới tính
              </label>
              <select
                className="border  rounded-lg px-4 py-2 focus:ring-2 focus:border-green-300 focus:outline-none"
                name="gender"
                value={employee.gender}
                onChange={handleInputChange}
              >
                <option value={"Nam"}>Nam</option>
                <option value={"Nữ"}>Nữ</option>
                <option value={"Khác"}>Khác</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Địa chỉ</label>
              <input
                type="text"
                placeholder="123 Đường ABC, Quận X"
                name="address"
                value={employee.address}
                onChange={handleInputChange}
                className="border  rounded-lg px-4 py-2 focus:ring-2 focus:border-green-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Buttons full width */}
          <div className="md:col-span-2 flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border-none px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              className=" border-none px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 shadow"
            >
              Lưu
            </button>
          </div>
        </form>

        <button
          className="border-none absolute top-3 right-3 w-8 h-8 flex items-center justify-center 
             rounded-full hover:bg-red-100 
             hover:text-red-700 text-base transition-all duration-150 shadow-sm"
          onClick={handleClose}
          aria-label="Đóng modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
