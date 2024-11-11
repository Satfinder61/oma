import { getUserIdFromCookies } from "../lib/auth";
import TaskColumn from "../components/TaskColumn";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home({ authenticated, initialTasks }) {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    if (!authenticated) {
      router.replace("/login");
    }
  }, [authenticated, router]);

  const addTask = async () => {
    if (taskTitle.trim() === "") return;

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: taskTitle }),
      });

      if (res.status === 201) {
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
        setTaskTitle("");
      } else {
        const data = await res.json();
        alert(data.message || "Görev eklenemedi.");
      }
    } catch (error) {
      console.error(error);
      alert("Görev eklenirken bir hata oluştu.");
    }
  };

  const moveTask = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.status === 200) {
        const updatedTask = await res.json();
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      } else {
        const data = await res.json();
        alert(data.message || "Görev güncellenemedi.");
      }
    } catch (error) {
      console.error(error);
      alert("Görev güncellenirken bir hata oluştu.");
    }
  };

  const deleteTask = async (id) => {
    if (confirm("Bu görevi silmek istediğinizden emin misiniz?")) {
      try {
        const res = await fetch(`/api/tasks/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        if (res.status === 200) {
          setTasks(tasks.filter((task) => task.id !== id));
        } else {
          const data = await res.json();
          alert(data.message || "Görev silinemedi.");
        }
      } catch (error) {
        console.error(error);
        alert("Görev silinirken bir hata oluştu.");
      }
    }
  };

  const updateTask = async (id, updatedTaskData) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedTaskData),
      });

      if (res.status === 200) {
        const updatedTask = await res.json();
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      } else {
        const data = await res.json();
        alert(data.message || "Görev güncellenemedi.");
      }
    } catch (error) {
      console.error(error);
      alert("Görev güncellenirken bir hata oluştu.");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 200) {
        router.push("/login");
      } else {
        alert("Çıkış yapılamadı.");
      }
    } catch (error) {
      console.error(error);
      alert("Çıkış yapılırken bir hata oluştu.");
    }
  };

  const toDoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-6xl flex justify-center items-center mb-4">
        <h1 className="text-4xl font-bold">OMA's Issue Chasing System</h1>
      </div>

      <div className="flex justify-center mb-6 w-full max-w-3xl space-x-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Yeni görev ekleyin..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={addTask}
        >
          Ekle
        </button>
      </div>

      <div className="flex space-x-4 w-full max-w-6xl">
        <TaskColumn
          title="Üstümüzdeki İşler"
          tasks={toDoTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
        <TaskColumn
          title="Başlanan İşler"
          tasks={inProgressTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
        <TaskColumn
          title="Tamamlanan İşler"
          tasks={doneTasks}
          moveTask={moveTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>

      <button
        className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        onClick={handleLogout}
      >
        Çıkış Yap
      </button>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const userId = getUserIdFromCookies(req);

  if (!userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  const tasks = await prisma.task.findMany({
    where: { userId },
  });

  return {
    props: {
      authenticated: true,
      initialTasks: tasks,
    },
  };
}
