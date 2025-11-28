import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const WorkOrder = sequelize.define('WorkOrder', {
  // Identifier shown in UI like WO-1234
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'WorkOrderID'
  },

  // Title from AddWorkOrderDialog
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Title'
  },

  // Asset linkage (e.g., COMP-A-001)
  assetId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'AssetID',
    references: {
      model: 'Assets',
      key: 'AssetID'
    }
  },

  // Work order type: Corrective, Preventive, Inspection, Emergency
  type: {
    type: DataTypes.ENUM('Corrective', 'Preventive', 'Inspection', 'Emergency'),
    allowNull: false,
    field: 'Type'
  },

  // Priority: Critical, High, Medium, Low
  priority: {
    type: DataTypes.ENUM('Critical', 'High', 'Medium', 'Low'),
    allowNull: false,
    field: 'Priority'
  },

  // Status used across UI flows
  status: {
    type: DataTypes.ENUM('Open', 'In Progress', 'Pending', 'Completed', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Open',
    field: 'Status'
  },

  // Assignment fields (optional user linkage and display name)
  assigneeUserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'AssigneeUserId',
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  
  assigneeName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'AssigneeName'
  },

  // Creator and supervisor (optional)
  createdByUserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'CreatedByUserId',
    references: {
      model: 'Users',
      key: 'id'
    }
  },

  createdByUserName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'CreatedByUserName'
  },

  supervisorUserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'SupervisorUserId',
    references: {
      model: 'Users',
      key: 'id'
    }
  },

  // Dates and estimation
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'DueDate'
  },
  estimatedHours: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'EstimatedHours'
  },

  // Content
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'Description'
  },
  workNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'WorkNotes'
  },

  // Convenience display fields seen in UI
  location: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Location'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Category'
  },

  // Timestamps
  createdAt: {
    type: DataTypes.DATE,
    field: 'CreatedAt',
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'UpdatedAt',
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'WorkOrders',
  timestamps: true,
  indexes: [
    { fields: ['AssetID'], name: 'idx_wo_asset' },
    { fields: ['Status'], name: 'idx_wo_status' },
    { fields: ['Priority'], name: 'idx_wo_priority' },
    { fields: ['DueDate'], name: 'idx_wo_due' }
  ]
});

export default WorkOrder;