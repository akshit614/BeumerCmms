import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Asset = sequelize.define('Asset', {
  // Basic Information
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'AssetID'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'AssetName'
  },
  description: {
    type: DataTypes.TEXT,
    field: 'Description'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Category'
  },
  model: {
    type: DataTypes.STRING,
    field: 'Model'
  },
  serialNumber: {
    type: DataTypes.STRING,
    field: 'SerialNumber',
    unique: true
  },
  manufacturer: {
    type: DataTypes.STRING,
    field: 'Manufacturer'
  },
  
  // Location Information
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Location'
  },
  building: {
    type: DataTypes.STRING,
    field: 'Building'
  },
  floor: {
    type: DataTypes.STRING,
    field: 'Floor'
  },
  room: {
    type: DataTypes.STRING,
    field: 'Room'
  },
  
  // Status Information
  status: {
    type: DataTypes.ENUM('Operational', 'Maintenance', 'Out of Service', 'Retired'),
    allowNull: false,
    defaultValue: 'Operational',
    field: 'Status'
  },
  installationDate: {
    type: DataTypes.DATEONLY,
    field: 'InstallationDate'
  },
  warrantyExpiration: {
    type: DataTypes.DATEONLY,
    field: 'WarrantyExpiration'
  },
  
  // Maintenance Information
  lastMaintenance: {
    type: DataTypes.DATEONLY,
    field: 'LastMaintenanceDate'
  },
  nextMaintenance: {
    type: DataTypes.DATEONLY,
    field: 'NextMaintenanceDate'
  },
  maintenanceFrequency: {
    type: DataTypes.INTEGER, // in days
    field: 'MaintenanceFrequency',
    defaultValue: 30
  },
  
  // Technical Specifications
  specifications: {
    type: DataTypes.STRING(4000),
    allowNull: true,
    field: 'Specifications'
  },
  
  // Additional Metadata
  notes: {
    type: DataTypes.TEXT,
    field: 'Notes'
  },
  qrCode: {
    type: DataTypes.STRING,
    field: 'QRCode'
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
  },
  
  // Relationships (foreign keys will be added by Sequelize)
  // - WorkOrders (one-to-many)
  // - MaintenanceLogs (one-to-many)
  // - Documents (one-to-many)
}, {
  tableName: 'Assets',
  timestamps: true,
  // Enable if you want to use soft deletes
  // paranoid: true,
  
  // Add indexes for better query performance
  indexes: [
    {
      fields: ['Category'],
      name: 'idx_asset_category'
    },
    {
      fields: ['Status'],
      name: 'idx_asset_status'
    },
    {
      fields: ['Location'],
      name: 'idx_asset_location'
    },
    {
      fields: ['NextMaintenanceDate'],
      name: 'idx_asset_next_maintenance'
    }
  ]
});

export default Asset;