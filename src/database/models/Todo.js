import { DataTypes } from 'sequelize';
import db from '../config';
import Todoist from './Todoist';

const Todo = db.define(
  'Todo',
  {
    todoistName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['HIGH', 'MEDIUM', 'LOW']],
      },
      allowNull: false,
    },
  },
  { timestamps: true, updatedAt: 'modifiedAt' },
);

Todo.belongsTo(Todoist, { as: 'todoist', onDelete: 'cascade' });

export default Todo;
