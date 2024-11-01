// src/app/components/DatabaseList.js

import React, { useState, useEffect } from 'react';

const DatabaseList = ({ databaseDetails, setDatabaseDetails }) => {
  const [editableField, setEditableField] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  const handleEditClick = (tableName, columnName) => {
    setEditableField({ tableName, columnName });
    setEditedValue(columnName); // Set the value to the current column name
  };

  useEffect(() => {
    console.log(databaseDetails);
  }, [databaseDetails]);

  const handleSubmit = (tableName, columnName) => {
    const updatedDatabaseDetails = databaseDetails.map(db => {
      return {
        ...db,
        tables: db.tables.map(table => {
          if (table.name === tableName) {
            return {
              ...table,
              columns: table.columns.map(column => {
                if (column.name === columnName) {
                  return { ...column, name: editedValue }; // Update column name
                }
                return column;
              }),
            };
          }
          return table;
        }),
      };
    });

    setDatabaseDetails(updatedDatabaseDetails);
    setEditableField(null); // Close the editing mode
  };

  return (
    <div className="fixed right-0 top-0 h-full bg-secondary text-white p-6 w-[19%] shadow-lg overflow-y-auto">
      {databaseDetails.map(db => (
        <div key={db.name} className="mb-6 border border-black rounded-lg p-4">
          <h3 className="text-3xl font-bold text-primary-100 mb-2">{db.name}</h3>
          {db.tables.map(table => (
            <div key={table.name} className="mb-4 border border-white rounded-md p-3 bg-secondary-400">
              <h4 className="text-l font-semibold text-white mb-2">{table.name}</h4>
              <div className="space-y-2">
                {table.columns.map(column => (
                  <div key={column.name} className="flex justify-between items-center text-sm">
                    {editableField && editableField.columnName === column.name && editableField.tableName === table.name ? (
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                          className="bg-secondary-600 text-black p-1 rounded outline- w-[90%]"
                        />
                        <button onClick={() => handleSubmit(table.name, column.name)} className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded">
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between w-full">
                        <span className="italic text-gray-300">{column.name}</span>
                        <span className="text-gray-400">{column.dataType}</span>
                        <button onClick={() => handleEditClick(table.name, column.name)} className="text-blue-400 hover:text-blue-300">
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DatabaseList;
