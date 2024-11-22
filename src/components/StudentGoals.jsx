import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const StudentGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  // Temporary mock data - replace with API calls later
  useEffect(() => {
    setGoals([
      { id: 1, text: 'Complete all assignments on time', completed: false },
      { id: 2, text: 'Maintain above 85% attendance', completed: true },
      { id: 3, text: 'Achieve GPA of 3.5 or higher', completed: false }
    ]);
  }, []);

  const handleAddGoal = () => {
    if (!newGoal.trim()) return;
    
    const goal = {
      id: Date.now(),
      text: newGoal,
      completed: false
    };
    
    setGoals([...goals, goal]);
    setNewGoal('');
  };

  const handleToggleComplete = (goalId) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
  };

  const handleUpdateGoal = (goalId, newText) => {
    setGoals(goals.map(goal =>
      goal.id === goalId ? { ...goal, text: newText } : goal
    ));
    setEditingGoal(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Academic Goals</h2>

      {/* Add New Goal */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex gap-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter a new goal..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAddGoal}
            className="bg-[rgba(8,42,88,0.9)] text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <FaPlus /> Add Goal
          </button>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map(goal => (
          <div
            key={goal.id}
            className={`bg-white p-4 rounded-lg shadow-md transition-all duration-300 ${
              goal.completed ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
            }`}
          >
            {editingGoal?.id === goal.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editingGoal.text}
                  onChange={(e) => setEditingGoal({ ...editingGoal, text: e.target.value })}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => handleUpdateGoal(goal.id, editingGoal.text)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingGoal(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleComplete(goal.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      goal.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-400 hover:border-green-500'
                    }`}
                  >
                    {goal.completed && <FaCheckCircle className="text-white" />}
                  </button>
                  <span className={`text-lg ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                    {goal.text}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditGoal(goal)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No goals set yet. Add your first goal above!
        </div>
      )}
    </div>
  );
};

export default StudentGoals;
