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
      const { date } = req.query; // Obtener la fecha de la query (si existe)
      let tasks;

      if (date) {
        // Si se proporciona una fecha, filtrar las tareas para ese día
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0); // Establecer el inicio del día

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); // Establecer el final del día

        tasks = await Task.findAll({
          where: {
            UserId: user.id,
            dueDate: {
              [Op.between]: [startOfDay, endOfDay], // Buscar tareas entre el inicio y el final del día
            },
          },
        });
      } else {
        // Si no se proporciona una fecha, obtener todas las tareas
        tasks = await Task.findAll({ where: { UserId: user.id } });
      }

      return res.status(200).json(tasks);

    case 'POST':
      const { title, description, dueDate } = req.body;                            // Create a new task for the authenticated user
      const newTask = await Task.create({ title, description, UserId: user.id, dueDate });
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
