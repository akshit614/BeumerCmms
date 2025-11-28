// import { sequelize } from '../config/db.js';
// import Asset from '../models/Assets.js';

// export const seedInitialData = async () => {
//   try {
//     // Check if we already have assets
//     const count = await Asset.count();
    
//     if (count === 0) {
//       await Asset.bulkCreate([
//         {
//           id: 'COMP-A-001',
//           name: 'Compressor Unit A-1',
//           category: 'Compressors',
//           serialNumber: 'SN-1001',
//           location: 'Building A - Floor 1',
//           status: 'Operational',
//           lastMaintenance: '2024-10-15',
//           nextMaintenance: '2024-12-15',
//           maintenanceFrequency: 60,
//           specifications: 'High capacity compressor with variable speed drive',
//         },
//         {
//           id: 'PUMP-B-003',
//           name: 'Pump B-3',
//           category: 'Pumps',
//           serialNumber: 'SN-1002',
//           location: 'Building B - Floor 2',
//           status: 'Maintenance',
//           lastMaintenance: '2024-11-01',
//           nextMaintenance: '2024-11-20',
//           maintenanceFrequency: 30,
//           specifications: 'High capacity pump with variable speed drive',
//         }
//       ]);
//       console.log('✅ Sample assets created');
//     }
//   } catch (error) {
//     console.error('❌ Error seeding data:', error);
//   }
// };

// seedInitialData();


import { sequelize } from '../config/sequelize.js';
import WorkOrder from '../models/WorkOrders.js';
import Asset from '../models/Assets.js';

export const seedWorkOrders = async () => {
  try {
    // Ensure required assets exist before creating work orders
    const requiredAssets = [
      {
        id: 'COMP-A-001',
        name: 'Compressor Unit A-1',
        category: 'Compressors',
        serialNumber: 'SN-1001',
        location: 'Building A - Floor 1',
        status: 'Operational',
        lastMaintenance: '2024-10-15',
        nextMaintenance: '2024-12-15',
        maintenanceFrequency: 60,
        specifications: 'High capacity compressor with variable speed drive'
      },
      {
        id: 'PUMP-B-003',
        name: 'Pump B-3',
        category: 'Pumps',
        serialNumber: 'SN-1002',
        location: 'Building B - Floor 2',
        status: 'Maintenance',
        lastMaintenance: '2024-11-01',
        nextMaintenance: '2024-11-20',
        maintenanceFrequency: 30,
        specifications: 'High capacity pump with variable speed drive'
      },
      {
        id: 'HVAC-C-002',
        name: 'HVAC Unit C-2',
        category: 'HVAC',
        serialNumber: 'SN-1003',
        location: 'Building C - Floor 3',
        status: 'Operational',
        lastMaintenance: '2024-10-20',
        nextMaintenance: '2024-12-20',
        maintenanceFrequency: 60,
        specifications: 'Commercial HVAC unit'
      }
    ];

    await Promise.all(
      requiredAssets.map((a) =>
        Asset.findOrCreate({ where: { id: a.id }, defaults: a })
      )
    );

    const count = await WorkOrder.count();

    if (count === 0) {
      await WorkOrder.bulkCreate([
        {
          id: 'WO-1001',
          title: 'Replace Compressor Filter',
          assetId: 'COMP-A-001',
          type: 'Preventive',
          priority: 'High',
          status: 'Open',
          assigneeUserId: 1,
          assigneeName: 'John Doe',
          createdByUserId: 2,
          supervisorUserId: 3,
          dueDate: '2025-12-01',
          estimatedHours: 4.0,
          description: 'Scheduled replacement of compressor filter',
          workNotes: 'Ensure safety checks before replacement',
          location: 'Building A - Floor 1',
          category: 'Compressors'
        },
        {
          id: 'WO-1002',
          title: 'Inspect Pump B-3',
          assetId: 'PUMP-B-003',
          type: 'Inspection',
          priority: 'Medium',
          status: 'In Progress',
          assigneeUserId: 2,
          assigneeName: 'Jane Smith',
          createdByUserId: 1,
          supervisorUserId: null,
          dueDate: '2025-11-25',
          estimatedHours: 2.5,
          description: 'Routine inspection of pump performance',
          workNotes: 'Check vibration levels and noise',
          location: 'Building B - Floor 2',
          category: 'Pumps'
        },
        {
          id: 'WO-1003',
          title: 'Emergency Repair on HVAC',
          assetId: 'HVAC-C-002',
          type: 'Emergency',
          priority: 'Critical',
          status: 'Pending',
          assigneeUserId: null,
          assigneeName: null,
          createdByUserId: 1,
          supervisorUserId: 4,
          dueDate: '2025-11-20',
          estimatedHours: 6.0,
          description: 'HVAC unit stopped working, urgent repair required',
          workNotes: 'Coordinate with vendor if needed',
          location: 'Building C - Floor 3',
          category: 'HVAC'
        }
      ]);
      console.log('✅ Sample work orders created');
    }
  } catch (error) {
    console.error('❌ Error seeding work orders:', error);
  }
};

seedWorkOrders();