import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Package,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  QrCode,
  Loader ,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import QRScanDialog from "../components/QRScanDialog";
import { api } from "../utils/axios";
import { recentWorkOrders } from "../types";
import { Link } from "react-router-dom";

type KPIStats = {
  totalAssets: number;
  openWorkOrders: number;
  completedThisMonth: number;
  scheduledPM: number;
};

const workOrderData = [
  { month: "Jan", completed: 165, open: 42 },
  { month: "Feb", completed: 178, open: 38 },
  { month: "Mar", completed: 185, open: 45 },
  { month: "Apr", completed: 192, open: 41 },
  { month: "May", completed: 189, open: 45 },
  { month: "Jun", completed: 201, open: 39 },
];

const assetStatusData = [
  { name: "Operational", value: 1045, color: "#10b981" },
  { name: "Maintenance", value: 124, color: "#f59e0b" },
  { name: "Down", value: 45, color: "#ef4444" },
  { name: "Retired", value: 20, color: "#64748b" },
];


export default function Dashboard() {
  const [recentWorkOrders, setRecentWorkOrders] = useState<recentWorkOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQRScan, setShowQRScan] = useState(false);
  const [kpis, setKpis] = useState<KPIStats>({
    totalAssets: 0,
    openWorkOrders: 0,
    completedThisMonth: 0,
    scheduledPM: 0,
  });
  const [kpiLoading, setKpiLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recentRes, statsRes] = await Promise.all([
          api.get('/workorders/recent'),
          api.get('/workorders/stats'),
        ]);
        setRecentWorkOrders(recentRes.data.data);
        setKpis(statsRes.data.data as KPIStats);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
        setKpiLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <Button
          onClick={() => setShowQRScan(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <QrCode className="mr-2 h-4 w-4" />
          Scan QR Code
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Total Assets', value: kpis.totalAssets, icon: Package, color: 'blue' },
          { name: 'Open Work Orders', value: kpis.openWorkOrders, icon: AlertCircle, color: 'red' },
          { name: 'Completed This Month', value: kpis.completedThisMonth, icon: CheckCircle2, color: 'green' },
          { name: 'Scheduled PM', value: kpis.scheduledPM, icon: Clock, color: 'yellow' },
        ].map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = TrendingUp;

          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-lg bg-${stat.color}-50`}
                  >
                    <Icon
                      className={`h-6 w-6 text-${stat.color}-600`}
                    />
                  </div>
                  {!kpiLoading && (
                    <div className={`flex items-center text-sm text-muted-foreground`}>
                      <TrendIcon className="h-4 w-4 mr-1 opacity-50" />
                      {/* Optional: add MoM % change when available */}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-foreground">
                    {kpiLoading ? '—' : stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Work Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Work Orders</CardTitle>
        </CardHeader>
        <CardContent>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Work Order
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Asset
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Priority
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Assignee
                  </th>
                </tr>
              </thead>
                {loading ? (
                  <tr>
                  <td colSpan={5} className="py-6 text-center">
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      LOADING.... <Loader className="h-4 w-4 animate-spin" />
                    </span>
                  </td>
                </tr>
              ) : (recentWorkOrders.map((order) => (
                <tbody>
                  <tr
                    key={order.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <Link to={`/work-orders/${order.id}`}>
                    <td className="py-3 px-4 text-sm text-blue-600 hover:underline">
                      {order.id}
                    </td>
                    </Link>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {order.assetId}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          order.priority === "High"
                            ? "destructive"
                            : order.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {order.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "default"
                            : order.status === "In Progress"
                              ? "default"
                              : "secondary"
                        }
                        className={
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                            : order.status === "In Progress"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {order.assigneeName}
                    </td>
                  </tr>
                </tbody>
                ))  )}
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Work Order Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={workOrderData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="open"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {assetStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <QRScanDialog
        open={showQRScan}
        onOpenChange={setShowQRScan}
      />
    </div>
  );
}