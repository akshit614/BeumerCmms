import { SetStateAction, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Clock, User, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../utils/axios';
import { WorkOrder } from '../types';

export default function WorkOrderDetail() {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [status, setStatus] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorkOrder = async () => {
      if (!id) return;
      try {
        const res = await api.get(`/workorders/${id}`);
        const data: WorkOrder = res.data.data;
        setWorkOrder(data);
        setStatus(data?.status || '');
        console.log('Work order data:', data);
        setNotes(data?.workNotes || '');
      } catch (err) {
        toast.error('Failed to load work order');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkOrder();
  }, [id]);

  const handleEscalate = () => {
    toast.warning('Work order escalated to supervisor');
  };

  const handleComplete = async () => {

    if (!id) return;
    try {
      await api.put(`/workorders/${id}`, { status: 'Completed' });
      toast.success('Work order marked as completed');
      setWorkOrder(prev => prev ? { ...prev, status: 'Completed' } : prev);
    } catch (err) {
      toast.error('Failed to mark work order as completed');
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!id) return;
    try {
      await api.put(`/workorders/${id}`, { status, workNotes: notes });
      toast.success('Work order updated');
      setWorkOrder(prev => prev ? { ...prev, status, workNotes: notes } : prev);
    } catch (err) {
      toast.error('Failed to update work order');
      console.error(err);
    }
  };

  const activityLog = [
    { time: '2024-11-06 14:30', user: 'John Smith', action: 'Updated status to In Progress' },
    { time: '2024-11-06 10:15', user: 'John Smith', action: 'Accepted work order' },
    { time: '2024-11-05 16:45', user: 'System', action: 'Work order assigned to John Smith' },
    { time: '2024-11-05 16:40', user: 'Sarah Manager', action: 'Work order created' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/work-orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-slate-900">Work Order {id}</h1>
            <p className="text-slate-600 mt-1">{workOrder?.title || '—'}</p>
          </div>
          <Badge className={`bg-orange-100 text-orange-800 hover:bg-orange-200`}>
            {workOrder?.priority || '—'} Priority
          </Badge>
          <Badge className={`bg-blue-100 text-blue-800 hover:bg-blue-200`}>
            {status || '—'}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleEscalate}>
            <AlertCircle className="mr-2 h-4 w-4" />
            Escalate
          </Button>
          
          <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Complete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-slate-600">Description</div>
                <div className="text-slate-900 mt-1">
                  {loading ? 'Loading...' : (workOrder?.description || '—')}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-600">Asset</div>
                  <Link to={`/assets/${workOrder?.assetId || ''}`} className="text-blue-600 hover:underline mt-1 block">
                    {workOrder?.assetId || '—'}
                  </Link>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Location</div>
                  <div className="text-slate-900 mt-1">{workOrder?.location || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Work Order Type</div>
                  <div className="text-slate-900 mt-1">{workOrder?.type || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Category</div>
                  <div className="text-slate-900 mt-1">{workOrder?.category || '—'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-700">Status</label>
                <Select value={status} onValueChange={(e : any) => setStatus(e)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-700">Work Notes</label>
                <Textarea
                  placeholder="Add notes about work performed..."
                  value={notes}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                Save Update
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((log, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900">{log.action}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {log.user} • {log.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-slate-600">Assigned To</div>
                <div className="flex items-center mt-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <div className="text-slate-900">{workOrder?.assigneeName || '—'}</div>
                    {/* <div className="text-sm text-slate-600">{workOrder?.assigneeUserId ? `User #${workOrder.assigneeUserId}` : '—'}</div> */}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Created By</div>
                <div className="text-slate-900 mt-1">{workOrder?.createdByUserName ? `${workOrder.createdByUserName}` : '—'}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Supervisor</div>
                <div className="text-slate-900 mt-1">{workOrder?.supervisorUserId ? `User #${workOrder.supervisorUserId}` : '—'}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-slate-400" />
                <div className="flex-1">
                  <div className="text-sm text-slate-600">Created</div>
                  <div className="text-slate-900">{workOrder?.createdAt || '—'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-slate-400" />
                <div className="flex-1">
                  <div className="text-sm text-slate-600">Due Date</div>
                  <div className="text-slate-900">{workOrder?.dueDate || '—'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-slate-400" />
                <div className="flex-1">
                  <div className="text-sm text-slate-600">Estimated Duration</div>
                  <div className="text-slate-900">{workOrder?.estimatedHours != null ? `${workOrder.estimatedHours} hours` : '—'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
