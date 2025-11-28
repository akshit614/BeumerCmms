import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Plus, Search, Filter } from "lucide-react";
import AddWorkOrderDialog from "../components/AddWorkOrderDialog";
import { api } from "../utils/axios";
import { WorkOrder } from "../types";

export default function WorkOrderList() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [addWorkOrderDialogOpen, setAddWorkOrderDialogOpen] =
    useState(false);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await api.get('/workorders');
        console.log("Work orders fetched:", response.data.data);
        setWorkOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching work orders:', error);
      }
    };
    fetchWorkOrders();
  }, []);

  const filteredOrders = workOrders.filter((order) => {
    const matchesSearch =
      order.assetId
        .includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" ||
      order.priority === priorityFilter;
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "open" &&
        (order.status === "Open" ||
          order.status === "Pending")) ||
      (activeTab === "inprogress" &&
        order.status === "In Progress") ||
      (activeTab === "completed" &&
        order.status === "Completed");
    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesTab
    );
  });

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400";
      case "High":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "In Progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
      case "Open":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Pending":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-foreground">Work Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track maintenance work orders
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setAddWorkOrderDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Work Order
        </Button>
      </div>

      <AddWorkOrderDialog
        open={addWorkOrderDialogOpen}
        onOpenChange={setAddWorkOrderDialogOpen}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="inprogress">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search work orders..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
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
                    <SelectItem value="all">
                      All Status
                    </SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">
                      In Progress
                    </SelectItem>
                    <SelectItem value="Completed">
                      Completed
                    </SelectItem>
                    <SelectItem value="Pending">
                      Pending
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      All Priorities
                    </SelectItem>
                    <SelectItem value="Critical">
                      Critical
                    </SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">
                      Medium
                    </SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Work Order
                      </th>
                      {/* <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Actions
                      </th> */}
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Asset
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Type
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
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-border hover:bg-muted/50"
                      >
                        <Link to={`/work-orders/${order.id}`}>
                        <td className="py-3 px-4 text-sm text-blue-600 hover:underline font-semibold">
                          {order.id}
                        </td>
                        </Link>
                        <td className="py-3 px-4 text-sm text-foreground">
                          {order.assetId}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {order.type}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="default"
                            className={getPriorityColor(
                              order.priority,
                            )}
                          >
                            {order.priority}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="default"
                            className={getStatusColor(
                              order.status,
                            )}
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {order.assigneeName}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {order.dueDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredOrders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No work orders found matching your criteria
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}