import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      
      // Check if user is already authenticated
      if (authService.isAuthenticated() && !authService.isTokenExpired()) {
        const storedUser = authService.getUser();
        if (storedUser) {
          setUser(storedUser);
        } else {
          // Try to get fresh user data from API
          await refreshUserProfile();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      authService.clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async () => {
    try {
      const response = await authService.getProfile();
      const userData = response.data.user;
      setUser(userData);
      authService.setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user profile:', error);
      authService.clearAuth();
      setUser(null);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login(email, password);
      const { user: userData, token } = response.data;

      // Save auth data
      authService.setToken(token);
      authService.setUser(userData);
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.register(userData);
      const { user: newUser, token } = response.data;

      // Save auth data
      authService.setToken(token);
      authService.setUser(newUser);
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.updateProfile(profileData);
      const updatedUser = response.data.user;

      // Update user data
      authService.setUser(updatedUser);
      setUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);

      await authService.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
