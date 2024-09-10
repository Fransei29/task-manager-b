import { User } from '../../../lib/models';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });          // Check if the user already exists
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);                    // Hash the user's password

    const newUser = await User.create({ email, password: hashedPassword });  // Create a new user in the database

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
