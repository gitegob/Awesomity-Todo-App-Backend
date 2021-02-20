import { DataTypes } from 'sequelize';
import db from '../config';

const Todoist = db.define(
  'Todoist',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
  },
);
export default Todoist;
