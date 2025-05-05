import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getCountBooking,
  getCountBookingByChannel,
  getRevenue,
  getServiceTypeSold,
  getTop5Service,
} from "../services/overview";

const bookingChannelData = [
  { name: "Trực tiếp", value: 200 },
  { name: "Zalo", value: 150 },
  { name: "Facebook", value: 100 },
  { name: "Website", value: 80 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("revenueLast30Days");
  const [countTimeFilter, setCountTimeFilter] = useState("today");
  const [serviceTimeFilter, setServiceTimeFilter] = useState("today");
  const [topServiceTimeFilter, setTopServiceTimeFilter] = useState("today");
  const [cancelTimeFilter, setCancelTimeFilter] = useState("today");
  const [bookingChannelTimeFilter, setBookingChannelTimeFilter] =
    useState("today");
  const [revenueData, setRevenueData] = useState({});
  const [countBookingData, setCountBookingData] = useState({});
  const [topServices, setTopServices] = useState({});
  const [countBookingChannel, setCountBookingChannel] = useState({});
  const [bookingChannelData, setBookingChannelData] = useState([]);
  const [countBookingSelected, setCountBookingSelected] = useState({
    revenue: 0,
    countBooking: 0,
    countCancel: 0,
  });

  const [serviceTypeData, setServiceTypeData] = useState({});

  const [serviceTypeSelected, setServiceTypeSelected] = useState([
    { serviceType: "Dịch vụ", value: 0 },
    { serviceType: "Đồ ăn", value: 0 },
    { serviceType: "Thức uống", value: 0 },
  ]);

  const [cancellationRate, setCancellationRate] = useState([]);

  const fetchRevenue = async () => {
    const data = await getRevenue();
    if (data) {
      setRevenueData(data);
    }
  };

  const fetchCountBooking = async () => {
    const data = await getCountBooking();
    if (data) {
      setCountBookingData(data);
      setCountBookingSelected(data.today);

      const { countBooking, countCancel } = data.today;

      const cancellationRate = [
        { name: "Đã hủy", value: +countCancel },
        { name: "Thành công", value: +countBooking - +countCancel },
      ];

      setCancellationRate(cancellationRate);
    }
  };

  const fetchServiceType = async () => {
    const data = await getServiceTypeSold();
    if (data) {
      setServiceTypeData(data);
      setServiceTypeSelected(data.today);
    }
  };

  const fetchTop5Service = async () => {
    const data = await getTop5Service();
    if (data) {
      setTopServices(data);
      // setServiceTypeSelected(data.today);
    }
  };

  const fetchCountBookingByChannel = async () => {
    const data = await getCountBookingByChannel();
    if (data) {
      const transformed = {};
      Object.keys(data).forEach((key) => {
        transformed[key] = Object.entries(data[key]).map(([name, value]) => ({
          name,
          value,
        }));
      });
      setCountBookingChannel(transformed);
    }
  };

  useEffect(() => {
    const data = countBookingData?.[cancelTimeFilter];
    if (data) {
      const { countBooking, countCancel } = data;

      const cancellationRate = [
        { name: "Đã hủy", value: +countCancel },
        { name: "Thành công", value: +countBooking - +countCancel },
      ];

      setCancellationRate(cancellationRate);
    }
  }, [cancelTimeFilter]);

  // useEffect(() => {
  //   const data = countBookingChannel?.[bookingChannelTimeFilter];
  //   if (data) {
  //     const { countBooking, countCancel } = data;

  //     const cancellationRate = [
  //       { name: "Đã hủy", value: +countCancel },
  //       { name: "Thành công", value: +countBooking - +countCancel },
  //     ];

  //     setCancellationRate(cancellationRate);
  //   }
  // }, [bookingChannelTimeFilter]);

  useEffect(() => {
    fetchRevenue();
    fetchCountBooking();
    fetchServiceType();
    fetchTop5Service();
    fetchCountBookingByChannel();
  }, []);

  useEffect(() => {
    console.log(countBookingSelected);
  }, [countBookingSelected]);
  return (
    <div className="dashboard-container p-6 space-y-6 pt-14">
      <h1 className="dashboard-title text-2xl font-bold">Tổng quan hệ thống</h1>

      <div className="flex items-center justify-between mb-4 ">
        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="timeFilter" className="font-medium">
            Xem theo:
          </label>
          <select
            id="countTimeFilter"
            className="border rounded px-3 py-1 text-sm outline-none focus:ring focus:ring-blue-300"
            value={countTimeFilter}
            onChange={(e) => {
              setCountBookingSelected(countBookingData[e.target.value]);
              setCountTimeFilter(e.target.value);
            }}
          >
            <option value="today">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
          </select>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
      >
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Doanh thu</h2>
            <p className="text-2xl font-bold text-green-600">
              {countBookingSelected.revenue.toLocaleString()}₫
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Dịch vụ đã bán</h2>
            <p className="text-2xl font-bold">
              {serviceTypeData[countTimeFilter]?.reduce(
                (sum, s) => sum + s.totalSold,
                0
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Lượt đặt phòng</h2>
            <p className="text-2xl font-bold">
              {countBookingSelected.countBooking}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Đơn hủy</h2>
            <p className="text-2xl font-bold text-red-500">
              {countBookingSelected.countCancel}
            </p>
          </CardContent>
        </Card>
      </div>

      <div
        className="chart-grid grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
      >
        <Card>
          <CardContent className="card-content p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="chart-title text-lg font-semibold">
                Doanh thu ({timeFilter})
              </h2>
              <select
                className="border rounded px-3 py-1 text-sm outline-none focus:ring focus:ring-blue-300"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="revenueLast30Days">30 ngày gần nhất</option>
                <option value="revenueThisWeek">Tuần này</option>
                <option value="revenueThisMonth">Tháng này</option>
                <option value="revenueLastMonth">Tháng trước</option>
                <option value="revenueThisYear">Năm nay</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData[timeFilter]}>
                <XAxis dataKey="label" />
                <YAxis tickFormatter={(value) => `${value / 1000000}tr`} />
                <Tooltip
                  formatter={(value) => [
                    `${value.toLocaleString()}₫`,
                    "Doanh thu",
                  ]}
                  labelStyle={{ fontWeight: "bold" }}
                />
                <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="card-content p-4">
            <h2 className="chart-title text-lg font-semibold mb-2">
              Xu hướng doanh thu
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData[timeFilter]}>
                <XAxis dataKey="label" />
                <YAxis tickFormatter={(value) => `${value / 1000000}tr`} />
                <Tooltip
                  formatter={(value) => [
                    `${value.toLocaleString()}₫`,
                    "Doanh thu",
                  ]}
                  contentStyle={{ backgroundColor: "#fefefe", borderRadius: 8 }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff7300"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div
        className="chart-grid grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
      >
        <Card>
          <CardContent className="card-content p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="chart-title text-lg font-semibold">
                Top dịch vụ phổ biến
              </h2>
              <select
                className="border rounded px-3 py-1 text-sm outline-none focus:ring focus:ring-blue-300"
                value={topServiceTimeFilter}
                onChange={(e) => {
                  // setServiceTypeSelected(serviceTypeData[e.target.value]);
                  setTopServiceTimeFilter(e.target.value);
                }}
              >
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={topServices[topServiceTimeFilter]}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="serviceName" />
                <Tooltip />
                <Bar dataKey="totalSold" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="card-content p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="chart-title text-lg font-semibold">
                Tỷ lệ loại dịch vụ
              </h2>
              <select
                className="border rounded px-3 py-1 text-sm outline-none focus:ring focus:ring-blue-300"
                value={serviceTimeFilter}
                onChange={(e) => {
                  setServiceTypeSelected(serviceTypeData[e.target.value]);
                  setServiceTimeFilter(e.target.value);
                }}
              >
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={serviceTypeSelected}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="totalSold"
                  nameKey="serviceType"
                  label={({ serviceType, percent }) =>
                    `${serviceType}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {serviceTypeSelected.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} lượt bán`, name]}
                  contentStyle={{ backgroundColor: "#fff", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div
        className="chart-grid grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
      >
        <Card>
          <CardContent className="card-content p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="chart-title text-lg font-semibold">
                Tỷ lệ kênh đặt
              </h2>
              <select
                className="border rounded px-3 py-1 text-sm outline-none focus:ring focus:ring-blue-300"
                value={bookingChannelTimeFilter}
                onChange={(e) => {
                  setBookingChannelTimeFilter(e.target.value);
                }}
              >
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={countBookingChannel?.[bookingChannelTimeFilter] || []}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {(countBookingChannel?.[bookingChannelTimeFilter] || []).map(
                    (entry, index) => (
                      <Cell
                        key={`channel-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} lượt đặt`, name]}
                  contentStyle={{ backgroundColor: "#fff", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="card-content p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="chart-title text-lg font-semibold">
                Tỷ lệ đơn hủy
              </h2>
              <select
                className="border rounded px-3 py-1 text-sm outline-none focus:ring focus:ring-blue-300"
                value={cancelTimeFilter}
                onChange={(e) => {
                  // setServiceTypeSelected(serviceTypeData[e.target.value]);
                  setCancelTimeFilter(e.target.value);
                }}
              >
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cancellationRate}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {cancellationRate.map((entry, index) => (
                    <Cell
                      key={`cancel-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} lượt`, name]}
                  contentStyle={{ backgroundColor: "#fff", borderRadius: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
