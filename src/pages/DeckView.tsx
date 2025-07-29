import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Play, Edit, Trash2, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';

export function DeckView() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const { decks, flashcards, deleteFlashcard } = useApp();
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const deck = decks.find(d => d.id === deckId);
  const deckCards = flashcards.filter(card => card.deckId === deckId);

  const filteredCards = difficultyFilter === 'all' 
    ? deckCards 
    : deckCards.filter(card => card.difficulty === difficultyFilter);

  if (!deck) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Deck not found</h2>
          <Button onClick={() => navigate('/decks')}>
            Back to Decks
          </Button>
        </div>
      </Layout>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-600 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/decks')}
            className="glass-card hover-glow"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{deck.name}</h1>
            <p className="text-muted-foreground">{deck.description}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate(`/add-card?deck=${deckId}`)}
              variant="outline"
              className="glass-card border-white/20 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Card
            </Button>
            <Button
              onClick={() => navigate(`/quiz/${deckId}`)}
              className="btn-gradient gap-2"
            >
              <Play className="w-4 h-4" />
              Practice Deck
            </Button>
          </div>
        </div>

        {/* Stats & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{deckCards.length}</div>
              <div className="text-sm text-muted-foreground">Total Cards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{deckCards.filter(c => c.difficulty === 'easy').length}</div>
              <div className="text-sm text-muted-foreground text-green-600">Easy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{deckCards.filter(c => c.difficulty === 'medium').length}</div>
              <div className="text-sm text-muted-foreground text-yellow-600">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{deckCards.filter(c => c.difficulty === 'hard').length}</div>
              <div className="text-sm text-muted-foreground text-red-600">Hard</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary glass-card"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Flashcards Grid */}
        <div className="grid gap-6">
          {filteredCards.map((card) => (
            <Card key={card.id} className="glass-card border-0 hover-glow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">Q: {card.question}</CardTitle>
                    <CardDescription className="text-base">
                      <strong>A:</strong> {card.answer}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge className={getDifficultyColor(card.difficulty)}>
                      {card.difficulty}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/edit-card/${card.id}`)}
                        className="hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteFlashcard(card.id)}
                        className="hover:bg-red-500/20 text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {difficultyFilter === 'all' ? 'No cards yet' : `No ${difficultyFilter} cards`}
            </h3>
            <p className="text-muted-foreground mb-6">
              {difficultyFilter === 'all' 
                ? 'Add your first flashcard to this deck'
                : `Try selecting a different difficulty level`
              }
            </p>
            {difficultyFilter === 'all' && (
              <Button
                onClick={() => navigate(`/add-card?deck=${deckId}`)}
                className="btn-gradient gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Card
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}