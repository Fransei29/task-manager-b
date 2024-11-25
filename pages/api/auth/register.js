import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const response = await axios.post(
        'https://67446b1cb4e2e04abea22276.mockapi.io/api/v1/Users',
        { email, password }
      );

      return res.status(201).json(response.data);
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'Failed to register user' });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
