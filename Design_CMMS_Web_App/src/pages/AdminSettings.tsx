import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Trash2, Plus, Shield, Users, Settings, Database } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const users = [
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Technician', status: 'Active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Technician', status: 'Active' },
  { id: 3, name: 'Mike Brown', email: 'mike.b@company.com', role: 'Supervisor', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily.d@company.com', role: 'Manager', status: 'Active' },
  { id: 5, name: 'James Wilson', email: 'james.w@company.com', role: 'Technician', status: 'Inactive' },
];

const categories = [
  { id: 1, name: 'Compressors', assetCount: 15 },
  { id: 2, name: 'Pumps', assetCount: 28 },
  { id: 3, name: 'Motors', assetCount: 42 },
  { id: 4, name: 'HVAC', assetCount: 18 },
  { id: 5, name: 'Conveyors', assetCount: 12 },
  { id: 6, name: 'Boilers', assetCount: 8 },
];

export default function AdminSettings() {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900">Admin Settings</h1>
        <p className="text-slate-600 mt-1">Manage system configuration and users</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Database className="mr-2 h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Industrial Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Industrial Drive, Manufacturing City, ST 12345" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900">Email Notifications</div>
                  <div className="text-sm text-slate-600">Receive email alerts for work orders</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900">PM Reminders</div>
                  <div className="text-sm text-slate-600">Get reminders for scheduled maintenance</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900">Critical Alerts</div>
                  <div className="text-sm text-slate-600">Immediate notifications for critical issues</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900">Daily Reports</div>
                  <div className="text-sm text-slate-600">Receive daily summary reports</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Order Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="autoAssign">Auto-Assignment</Label>
                  <Select defaultValue="enabled">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Default Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>User Management</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Name</th>
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Email</th>
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Role</th>
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Status</th>
                      <th className="text-left py-3 px-4 text-slate-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-sm text-slate-900">{user.name}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{user.email}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{user.role}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="default"
                            className={
                              user.status === 'Active'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Asset Categories</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-slate-900">{category.name}</div>
                          <div className="text-sm text-slate-600 mt-1">
                            {category.assetCount} assets
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900">Require Password Change</div>
                  <div className="text-sm text-slate-600">Force password change every 90 days</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900">Two-Factor Authentication</div>
                  <div className="text-sm text-slate-600">Require 2FA for all users</div>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minLength">Minimum Password Length</Label>
                <Input id="minLength" type="number" defaultValue="8" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="30" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900">Auto-Logout on Inactivity</div>
                  <div className="text-sm text-slate-600">Automatically log out inactive users</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border border-slate-200 rounded-lg text-sm">
                  <div>
                    <div className="text-slate-900">User login: john.smith@company.com</div>
                    <div className="text-slate-600">2024-11-06 14:32:15</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border border-slate-200 rounded-lg text-sm">
                  <div>
                    <div className="text-slate-900">Settings updated by admin</div>
                    <div className="text-slate-600">2024-11-06 10:15:42</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border border-slate-200 rounded-lg text-sm">
                  <div>
                    <div className="text-slate-900">New user created: emily.d@company.com</div>
                    <div className="text-slate-600">2024-11-05 16:22:10</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Security Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
