import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Plus, Search, Filter, Download } from "lucide-react";
import AddAssetDialog from "../components/AddAssetDialog";
import { api } from "../utils/axios";
import { Asset } from "../types";

// const assets = [
//   {
//     id: "COMP-A-001",
//     name: "Compressor Unit A-1",
//     category: "Compressors",
//     location: "Building A - Floor 1",
//     status: "Operational",
//     lastMaintenance: "2024-10-15",
//     nextMaintenance: "2024-12-15",
//   },
//   {
//     id: "PUMP-B-003",
//     name: "Pump B-3",
//     category: "Pumps",
//     location: "Building B - Floor 2",
//     status: "Maintenance",
//     lastMaintenance: "2024-11-01",
//     nextMaintenance: "2024-11-20",
//   },
//   {
//     id: "MOTOR-C-002",
//     name: "Motor C-2",
//     category: "Motors",
//     location: "Building C - Floor 1",
//     status: "Operational",
//     lastMaintenance: "2024-10-28",
//     nextMaintenance: "2024-12-28",
//   },
//   {
//     id: "CONV-D-001",
//     name: "Conveyor D-1",
//     category: "Conveyors",
//     location: "Building D - Warehouse",
//     status: "Down",
//     lastMaintenance: "2024-11-03",
//     nextMaintenance: "2024-11-10",
//   },
//   {
//     id: "HVAC-E-001",
//     name: "HVAC System E-1",
//     category: "HVAC",
//     location: "Building E - Floor 3",
//     status: "Operational",
//     lastMaintenance: "2024-10-20",
//     nextMaintenance: "2024-12-20",
//   },
//   {
//     id: "BOILER-F-001",
//     name: "Boiler F-1",
//     category: "Boilers",
//     location: "Building F - Basement",
//     status: "Operational",
//     lastMaintenance: "2024-10-10",
//     nextMaintenance: "2024-11-10",
//   },
//   {
//     id: "CRANE-G-001",
//     name: "Crane G-1",
//     category: "Cranes",
//     location: "Building G - Warehouse",
//     status: "Maintenance",
//     lastMaintenance: "2024-11-02",
//     nextMaintenance: "2024-11-15",
//   },
//   {
//     id: "CHILLER-H-001",
//     name: "Chiller H-1",
//     category: "Chillers",
//     location: "Building H - Roof",
//     status: "Operational",
//     lastMaintenance: "2024-10-25",
//     nextMaintenance: "2024-12-25",
//   },
// ];

export default function AssetList() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [addAssetDialogOpen, setAddAssetDialogOpen] =
    useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await api.get(`/assets`);
      console.log(response.data.data);
      setAssets(response.data.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || asset.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      asset.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status : string | null) => {
    if (!status) return "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300";
    switch (status) {
      case "Operational":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Down":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-foreground">Asset Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all industrial assets
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setAddAssetDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </div>

      <AddAssetDialog
        open={addAssetDialogOpen}
        onOpenChange={setAddAssetDialogOpen}
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full md:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Operational">
                  Operational
                </SelectItem>
                <SelectItem value="Maintenance">
                  Maintenance
                </SelectItem>
                <SelectItem value="Down">Down</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  All Categories
                </SelectItem>
                <SelectItem value="Compressors">
                  Compressors
                </SelectItem>
                <SelectItem value="Pumps">Pumps</SelectItem>
                <SelectItem value="Motors">Motors</SelectItem>
                <SelectItem value="HVAC">HVAC</SelectItem>
                <SelectItem value="Conveyors">
                  Conveyors
                </SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Actions
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Asset ID
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                    Next Maintenance
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset : Asset) => (
                  <tr
                    key={asset.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">
                      <Link to={`/assets/${asset.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm text-blue-600">
                      {asset.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {asset.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {asset.category}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {asset.location}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="default"
                        className={getStatusColor(asset.status)}
                      >
                        {asset.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {asset.nextMaintenance ? asset.nextMaintenance : 'Not available'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredAssets.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No assets found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}