import React from 'react';

export default function TaskColumn({ title, tasks, moveTask, deleteTask, updateTask }) {
  const fibonacciPuanlari = [0, 1, 2, 3, 5, 7, 13, 21, 34, 55, 89, 144];

  const handlePuanChange = async (id, newPuan) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ puan: newPuan }),
      });

      if (res.status === 200) {
        const updatedTask = await res.json();
        updateTask(id, updatedTask);
      } else {
        const data = await res.json();
        alert(data.message || 'Puan güncellenemedi.');
      }
    } catch (error) {
      console.error(error);
      alert('Puan güncellenirken bir hata oluştu.');
    }
  };

  const handleMoveBack = (task) => {
    if (task.status === 'In Progress') {
      moveTask(task.id, 'To Do');
    } else if (task.status === 'Done') {
      moveTask(task.id, 'In Progress');
    }
  };

  return (
    <div className="flex flex-col bg-white rounded shadow p-4 w-1/3">
      <h2 className="text-xl font-semibold mb-4 text-center w-full">{title}</h2>
      {tasks.map(task => (
        <div
          key={task.id}
          className="mb-2 p-2 border rounded flex flex-col md:flex-row justify-between items-start md:items-center w-full"
        >
          <div className="w-full md:w-2/3 flex-1 overflow-hidden">
            <p className="font-medium break-words max-w-full" title={task.title}>{task.title}</p>
            <p className="text-sm text-gray-500">Issue: {task.issueNumber}</p>
            <p className="text-sm text-gray-500">Puan: {task.puan}</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2 mt-2 md:mt-0 w-full md:w-auto">
            <select
              className="border p-1 rounded text-sm w-full md:w-auto"
              value={task.puan}
              onChange={(e) => handlePuanChange(task.id, parseInt(e.target.value, 10))}
            >
              {fibonacciPuanlari.map(puan => (
                <option key={puan} value={puan}>
                  {puan}
                </option>
              ))}
            </select>

            {title === 'Üstümüzdeki İşler' && (
              <button
                onClick={() => moveTask(task.id, 'In Progress')}
                className="bg-yellow-500 text-white px-2 py-1 text-xs rounded hover:bg-yellow-600 transition mt-2 md:mt-0"
              >
                Başlat
              </button>
            )}
            {title === 'Başlanan İşler' && (
              <button
                onClick={() => moveTask(task.id, 'Done')}
                className="bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-600 transition mt-2 md:mt-0"
              >
                Tamamla
              </button>
            )}
            {(title === 'Başlanan İşler' || title === 'Tamamlanan İşler') && (
              <button
                onClick={() => handleMoveBack(task)}
                className="bg-blue-500 text-white px-2 py-1 text-xs rounded hover:bg-blue-600 transition mt-2 md:mt-0"
              >
                Geri Al
              </button>
            )}
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600 transition mt-2 md:mt-0"
            >
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
