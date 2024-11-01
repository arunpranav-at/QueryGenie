"use client";
import React, { useState } from 'react';

const DatabasePopup = ({ onClose, onSubmit }) => {
  const [dbName, setDbName] = useState('');
  const [numTables, setNumTables] = useState(0);
  const [tables, setTables] = useState([]);
  const DATA_TYPES = [
    'INT', 'FLOAT', 'DECIMAL', 'CHAR', 'VARCHAR', 
    'TEXT', 'DATE', 'DATETIME', 'TIMESTAMP', 
    'TIME', 'YEAR', 'BLOB', 'ENUM', 'SET'
  ];

  const handleTableChange = (index, key, value) => {
    const newTables = [...tables];
    if (key === 'columns') {
      // Ensure columns is initialized
      newTables[index].columns = newTables[index].columns || [];

      // Update the specific column at colIndex
      const colIndex = value.colIndex; // The index of the column being updated
      const columnValue = value.data; // The new data for the column (name or type)

      // If it is a name change, update the name
      if (value.type === 'name') {
        newTables[index].columns[colIndex] = {
          ...newTables[index].columns[colIndex],
          name: columnValue,
        };
      } else { // It must be a type change
        newTables[index].columns[colIndex] = {
          ...newTables[index].columns[colIndex],
          type: columnValue,
        };
      }
    } else {
      newTables[index] = { ...newTables[index], [key]: value };
    }
    setTables(newTables);
  };

  const handleSubmit = () => {
    const dbDetails = {
      name: dbName,
      tables: tables.map(table => ({
        name: table.name,
        columns: (table.columns || []).map(column => ({
          name: column.name || '', // Ensure name is initialized
          type: column.type || '' // Ensure type is initialized
        }))
      }))
    };
    onSubmit([dbDetails]); // Wrap in an array to match expected format
    onClose();
  };

  const handleNumTablesChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumTables(count);
    const newTables = Array.from({ length: count }, (_, i) => ({
      name: '',
      numColumns: 0,
      columns: [] // Initialize columns as an empty array
    }));
    setTables(newTables);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-primary p-6 rounded shadow-lg w-[50%] h-auto max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl mb-4">Database Details</h2>
        <label>
          Database Name:
          <input
            type="text"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
            className="block border border-gray-300 rounded p-2 mb-4 w-full text-black"
          />
        </label>
        <label>
          Number of Tables:
          <input
            type="number"
            value={numTables}
            onChange={handleNumTablesChange}
            className="block border border-gray-300 rounded p-2 mb-4 w-full text-black"
          />
        </label>
        
        {Array.from({ length: numTables }).map((_, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold">Table {index + 1}</h3>
            <label>
              Table Name:
              <input
                type="text"
                value={tables[index]?.name}
                onChange={(e) => handleTableChange(index, 'name', e.target.value)}
                className="block border border-gray-300 rounded p-2 mb-2 w-full text-black"
              />
            </label>
            <label>
              Number of Columns:
              <input
                type="number"
                value={tables[index]?.numColumns || 0}
                onChange={(e) => handleTableChange(index, 'numColumns', parseInt(e.target.value, 10))}
                className="block border border-gray-300 rounded p-2 mb-2 w-full text-black"
              />
            </label>
            <div>
              {Array.from({ length: tables[index]?.numColumns || 0 }).map((_, colIndex) => (
                <div key={colIndex} className="mb-2">
                  <label>
                    Column Name:
                    <input
                      type="text"
                      onChange={(e) => handleTableChange(index, 'columns', {
                        colIndex,
                        data: e.target.value,
                        type: 'name'
                      })}
                      className="block border border-gray-300 rounded p-2 mb-1 w-full text-black"
                    />
                  </label>
                  <label>
                    Column Data Type:
                    <select
                      onChange={(e) => handleTableChange(index, 'columns', {
                        colIndex,
                        data: e.target.value,
                        type: 'type'
                      })}
                      className="block border border-gray-300 rounded p-2 mb-1 w-full text-black"
                    >
                      <option value="">Select Data Type</option>
                      {DATA_TYPES.map((dataType) => (
                        <option key={dataType} value={dataType}>
                          {dataType}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
          Submit
        </button>
        <button onClick={onClose} className="bg-gray-300 py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DatabasePopup;
