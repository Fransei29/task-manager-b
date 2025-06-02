import { getToken } from 'next-auth/jwt';
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { taskId } = req.query;

    if (!taskId) {
      return res.status(400).json({ message: 'Task ID is required' });
    }

    if (req.method === 'DELETE') {
      try {
        console.log('Attempting to delete task:', taskId);
        const response = await axios.delete(`https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Delete response:', response.status);
        return res.status(204).end();
      } catch (error) {
        console.error('Error deleting task:', error.response?.data || error.message);
        return res.status(500).json({ 
          message: 'Error deleting task',
          details: error.response?.data || error.message
        });
      }
    }

    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      details: error.message
    });
  }
} 