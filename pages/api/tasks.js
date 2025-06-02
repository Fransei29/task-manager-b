import { getToken } from 'next-auth/jwt';
import axios from 'axios';

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const taskId = req.query.taskId;
  console.log("Token completo:", token);
  console.log("Token ID:", token?.id);

  switch (req.method) {
    case 'GET':
      try {
        const response = await axios.get('https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Tasks');
        console.log("Tareas crudas:", response.data);

        // Filtrar tareas que tengan userId y que coincida con token.id
        const userTasks = response.data.filter(
          task => task.userId && String(task.userId) === String(token.id)
        );

        return res.status(200).json(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ message: 'Error fetching tasks' });
      }

    case 'POST':
      try {
        const { title, description, dueDate } = req.body;
        const response = await axios.post('https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Tasks', {
          title,
          description,
          dueDate,
          userId: token.id,
        });
        return res.status(201).json(response.data);
      } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Error creating task' });
      }

    case 'PUT':
      try {
        const { id, newTitle, newDescription, dueDate } = req.body;
        const response = await axios.put(`https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Tasks/${id}`, {
          title: newTitle,
          description: newDescription,
          dueDate,
        });
        return res.status(200).json(response.data);
      } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ message: 'Error updating task' });
      }

    case 'DELETE':
      if (!taskId) {
        return res.status(400).json({ message: 'Task ID is required' });
      }
      try {
        await axios.delete(`https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Tasks/${taskId}`);
        return res.status(204).end();
      } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Error deleting task' });
      }

    default:
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
