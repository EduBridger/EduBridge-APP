import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  const fetchGoals = async () => {
    try {
      const response = await axios.get('/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleAddGoal = async () => {
    try {
      await axios.post('/goals', { goal: newGoal });
      fetchGoals(); // Refresh goals list
      setNewGoal('');
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Personal Goals</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Add a new goal"
          className="border rounded p-2 w-full"
        />
        <button onClick={handleAddGoal} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
          Add Goal
        </button>
      </div>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id} className="border p-4 rounded mb-4">
            {goal.goal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentGoals;
