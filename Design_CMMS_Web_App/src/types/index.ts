export interface Asset {
    id: string;
    name: string;
    category: string;
    model: string | null;
    serialNumber: string | null;
    manufacturer: string | null;
    location: string;
    status: string | null;
    installationDate: string | null;
    warrantyExpiration: string | null;
    lastMaintenance: string | null;
    nextMaintenance: string | null;
    maintenanceFrequency: number | null;
    description: string | null;
    specifications: string | null;
    notes: string | null;
    qrCode: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface WorkOrder {
    id: string;
    title: string;
    assetId: string;
    type: string | null;
    status: string | null;
    priority: string | null;
    assigneeUserId: number | null;
    assigneeName: string | null;
    createdByUserId: number | null;
    createdByUserName: string | null;
    supervisorUserId: number | null;
    description: string | null;
    assignedTo: string | null;
    dueDate: string | null;
    estimatedHours: number | null;
    workNotes: string | null;
    location: string | null;
    category: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface user {
    id: number;
    username: string;
    email: string;
    createdAt: string | null;
    updatedAt: string | null;
}


export interface MaintenanceHistory {
  id: string;
  createdAt: string;
  type: string;
  assigneeName: string;
  estimatedHours: number;
  status: string;
}

export interface recentWorkOrders {
    id: string;
    assetId: string;
    priority: string;
    status: string;
    assigneeName: string;
}
