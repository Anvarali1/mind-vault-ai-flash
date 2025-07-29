import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, Play, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';

export function Decks() {
  const { decks, flashcards } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDecks = decks.filter(deck =>
    deck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDeckCardCount = (deckId: string) => {
    return flashcards.filter(card => card.deckId === deckId).length;
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Decks</h1>
            <p className="text-muted-foreground">
              Manage your flashcard collections
            </p>
          </div>
          <Button
            onClick={() => navigate('/add-deck')}
            className="btn-gradient gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Deck
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search decks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary glass-card"
          />
        </div>

        {/* Decks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.map((deck) => (
            <Card key={deck.id} className="glass-card border-0 hover-glow group">
              <CardHeader>
                <div className={`w-full h-32 rounded-lg ${deck.color} flex items-center justify-center mb-4 relative overflow-hidden`}>
                  <BookOpen className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/deck/${deck.id}`);
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white border-0"
                    >
                      <BookOpen className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/quiz/${deck.id}`);
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white border-0"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{deck.name}</CardTitle>
                <CardDescription>{deck.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    {getDeckCardCount(deck.id)} cards
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {deck.createdAt}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/deck/${deck.id}`)}
                    className="flex-1 glass-card border-white/20"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/quiz/${deck.id}`)}
                    className="flex-1 btn-gradient"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Study
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDecks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {searchTerm ? 'No decks found' : 'No decks yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Create your first deck to start learning'
              }
            </p>
            {!searchTerm && (
              <Button
                onClick={() => navigate('/add-deck')}
                className="btn-gradient gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Your First Deck
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}