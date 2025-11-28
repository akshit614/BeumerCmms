import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { api } from "../utils/axios";
import { Loader2 } from 'lucide-react';

interface AddWorkOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultAssetId?: string;
  defaultAssetName?: string;
}

export default function AddWorkOrderDialog({ 
  open, 
  onOpenChange,
  defaultAssetId = '',
  defaultAssetName = ''
}: AddWorkOrderDialogProps) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    assetId: defaultAssetId,
    type: '',
    priority: '',
    assigneeName: '',
    dueDate: '',
    description: '',
    notes: '',
    estimatedHours: '',
    location: '',
    category: '',
  });

  // Update asset when dialog opens with a pre-selected asset
  useEffect(() => {
    if (open && defaultAssetId) {
      setFormData(prev => ({ ...prev, assetId: defaultAssetId }));
    }
  }, [open, defaultAssetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.assetId || !formData.type || !formData.priority) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Generate work order ID
    const workOrderId = `WO-${Math.floor(Math.random() * 10000)}`;
    const createdByUserName = localStorage.getItem('username');
    
    // Here you would normally save to a database
    console.log('Creating new work order:', { id: workOrderId, ...formData });

    try {
      setLoading(true);
      const { data } = await api.post('/workorders', { id: workOrderId, ...formData, createdByUserName });
      toast.success(`Work order ${workOrderId} created successfully!`);
      navigate('/dashboard');
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
    
    
    // Reset form and close dialog
    setFormData({
      title: '',
      assetId: defaultAssetId,
      type: '',
      priority: '',
      assigneeName: '',
      dueDate: '',
      description: '',
      notes: '',
      estimatedHours: '',
      location: '',
      category: '',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Work Order</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new maintenance work order.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Work Order Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Replace compressor bearings"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assetId">Asset *</Label>
                {defaultAssetId ? (
                  <Input
                    id="assetId"
                    value={formData.assetId}
                    disabled
                    className="bg-muted"
                  />
                ) : (
                  <Select value={formData.assetId} onValueChange={(value: any) => setFormData({ ...formData, assetId: value })}>
                    <SelectTrigger id="assetId">
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COMP-A-001">Compressor Unit A-1</SelectItem>
                      <SelectItem value="MOTR-B-002">Motor Unit A-1</SelectItem>
                      <SelectItem value="PUMP-B-003">Pump B-3</SelectItem>
                      <SelectItem value="MOTOR-C-002">Motor C-2</SelectItem>
                      <SelectItem value="CONV-D-001">Conveyor D-1</SelectItem>
                      <SelectItem value="HVAC-E-001">HVAC System E-1</SelectItem>
                      <SelectItem value="BOILER-F-001">Boiler F-1</SelectItem>
                      <SelectItem value="CRANE-G-001">Crane G-1</SelectItem>
                      <SelectItem value="CHILLER-H-001">Chiller H-1</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

           
              <div className="space-y-2">
                <Label htmlFor="type">Work Order Type *</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Corrective">Corrective</SelectItem>
                    <SelectItem value="Preventive">Preventive</SelectItem>
                    <SelectItem value="Inspection">Inspection</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select value={formData.priority} onValueChange={(value: any) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignee">Assignee</Label>
                <Input
                  id="assignee"
                  type="text"
                  placeholder="e.g., John Smith"
                  value={formData.assigneeName}
                  onChange={(e) => setFormData({ ...formData, assigneeName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  placeholder="e.g., 4"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Compressors">Compressors</SelectItem>
                    <SelectItem value="Pumps">Pumps</SelectItem>
                    <SelectItem value="Motors">Motors</SelectItem>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Conveyors">Conveyors</SelectItem>
                    <SelectItem value="Boilers">Boilers</SelectItem>
                    <SelectItem value="Cranes">Cranes</SelectItem>
                    <SelectItem value="Chillers">Chillers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g., Building A - Floor 1"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the work to be done..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Notes : Ensure safety and proper documentation"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </Button>
            ) : (
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Create Work Order
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

