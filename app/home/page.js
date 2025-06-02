"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import AuthForm from "../components/AuthForm";
import styles from "./home.module.css";
import Link from "next/link";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/tasks")
        .then((response) => {
          console.log("Tasks from API:", response.data);
          setTasks(response.data);
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    } else {
      setTasks([]); // limpiar tareas si no está autenticado
    }
  }, [status]);
  
  const handleAuth = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        await axios.post("/api/auth/register", { email, password });
        alert("User registered successfully! Now you can sign in.");

        signIn("credentials", { email, password, redirect: false }).then(
          ({ error }) => {
            if (error) {
              alert("Sign in failed. Please check your credentials.");
            }
          }
        );

        setIsRegistering(false);
      } catch (error) {
        alert("Registration failed: " + error.response.data.message);
      }
    } else {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result.error) {
          alert("Sign in failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error signing in:", error);
        alert("Error signing in.");
      }
    }
  };

  const handleEdit = (task) => {
    localStorage.setItem('editingTask', JSON.stringify(task));
    router.push('/addTask');
  };
  
  const handleDelete = async (taskId) => {
    if (!taskId) {
      alert("No task ID provided.");
      return;
    }

    try {
      await axios.delete(`/api/tasks?taskId=${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task: " + (error.response?.data || error.message));
    }
  };

  const toggleAuthMode = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/home");
  };

  const handleSave = async () => {
    if (!editingTask) return;

    try {
      const response = await axios.put(
        `https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Tasks/${editingTask.id}`,
        editingTask,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? response.data : task
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Error updating task. Try again.");
    }
  };

  return (
    <>
      {status === "authenticated" ? (
        <div className={styles.containerHome}>
          <div className={styles.cA}>
            <h2 className={styles.titleHome}>Dashboard</h2>

            <TaskList
              tasks={tasks}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            {editingTask && (
              <div className={styles.editForm}>
                <h3>Edit Task</h3>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  placeholder="Title"
                />
                <textarea
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            )}
          </div>
          <div className={styles.cB}>
            <Link href="/addTask">
              <button className={styles.buttonOptions}>
                <FontAwesomeIcon className={styles.icon} icon={faPlus} />
                Add New Task
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.authContainer}>
          <AuthForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleAuth={handleAuth}
            isRegistering={isRegistering}
            toggleAuthMode={toggleAuthMode}
          />
        </div>
      )}
    </>
  );
}
