import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Plus, Search, Download, Eye, FileText, Video, Image as ImageIcon } from 'lucide-react';

const sops = [
  { 
    id: 'SOP-001', 
    title: 'Compressor Maintenance Procedure', 
    category: 'Compressors', 
    version: '2.1', 
    lastUpdated: '2024-10-15',
    type: 'PDF',
    views: 156
  },
  { 
    id: 'SOP-002', 
    title: 'Pump Installation Guide', 
    category: 'Pumps', 
    version: '1.5', 
    lastUpdated: '2024-09-20',
    type: 'PDF',
    views: 89
  },
  { 
    id: 'SOP-003', 
    title: 'Motor Troubleshooting Steps', 
    category: 'Motors', 
    version: '3.0', 
    lastUpdated: '2024-11-01',
    type: 'Video',
    views: 234
  },
  { 
    id: 'SOP-004', 
    title: 'HVAC System Inspection Checklist', 
    category: 'HVAC', 
    version: '1.2', 
    lastUpdated: '2024-08-10',
    type: 'PDF',
    views: 112
  },
  { 
    id: 'SOP-005', 
    title: 'Conveyor Belt Replacement', 
    category: 'Conveyors', 
    version: '2.0', 
    lastUpdated: '2024-10-25',
    type: 'Video',
    views: 67
  },
  { 
    id: 'SOP-006', 
    title: 'Boiler Safety Procedures', 
    category: 'Boilers', 
    version: '4.1', 
    lastUpdated: '2024-11-05',
    type: 'PDF',
    views: 198
  },
  { 
    id: 'SOP-007', 
    title: 'Emergency Shutdown Protocol', 
    category: 'Safety', 
    version: '3.2', 
    lastUpdated: '2024-10-30',
    type: 'PDF',
    views: 456
  },
  { 
    id: 'SOP-008', 
    title: 'Lubrication Guide', 
    category: 'General', 
    version: '1.8', 
    lastUpdated: '2024-09-15',
    type: 'Document',
    views: 145
  },
];

const sopContent = {
  title: 'Compressor Maintenance Procedure',
  id: 'SOP-001',
  version: '2.1',
  sections: [
    {
      title: '1. Safety Requirements',
      content: `- Ensure unit is powered off and locked out
- Wear appropriate PPE (safety glasses, gloves, steel-toed boots)
- Verify pressure is released from all lines
- Have fire extinguisher readily available`
    },
    {
      title: '2. Required Tools and Materials',
      content: `- Socket set (metric)
- Torque wrench
- Replacement filters (AC-FLT-001)
- Lubricant oil (AC-OIL-002)
- Clean rags
- Parts cleaning solution`
    },
    {
      title: '3. Inspection Steps',
      content: `- Check oil level and quality
- Inspect air filters for debris
- Examine belts for wear or damage
- Check for unusual sounds or vibrations
- Inspect all connections for leaks
- Verify pressure gauges are functioning`
    },
    {
      title: '4. Maintenance Procedures',
      content: `- Replace air filters if dirty or damaged
- Change oil if contaminated or at scheduled interval
- Adjust belt tension if necessary
- Clean cooling fins and exterior surfaces
- Lubricate moving parts as per manufacturer specs
- Tighten all fasteners to specified torque values`
    },
    {
      title: '5. Post-Maintenance Checks',
      content: `- Remove lockout/tagout devices
- Verify all tools are accounted for
- Start compressor and monitor for 10 minutes
- Check for leaks under operating pressure
- Verify proper operating temperature and pressure
- Document all work performed in maintenance log`
    }
  ]
};

export default function SOPLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSOP, setSelectedSOP] = useState<string | null>(null);

  const filteredSOPs = sops.filter(sop =>
    sop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sop.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video className="h-4 w-4" />;
      case 'PDF':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">SOP Library</h1>
          <p className="text-slate-600 mt-1">Standard Operating Procedures and documentation</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Upload SOP
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-slate-600 text-sm">Total SOPs</div>
            <div className="text-slate-900 mt-1">{sops.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-slate-600 text-sm">Categories</div>
            <div className="text-slate-900 mt-1">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-slate-600 text-sm">Total Views</div>
            <div className="text-slate-900 mt-1">1,457</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-slate-600 text-sm">Updated This Month</div>
            <div className="text-slate-900 mt-1">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search SOPs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSOPs.map((sop) => (
              <Card key={sop.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {getTypeIcon(sop.type)}
                    </div>
                    <Badge variant="outline">{sop.category}</Badge>
                  </div>
                  <h3 className="text-slate-900 mb-2">{sop.title}</h3>
                  <div className="text-sm text-slate-600 space-y-1 mb-4">
                    <div>Version {sop.version}</div>
                    <div>Updated: {sop.lastUpdated}</div>
                    <div>{sop.views} views</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedSOP(sop.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredSOPs.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No SOPs found matching your search
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={selectedSOP !== null} onOpenChange={() => setSelectedSOP(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{sopContent.title}</DialogTitle>
            <DialogDescription>
              {sopContent.id} • Version {sopContent.version}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {sopContent.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-slate-900 mb-2">{section.title}</h3>
                <div className="text-slate-700 whitespace-pre-line text-sm bg-slate-50 p-4 rounded-lg">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setSelectedSOP(null)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
