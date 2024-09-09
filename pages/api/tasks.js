// pages/api/tasks.js
import { getToken } from 'next-auth/jwt';
import { Task, User } from '../../lib/models'; // Import the consolidated models

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findByPk(token.id);

  switch (req.method) {
    case 'GET':
      // Fetch all tasks for the authenticated user
      const tasks = await Task.findAll({ where: { UserId: user.id } });
      return res.status(200).json(tasks);

    case 'POST':
      // Create a new task for the authenticated user
      const { title, description } = req.body;
      const newTask = await Task.create({ title, description, UserId: user.id });
      return res.status(201).json(newTask);

    case 'PUT': // Update a task for the authenticated user
      const { id, newTitle, newDescription } = req.body;
      const taskToUpdate = await Task.findOne({ where: { id, UserId: user.id } });

      if (!taskToUpdate) return res.status(404).json({ message: 'Task not found' });

      // Update task details
      taskToUpdate.title = newTitle;
      taskToUpdate.description = newDescription;
      await taskToUpdate.save();
      return res.status(200).json(taskToUpdate);

    case 'DELETE': // Handle DELETE requests for tasks
      const { taskId } = req.body; // Receive the task ID to delete
      const taskToDelete = await Task.findOne({ where: { id: taskId, UserId: user.id } });

      if (!taskToDelete) return res.status(404).json({ message: 'Task not found' });

      await taskToDelete.destroy();
      return res.status(204).end(); // No content response for successful deletion

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']); // Ensure DELETE is included
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
