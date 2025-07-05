import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/Button';

const mockTasks = [
  {
    id: '1',
    title: 'Patient Check-up - Room 205',
    priority: 'high',
    time: '10:00 AM',
    status: 'pending',
    details: 'Check patient vitals and update records'
  },
  {
    id: '2',
    title: 'Medication Administration',
    priority: 'medium',
    time: '11:30 AM',
    status: 'pending',
    details: 'Administer morning medications'
  },
  {
    id: '3',
    title: 'Update Patient Records',
    priority: 'low',
    time: '2:00 PM',
    status: 'completed',
    details: 'Update the medical records of all patients seen today'
  }
];

export function TaskList() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage, if available
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : mockTasks;
  });

  const completeTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    );
    setTasks(updatedTasks);

    // Save updated tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    // Optionally, update localStorage whenever tasks change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-6 rounded-lg shadow-lg ${
            task.status === 'completed'
              ? 'bg-green-50 border-green-200'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div
                className={`mt-1 ${
                  task.status === 'completed'
                    ? 'text-green-500'
                    : task.priority === 'high'
                    ? 'text-red-500'
                    : task.priority === 'medium'
                    ? 'text-yellow-500'
                    : 'text-blue-500'
                }`}
              >
                {task.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <AlertCircle className="w-6 h-6" />
                )}
              </div>
              <div>
                <h4
                  className={`font-semibold text-lg ${
                    task.status === 'completed'
                      ? 'text-gray-600 line-through'
                      : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </h4>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {task.time}
                </div>
                <p className="mt-2 text-gray-500">{task.details}</p>
              </div>
            </div>

            {task.status !== 'completed' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => completeTask(task.id)}
              >
                Complete
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
