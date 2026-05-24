import React, { createContext, useState, useContext, useEffect } from 'react';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  // 1. Initialize Coaches Table
  const [coaches, setCoaches] = useState(() => {
    const saved = localStorage.getItem('maharat_coaches_db');
    if (saved) return JSON.parse(saved);

    // Dynamic high-quality defaults
    return [
      {
        id: '1',
        name: 'Coach Abu Rayan',
        role: 'Head Technical Director',
        email: 'aburayan@maharat.com',
        phone: '+966 50 739 8888',
        groups: 'Foundation & Elite Paths (Ages 4-7 / 13-18)',
        slots: ['Sun / Tue 4:00 PM', 'Sun / Tue 6:30 PM'],
        isDirector: true
      },
      {
        id: '2',
        name: 'Coach Saleh Al-Shehri',
        role: 'Tactical Head Coach',
        email: 'saleh@maharat.com',
        phone: '+966 55 123 4567',
        groups: 'Intermediate Development (Ages 8-12)',
        slots: ['Mon / Wed 4:30 PM'],
        isDirector: false
      },
      {
        id: '3',
        name: 'Coach Khalid Al-Ghamdi',
        role: 'Elite Fitness Trainer',
        email: 'khalid@maharat.com',
        phone: '+966 53 987 6543',
        groups: 'Elite Athletic Conditioning & Injury Prevention',
        slots: ['Thu 4:00 PM', 'Sat 9:00 AM'],
        isDirector: false
      }
    ];
  });

  // 2. Initialize Players Table
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('maharat_players_db');
    if (saved) return JSON.parse(saved);

    // Dynamic high-quality defaults
    return [
      {
        id: '1',
        name: 'Fahad Al-Otaibi',
        age: '9',
        program: 'intermediate',
        coachId: '1',
        duration: '3',
        price: '1200',
        phone: '0507391111',
        status: 'paid',
        registrationDate: '2026-05-10T12:00:00Z'
      },
      {
        id: '2',
        name: 'Nawaf Al-Harbi',
        age: '6',
        program: 'foundation',
        coachId: '1',
        duration: '1',
        price: '450',
        phone: '0555555555',
        status: 'paid',
        registrationDate: '2026-05-18T10:00:00Z'
      },
      {
        id: '3',
        name: 'Khalid Bin Sultan',
        age: '14',
        program: 'advanced',
        coachId: '3',
        duration: '6',
        price: '2200',
        phone: '0539999999',
        status: 'pending',
        registrationDate: '2026-05-22T08:30:00Z'
      },
      {
        id: '4',
        name: 'Abdullah Al-Sari',
        age: '11',
        program: 'intermediate',
        coachId: '2',
        duration: '3',
        price: '1200',
        phone: '0567777777',
        status: 'paid',
        registrationDate: '2026-05-23T14:20:00Z'
      },
      {
        id: '5',
        name: 'Saad Al-Qahtani',
        age: '15',
        program: 'advanced',
        coachId: '1',
        duration: '1',
        price: '500',
        phone: '0543210987',
        status: 'pending',
        registrationDate: '2026-05-24T09:00:00Z'
      }
    ];
  });

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('maharat_coaches_db', JSON.stringify(coaches));
  }, [coaches]);

  useEffect(() => {
    localStorage.setItem('maharat_players_db', JSON.stringify(players));
  }, [players]);

  // --- Players CRUD Engine ---
  const addPlayer = (playerData) => {
    const newPlayer = {
      id: String(Date.now()),
      registrationDate: new Date().toISOString(),
      ...playerData
    };
    setPlayers(prev => [newPlayer, ...prev]);
    return { success: true, player: newPlayer };
  };

  const updatePlayer = (id, updatedData) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    return { success: true };
  };

  const deletePlayer = (id) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    return { success: true };
  };

  // --- Coaches CRUD Engine ---
  const addCoach = (coachData) => {
    const newCoach = {
      id: String(Date.now()),
      isDirector: false,
      ...coachData
    };
    setCoaches(prev => [...prev, newCoach]);
    return { success: true, coach: newCoach };
  };

  const updateCoach = (id, updatedData) => {
    setCoaches(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    return { success: true };
  };

  const deleteCoach = (id) => {
    // 1. Delete the coach
    setCoaches(prev => prev.filter(c => c.id !== id));
    
    // 2. Referential integrity: Unassign this coach from affected players
    setPlayers(prev => prev.map(p => p.coachId === id ? { ...p, coachId: '' } : p));
    return { success: true };
  };

  return (
    <DatabaseContext.Provider value={{
      players,
      coaches,
      addPlayer,
      updatePlayer,
      deletePlayer,
      addCoach,
      updateCoach,
      deleteCoach
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
