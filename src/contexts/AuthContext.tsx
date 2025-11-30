import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock users database for demo purposes
  const mockUsers = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@platform.com',
      userType: 'admin',
      password: 'admin123'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@host.com',
      userType: 'host',
      password: 'host123'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@tourist.com',
      userType: 'tourist',
      password: 'tourist123'
    },
    {
      id: '4',
      name: 'Elena Rodriguez',
      email: 'elena@guide.com',
      userType: 'guide',
      password: 'guide123'
    }
  ];

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const newUser = {
        id: (mockUsers.length + 1).toString(),
        name: userData.name,
        email: userData.email,
        userType: userData.userType
      };

      // Add to mock database
      mockUsers.push({ ...newUser, password: userData.password });
      
      setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      logout,
      error,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
}