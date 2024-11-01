// src/app/components/DatabaseList.js

import React, { useState,useEffect} from 'react';

const DatabaseList = ({ databaseDetails }) => {
  const [editableField, setEditableField] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  const handleEditClick = (tableName, columnName, dataType) => {
    setEditableField({ tableName, columnName, dataType });
    setEditedValue(columnName); // Set the value to the current column name
  };
 useEffect(()=>{
    console.log(databaseDetails)
 },[])
  const handleSubmit = (tableName, columnName) => {
    const updatedDatabaseDetails = databaseDetails.map(db => {
      if (db.name === databaseDetails.name) {
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
      }
      return db;
    });

    // Update your state or call a prop function to set the updated database details
    // Example: setDatabaseDetails(updatedDatabaseDetails);
    
    setEditableField(null); // Close the editing mode
  };

  return (
    <div className="fixed right-0 top-0 h-full bg-gray-800 text-white p-4 w-1/6 shadow-lg overflow-y-auto"> {/* Adjust styles here */}
      {databaseDetails.map(db => (
        <div key={db.name} className="mb-4">
          <h3 className="text-xl font-bold">{db.name}</h3>
          {db.tables.map(table => (
            <div key={table.name} className="mb-2">
              <h4 className="text-lg font-semibold">{table.name}</h4>
              {table.columns.map(column => (
                <div key={column.name} className="flex justify-between items-center">
                  {editableField && editableField.columnName === column.name && editableField.tableName === table.name ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                        className="bg-gray-700 text-white p-1 rounded"
                      />
                      <button onClick={() => handleSubmit(table.name, column.name)} className="bg-blue-600 text-white p-1 rounded">
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full">
                      <span>{column.name} {column.dataType}</span>
                      <button onClick={() => handleEditClick(table.name, column.name, column.dataType)} className="text-blue-500">
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DatabaseList;
