import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";

export default function PMCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    asset: "",
    frequency: "",
    assignee: "",
    startDate: "",
    description: "",
    estimatedDuration: "",
  });

  const [checklist, setChecklist] = useState([
    { id: 1, task: "", completed: false },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("PM schedule created successfully!");
    setTimeout(() => {
      navigate("/preventive-maintenance");
    }, 1000);
  };

  const addChecklistItem = () => {
    setChecklist([
      ...checklist,
      { id: checklist.length + 1, task: "", completed: false },
    ]);
  };

  const updateChecklistItem = (id: number, task: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, task } : item,
      ),
    );
  };

  const removeChecklistItem = (id: number) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/preventive-maintenance">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-slate-900">Create PM Schedule</h1>
          <p className="text-slate-600 mt-1">
            Set up a new preventive maintenance schedule
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Schedule Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Monthly Compressor Inspection"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="asset">Asset *</Label>
                    <Select
                      value={formData.asset}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          asset: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COMP-A-001">
                          Compressor Unit A-1
                        </SelectItem>
                        <SelectItem value="PUMP-B-003">
                          Pump B-3
                        </SelectItem>
                        <SelectItem value="MOTOR-C-002">
                          Motor C-2
                        </SelectItem>
                        <SelectItem value="HVAC-E-001">
                          HVAC System E-1
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">
                      Frequency *
                    </Label>
                    <Select
                      value={formData.frequency}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          frequency: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">
                          Daily
                        </SelectItem>
                        <SelectItem value="weekly">
                          Weekly
                        </SelectItem>
                        <SelectItem value="biweekly">
                          Bi-Weekly
                        </SelectItem>
                        <SelectItem value="monthly">
                          Monthly
                        </SelectItem>
                        <SelectItem value="quarterly">
                          Quarterly
                        </SelectItem>
                        <SelectItem value="biannual">
                          Bi-Annual
                        </SelectItem>
                        <SelectItem value="annual">
                          Annual
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignee">
                      Assign To *
                    </Label>
                    <Select
                      value={formData.assignee}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          assignee: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select technician" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">
                          John Smith
                        </SelectItem>
                        <SelectItem value="sarah">
                          Sarah Johnson
                        </SelectItem>
                        <SelectItem value="mike">
                          Mike Brown
                        </SelectItem>
                        <SelectItem value="emily">
                          Emily Davis
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">
                      Start Date *
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedDuration">
                    Estimated Duration (hours)
                  </Label>
                  <Input
                    id="estimatedDuration"
                    type="number"
                    step="0.5"
                    placeholder="e.g., 2.5"
                    value={formData.estimatedDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedDuration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the maintenance procedure..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Maintenance Checklist</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addChecklistItem}
                  >
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checklist.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3"
                    >
                      <span className="text-sm text-slate-600 w-8">
                        {index + 1}.
                      </span>
                      <Input
                        placeholder="Enter checklist item"
                        value={item.task}
                        onChange={(e) =>
                          updateChecklistItem(
                            item.id,
                            e.target.value,
                          )
                        }
                        className="flex-1"
                      />
                      {checklist.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeChecklistItem(item.id)
                          }
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* <Card>
              <CardHeader>
                <CardTitle>Schedule Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="autoAssign" />
                  <label htmlFor="autoAssign" className="text-sm text-slate-700">
                    Auto-assign work orders
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifications" />
                  <label htmlFor="notifications" className="text-sm text-slate-700">
                    Send email notifications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="reminders" />
                  <label htmlFor="reminders" className="text-sm text-slate-700">
                    Send reminders 24h before
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" defaultChecked />
                  <label htmlFor="active" className="text-sm text-slate-700">
                    Activate schedule immediately
                  </label>
                </div>
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader>
                <CardTitle>Required Parts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-slate-600">
                    Add parts that are typically needed for this
                    maintenance task.
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Add Part
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Create Schedule
              </Button>
              <Link to="/preventive-maintenance">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}