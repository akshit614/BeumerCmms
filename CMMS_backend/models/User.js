import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'Username' // Maps to the existing column name in the database
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'Email',
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Password'
  },
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
  tableName: 'Users', // Match your existing table name
  timestamps: true,
  // Disable automatic timestamp fields if your database doesn't have them
  // timestamps: false
});


export default User;
