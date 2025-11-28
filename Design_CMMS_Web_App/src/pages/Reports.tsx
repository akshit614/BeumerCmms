import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

const mttrData = [
  { month: "Jun", hours: 3.2 },
  { month: "Jul", hours: 2.8 },
  { month: "Aug", hours: 3.5 },
  { month: "Sep", hours: 2.9 },
  { month: "Oct", hours: 2.6 },
  { month: "Nov", hours: 2.4 },
];

const workOrdersByType = [
  { name: "Preventive", value: 156, color: "#3b82f6" },
  { name: "Corrective", value: 89, color: "#f59e0b" },
  { name: "Emergency", value: 23, color: "#ef4444" },
  { name: "Inspection", value: 45, color: "#10b981" },
];

const assetDowntime = [
  { asset: "Compressor A-1", hours: 12 },
  { asset: "Pump B-3", hours: 8 },
  { asset: "Conveyor D-1", hours: 24 },
  { asset: "HVAC E-1", hours: 6 },
  { asset: "Boiler F-1", hours: 4 },
];

const costAnalysis = [
  { month: "Jun", labor: 12500, parts: 8200, total: 20700 },
  { month: "Jul", labor: 13200, parts: 7800, total: 21000 },
  { month: "Aug", labor: 11800, parts: 9100, total: 20900 },
  { month: "Sep", labor: 12900, parts: 8500, total: 21400 },
  { month: "Oct", labor: 13500, parts: 7900, total: 21400 },
  { month: "Nov", labor: 12200, parts: 8300, total: 20500 },
];

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">
            Reports & Analytics
          </h1>
          <p className="text-slate-600 mt-1">
            Track performance metrics and generate reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="last30">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 Days</SelectItem>
              <SelectItem value="last30">
                Last 30 Days
              </SelectItem>
              <SelectItem value="last90">
                Last 90 Days
              </SelectItem>
              <SelectItem value="custom">
                Custom Range
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">
                  MTTR
                </div>
                <div className="text-slate-900 mt-1">
                  2.4 hrs
                </div>
                <div className="flex items-center text-sm text-green-600 mt-2">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  12% vs last month
                </div>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">
                  MTBF
                </div>
                <div className="text-slate-900 mt-1">
                  187 hrs
                </div>
                <div className="flex items-center text-sm text-green-600 mt-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  8% vs last month
                </div>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">
                  Overall Uptime
                </div>
                <div className="text-slate-900 mt-1">98.5%</div>
                <div className="flex items-center text-sm text-green-600 mt-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  1.2% vs last month
                </div>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">
                  Monthly Cost
                </div>
                <div className="text-slate-900 mt-1">
                  $20,500
                </div>
                <div className="flex items-center text-sm text-green-600 mt-2">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  4% vs last month
                </div>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Asset Downtime (Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={assetDowntime} layout="vertical">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />
                <XAxis type="number" stroke="#64748b" />
                <YAxis
                  dataKey="asset"
                  type="category"
                  stroke="#64748b"
                  width={120}
                />
                <Tooltip />
                <Bar dataKey="hours" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Orders by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workOrdersByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) =>
                    `${name}: ${value}`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {workOrdersByType.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mean Time To Repair (MTTR)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mttrData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costAnalysis}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="labor"
                  fill="#3b82f6"
                  name="Labor"
                />
                <Bar
                  dataKey="parts"
                  fill="#10b981"
                  name="Parts"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="justify-start h-auto py-4"
            >
              <div className="text-left">
                <div className="text-slate-900">
                  Asset Performance Report
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Generate comprehensive asset analysis
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto py-4"
            >
              <div className="text-left">
                <div className="text-slate-900">
                  Work Order Summary
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Summary of all work orders
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto py-4"
            >
              <div className="text-left">
                <div className="text-slate-900">
                  Technician Performance
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  Analyze technician productivity
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}