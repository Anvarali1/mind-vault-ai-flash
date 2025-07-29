import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Deck {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  createdAt: string;
  color: string;
}

interface Flashcard {
  id: string;
  deckId: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  nextReview?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  decks: Deck[];
  setDecks: (decks: Deck[]) => void;
  flashcards: Flashcard[];
  setFlashcards: (flashcards: Flashcard[]) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addDeck: (deck: Omit<Deck, 'id' | 'createdAt'>) => void;
  addFlashcard: (card: Omit<Flashcard, 'id'>) => void;
  updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  deleteFlashcard: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const isAuthenticated = !!user;

  // Load demo data
  useEffect(() => {
    const demoDecks: Deck[] = [
      {
        id: '1',
        name: 'Biology Basics',
        description: 'Essential biology concepts and terms',
        cardCount: 12,
        createdAt: '2024-01-15',
        color: 'bg-gradient-to-br from-green-400 to-emerald-600'
      },
      {
        id: '2',
        name: 'JavaScript Fundamentals',
        description: 'Core JavaScript concepts for beginners',
        cardCount: 8,
        createdAt: '2024-01-10',
        color: 'bg-gradient-to-br from-yellow-400 to-orange-600'
      },
      {
        id: '3',
        name: 'World History',
        description: 'Important historical events and dates',
        cardCount: 15,
        createdAt: '2024-01-05',
        color: 'bg-gradient-to-br from-purple-400 to-pink-600'
      }
    ];

    const demoCards: Flashcard[] = [
      {
        id: '1',
        deckId: '1',
        question: 'What is photosynthesis?',
        answer: 'The process by which plants convert light energy into chemical energy',
        difficulty: 'medium'
      },
      {
        id: '2',
        deckId: '1',
        question: 'What is DNA?',
        answer: 'Deoxyribonucleic acid - the hereditary material in humans and almost all other organisms',
        difficulty: 'easy'
      },
      {
        id: '3',
        deckId: '2',
        question: 'What is a closure in JavaScript?',
        answer: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has finished executing',
        difficulty: 'hard'
      }
    ];

    setDecks(demoDecks);
    setFlashcards(demoCards);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - accept any email/password
    if (email && password) {
      setUser({
        id: '1',
        name: email.split('@')[0],
        email: email
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addDeck = (deck: Omit<Deck, 'id' | 'createdAt'>) => {
    const newDeck: Deck = {
      ...deck,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      cardCount: 0
    };
    setDecks(prev => [...prev, newDeck]);
  };

  const addFlashcard = (card: Omit<Flashcard, 'id'>) => {
    const newCard: Flashcard = {
      ...card,
      id: Date.now().toString()
    };
    setFlashcards(prev => [...prev, newCard]);
    
    // Update deck card count
    setDecks(prev => prev.map(deck => 
      deck.id === card.deckId 
        ? { ...deck, cardCount: deck.cardCount + 1 }
        : deck
    ));
  };

  const updateFlashcard = (id: string, updates: Partial<Flashcard>) => {
    setFlashcards(prev => prev.map(card =>
      card.id === id ? { ...card, ...updates } : card
    ));
  };

  const deleteFlashcard = (id: string) => {
    const card = flashcards.find(c => c.id === id);
    if (card) {
      setFlashcards(prev => prev.filter(c => c.id !== id));
      setDecks(prev => prev.map(deck => 
        deck.id === card.deckId 
          ? { ...deck, cardCount: Math.max(0, deck.cardCount - 1) }
          : deck
      ));
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      decks,
      setDecks,
      flashcards,
      setFlashcards,
      isAuthenticated,
      login,
      logout,
      addDeck,
      addFlashcard,
      updateFlashcard,
      deleteFlashcard
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}