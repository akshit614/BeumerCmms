import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ArrowLeft, QrCode, Plus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AddWorkOrderDialog from "../components/AddWorkOrderDialog";
import ViewQRDialog from "../components/ViewQRDialog";
import { Asset, MaintenanceHistory } from "../types";
import { api } from "../utils/axios";

// const performanceData = [
//   { date: "2024-09", uptime: 98.5, efficiency: 95 },
//   { date: "2024-10", uptime: 97.2, efficiency: 93 },
//   { date: "2024-11", uptime: 99.1, efficiency: 96 },
// ];



export default function AssetDetail() {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceHistory[]>([]);
  const { id } = useParams();
  const [showWorkOrderDialog, setShowWorkOrderDialog] =
    useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);

  const assetName = "Compressor Unit A-1";
  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await api.get(`/assets/${id}`);
        console.log('asset',response.data.data);
        setAsset(response.data.data);
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
    };
    fetchAsset();
  }, [id]);

  useEffect(() => {
    const fetchMaintenanceHistory = async () => {
      try {
        const response = await api.get(`/workorders/${id}/maintenance`);
        console.log('maintenanceHistory',response.data.data);
        setMaintenanceHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching maintenance history:", error);
      }
    };
    fetchMaintenanceHistory();
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/assets">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-foreground">{asset?.name}</h1>
            <p className="text-muted-foreground mt-1">{id}</p>
          </div>
          {/* <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
            Operational
          </Badge> */}
        </div>
        <div className="flex space-x-2 py-2 gap-2">
          <Button
            variant="outline"
            onClick={() => setShowQRDialog(true)}
          >
            <QrCode className="mr-2 h-4 w-4" />
            View QR
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowWorkOrderDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Work Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Asset Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">
                Location
              </div>
              <div className="text-foreground">
                {asset?.location}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                Category
              </div>
              <div className="text-foreground">{asset?.category}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                Status
              </div>
              <Badge variant="destructive">{asset?.status}</Badge>
            </div>
            {/* <div>
              <div className="text-sm text-muted-foreground">
                Last Maintenance
              </div>
              <div className="text-foreground">{asset?.lastMaintenance ? `${asset.lastMaintenance}` : 'Not available'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">
                Next Maintenance
              </div>
              <div className="text-foreground">{asset?.nextMaintenance ? `${asset.nextMaintenance}` : 'Not available'}</div>
            </div> */}
          </CardContent>
        </Card>
        {/* Performance Metrics */}
        {/* <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="date"
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
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Uptime %"
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Efficiency %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

      <Tabs defaultValue="specifications" className="w-full lg:col-span-2">
        <TabsList>
          <TabsTrigger value="specifications" className="text-lg p-3">
            Specifications
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-lg p-3">Documents</TabsTrigger>
          {/* <TabsTrigger value="parts">
            Parts & Inventory
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="specifications">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {asset?.id && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      ID
                    </div><div className="text-foreground mt-1">
                        {asset?.id}
                      </div>
                </div>
                )}
                {asset?.model && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      Model
                    </div><div className="text-foreground mt-1">
                        {asset?.model}
                      </div>
                </div>
                )}
                {asset?.serialNumber && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      Serial Number
                    </div><div className="text-foreground mt-1">
                      {asset?.serialNumber}
                  </div>
                </div>
                )}
                {asset?.manufacturer && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      Manufacturer
                    </div><div className="text-foreground mt-1">
                        {asset?.manufacturer}
                      </div>
                </div>
                )}
                {asset?.installationDate && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      Installation Date
                    </div><div className="text-foreground mt-1">
                        {asset?.installationDate}
                      </div>
                </div>
                )}
                {asset?.warrantyExpiration && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      Warranty Expiration
                    </div><div className="text-foreground mt-1">
                        {asset?.warrantyExpiration}
                      </div>
                </div>
                )}
                {asset?.description && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      Descriptoin
                    </div><div className="text-foreground mt-1">
                        {asset?.description}
                      </div>
                </div>
                )}
                {asset?.maintenanceFrequency && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      Maintenance Frequency
                    </div><div className="text-foreground mt-1">
                        {asset?.maintenanceFrequency}
                      </div>
                </div>
                )}
                
                {asset?.lastMaintenance && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      Last Maintenance
                    </div><div className="text-foreground mt-1">
                        {asset?.lastMaintenance}
                      </div>
                </div>
                )}
                
                {asset?.nextMaintenance && (
                <div >
                    <div className="text-sm text-muted-foreground capitalize">
                      Next Maintenance
                    </div><div className="text-foreground mt-1">
                        {asset?.nextMaintenance}
                      </div>
                </div>
                )}
                
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50">
                  <div>
                    <div className="text-foreground">
                      Installation Manual
                    </div>
                    <div className="text-sm text-muted-foreground">
                      PDF • 2.4 MB
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50">
                  <div>
                    <div className="text-foreground">
                      Maintenance Manual
                    </div>
                    <div className="text-sm text-muted-foreground">
                      PDF • 3.1 MB
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50">
                  <div>
                    <div className="text-foreground">
                      Warranty Certificate
                    </div>
                    <div className="text-sm text-muted-foreground">
                      PDF • 0.8 MB
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="parts">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Part Number
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Quantity
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 text-sm text-foreground">
                        AC-FLT-001
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        Air Filter
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        5
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                          In Stock
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 text-sm text-foreground">
                        AC-OIL-002
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        Lubricant Oil
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        2
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Low Stock
                        </Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 text-sm text-foreground">
                        AC-BLT-003
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        Drive Belt
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        3
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                          In Stock
                        </Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>

      </div>

      <div>
      <Tabs defaultValue="maintenance" className="w-full lg:col-span-2">
        <TabsList>
          <TabsTrigger value="maintenance" className="text-lg p-3">
            Maintenance History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance">
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Work Order
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Technician
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Duration
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {maintenanceHistory && maintenanceHistory.length > 0 ? ( maintenanceHistory.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b border-border hover:bg-muted/50"
                      >
                        <td className="py-3 px-4 text-sm text-blue-600">
                          { record?.id}
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">
                          {record?.createdAt.toString().split('T')[0]}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {record?.type}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {record?.assigneeName}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {record?.estimatedHours}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                            {record?.status}
                          </Badge>
                        </td>
                      </tr>
                    ))) : (
                      <tr>
                        <td colSpan={6} className="py-3 px-4 text-center">
                          No maintenance history found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>

      <AddWorkOrderDialog
        open={showWorkOrderDialog}
        onOpenChange={setShowWorkOrderDialog}
        defaultAssetId={id}
        defaultAssetName={assetName}
      />

      <ViewQRDialog
        open={showQRDialog}
        onOpenChange={setShowQRDialog}
        assetId={id || "COMP-A-001"}
        assetName={asset?.name}
      />
    </div>
  );
}