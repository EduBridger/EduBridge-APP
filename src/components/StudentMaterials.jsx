import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentMaterials = () => {
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('/materials');
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Materials</h2>
      <ul>
        {materials.map((material) => (
          <li key={material.id} className="border p-4 rounded mb-4">
            <h3 className="font-bold">{material.title}</h3>
            <p>{material.description}</p>
            <a
              href={material.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentMaterials;
