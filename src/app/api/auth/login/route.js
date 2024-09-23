import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User'; 
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to authenticate.' }, { status: 500 });
  }
}
