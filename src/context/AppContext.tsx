import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Booking, Review, users as initialUsers, bookings as initialBookings, reviews as initialReviews } from '../data/mockData';

interface AppState {
  currentUser: User | null;
  users: User[];
  bookings: Booking[];
  reviews: Review[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'turista' | 'bodega') => boolean;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>(initialUsers);
  const [bookingsList, setBookingsList] = useState<Booking[]>(initialBookings);
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);

  const login = (email: string, password: string): boolean => {
    const user = usersList.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => setCurrentUser(null);

  const register = (name: string, email: string, password: string, role: 'turista' | 'bodega'): boolean => {
    if (usersList.find(u => u.email === email)) return false;
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      role,
    };
    setUsersList([...usersList, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `b${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBookingsList([...bookingsList, newBooking]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookingsList(bookingsList.map(b => b.id === id ? { ...b, status } : b));
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviewsList([...reviewsList, newReview]);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users: usersList,
      bookings: bookingsList,
      reviews: reviewsList,
      login,
      logout,
      register,
      addBooking,
      updateBookingStatus,
      addReview,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
