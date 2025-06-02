import { getToken } from 'next-auth/jwt';
import axios from 'axios';

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract taskId from URL if it exists
  const taskId = req.query.taskId;

  switch (req.method) {
    case 'GET':
      try {
        const response = await axios.get(`https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.status(200).json(response.data);
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

    case 'DELETE':
      if (!taskId) {
        return res.status(400).json({ message: 'Task ID is required' });
      }
      try {
        await axios.delete(`https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return res.status(204).end();
      } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Error deleting task' });
      }

    default:
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
