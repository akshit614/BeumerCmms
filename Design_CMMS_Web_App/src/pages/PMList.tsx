import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Plus, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';

const pmSchedules = [
  { id: 'PM-001', name: 'Monthly Compressor Inspection', asset: 'Compressor Unit A-1', frequency: 'Monthly', nextDue: '2024-11-15', status: 'Active', completion: 85 },
  { id: 'PM-002', name: 'Quarterly Pump Maintenance', asset: 'Pump B-3', frequency: 'Quarterly', nextDue: '2024-11-20', status: 'Active', completion: 60 },
  { id: 'PM-003', name: 'Bi-Weekly Motor Check', asset: 'Motor C-2', frequency: 'Bi-Weekly', nextDue: '2024-11-08', status: 'Active', completion: 100 },
  { id: 'PM-004', name: 'Annual HVAC Service', asset: 'HVAC System E-1', frequency: 'Yearly', nextDue: '2024-12-20', status: 'Active', completion: 40 },
  { id: 'PM-005', name: 'Weekly Conveyor Lubrication', asset: 'Conveyor D-1', frequency: 'Weekly', nextDue: '2024-11-10', status: 'Paused', completion: 0 },
  { id: 'PM-006', name: 'Monthly Boiler Inspection', asset: 'Boiler F-1', frequency: 'Monthly', nextDue: '2024-11-10', status: 'Active', completion: 70 },
];

const upcomingTasks = [
  { id: 'PM-003', name: 'Bi-Weekly Motor Check', asset: 'Motor C-2', dueDate: '2024-11-08', priority: 'High' },
  { id: 'PM-006', name: 'Monthly Boiler Inspection', asset: 'Boiler F-1', dueDate: '2024-11-10', priority: 'Medium' },
  { id: 'PM-005', name: 'Weekly Conveyor Lubrication', asset: 'Conveyor D-1', dueDate: '2024-11-10', priority: 'Low' },
  { id: 'PM-001', name: 'Monthly Compressor Inspection', asset: 'Compressor Unit A-1', dueDate: '2024-11-15', priority: 'High' },
];

export default function PMList() {
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    toast.success(`PM schedule ${newStatus === 'Active' ? 'activated' : 'paused'}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Preventive Maintenance</h1>
          <p className="text-slate-600 mt-1">Schedule and track preventive maintenance tasks</p>
        </div>
        <Link to="/preventive-maintenance/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Create PM Schedule
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-slate-600 text-sm">Active Schedules</div>
            <div className="text-slate-900 mt-1">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-slate-600 text-sm">Due This Week</div>
            <div className="text-slate-900 mt-1">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-slate-600 text-sm">Completion Rate</div>
            <div className="text-slate-900 mt-1">92%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-slate-900">PM Schedules</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Schedule ID</th>
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Name</th>
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Asset</th>
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Frequency</th>
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Next Due</th>
                      {/* <th className="text-left py-3 px-4 text-slate-700 text-sm">Progress</th> */}
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Status</th>
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pmSchedules.map((schedule) => (
                      <tr key={schedule.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-sm text-blue-600">{schedule.id}</td>
                        <td className="py-3 px-4 text-sm text-slate-900">{schedule.name}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{schedule.asset}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{schedule.frequency}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{schedule.nextDue}</td>
                        {/* <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Progress value={schedule.completion} className="w-20" />
                            <span className="text-xs text-slate-600">{schedule.completion}%</span>
                          </div>
                        </td> */}
                        <td className="py-3 px-4">
                          <Badge
                            variant="default"
                            className={
                              schedule.status === 'Active'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                            }
                          >
                            {schedule.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(schedule.id, schedule.status)}
                          >
                            {schedule.status === 'Active' ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="text-slate-900">Upcoming Tasks</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-slate-900">{task.name}</div>
                      <Badge
                        variant="default"
                        className={
                          task.priority === 'High'
                            ? 'bg-red-100 text-red-800 hover:bg-red-200 text-xs'
                            : task.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-xs'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs'
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-600">{task.asset}</div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-slate-500">Due: {task.dueDate}</div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
