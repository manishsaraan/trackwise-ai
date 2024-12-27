'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

interface CreateUserParams {
  email: string;
  password: string;
}

export async function createUser({ email, password }: CreateUserParams) {
  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'User already exists' };
    }

    // Hash the password with bcryptjs
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create the new user
     await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name: email.split('@')[0], // Optional: use part of email as initial name
      },
    });

    // Return success without signing in
    return { success: true };
  } catch (error) {
    console.error('Signup error:', error);
    return { error: 'Internal server error' };
  }
}

export async function loginUser({ email, password }: CreateUserParams) {
  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return { error: 'Invalid credentials' };
    }

    // Return success with user data (excluding sensitive information)
    return { 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Internal server error' };
  }
}