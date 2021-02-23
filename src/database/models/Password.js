import { DataTypes } from 'sequelize';
import db from '../config';
import Todoist from './Todoist';

const Password = db.define(
  'Password',
  {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false },
);

Password.belongsTo(Todoist, { as: 'todoist', onDelete: 'cascade' });

export default Password;
