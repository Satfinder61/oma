
import React, { useState } from 'react';

const TaskCard = ({ task, moveTask, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleUpdate = () => {
    if (editedTitle.trim() === '') {
      alert('Görev Başlığı boş olamaz.');
      return;
    }

    updateTask(task.id, {
      title: editedTitle.trim(),
      status: editedStatus,
    });

    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            className="border p-2 rounded"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Görev Başlığı"
          />
          <select
            className="border p-2 rounded"
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <div className="flex space-x-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              onClick={handleUpdate}
            >
              Kaydet
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition"
              onClick={() => setIsEditing(false)}
            >
              İptal
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg text-blue-600">#{task.issueNumber}</p> {/* Issue numarasını göster */}
              <p className="mt-1">{task.title}</p>
            </div>
            <div className="flex space-x-2">
              {task.status !== 'To Do' && (
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => moveTask(task.id, 'To Do')}
                >
                  To Do
                </button>
              )}
              {task.status !== 'In Progress' && (
                <button
                  className="text-yellow-500 hover:underline"
                  onClick={() => moveTask(task.id, 'In Progress')}
                >
                  In Progress
                </button>
              )}
              {task.status !== 'Done' && (
                <button
                  className="text-green-500 hover:underline"
                  onClick={() => moveTask(task.id, 'Done')}
                >
                  Done
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex space-x-2 justify-end">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              onClick={() => setIsEditing(true)}
            >
              Güncelle
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              onClick={() => deleteTask(task.id)}
            >
              Sil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
