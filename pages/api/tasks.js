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
      const tasks = await Task.findAll({ where: { UserId: user.id } });   // Fetch all tasks for the authenticated user
      return res.status(200).json(tasks);

    case 'POST':
      const { title, description } = req.body;                            // Create a new task for the authenticated user
      const newTask = await Task.create({ title, description, UserId: user.id });
      return res.status(201).json(newTask);

    case 'PUT': 
      const { id, newTitle, newDescription } = req.body;                   // Update a task for the authenticated user
      const taskToUpdate = await Task.findOne({ where: { id, UserId: user.id } });

      if (!taskToUpdate) return res.status(404).json({ message: 'Task not found' });

      taskToUpdate.title = newTitle;                                       // Update task details
      taskToUpdate.description = newDescription;
      await taskToUpdate.save();
      return res.status(200).json(taskToUpdate);

    case 'DELETE': 
      const { taskId } = req.body;                                          // Receive the task ID to delete
      const taskToDelete = await Task.findOne({ where: { id: taskId, UserId: user.id } });

      if (!taskToDelete) return res.status(404).json({ message: 'Task not found' });

      await taskToDelete.destroy();
      return res.status(204).end();                                         // No content response for successful deletion

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);             // Ensure DELETE is included
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
