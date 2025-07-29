import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, Play, BarChart3, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';

export function Dashboard() {
  const { user, decks, flashcards } = useApp();
  const navigate = useNavigate();

  const totalCards = flashcards.length;
  const studiedToday = Math.floor(totalCards * 0.3); // Demo data
  const streakDays = 7; // Demo data

  const recentDecks = decks.slice(0, 3);

  const stats = [
    {
      title: 'Total Cards',
      value: totalCards,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Studied Today',
      value: studiedToday,
      icon: Play,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Streak Days',
      value: streakDays,
      icon: Calendar,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Accuracy',
      value: '87%',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/ai-generator')}
              className="btn-glass gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate with AI
            </Button>
            <Button
              onClick={() => navigate('/add-card')}
              className="btn-gradient gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Flashcard
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card hover-glow border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-card border-0 hover-glow cursor-pointer" onClick={() => navigate('/decks')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                My Decks
              </CardTitle>
              <CardDescription>
                View and manage your flashcard collections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{decks.length}</div>
              <p className="text-sm text-muted-foreground">Active decks</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover-glow cursor-pointer" onClick={() => navigate('/quiz')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Quiz Mode
              </CardTitle>
              <CardDescription>
                Test your knowledge with interactive quizzes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Start</div>
              <p className="text-sm text-muted-foreground">Practice now</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 hover-glow cursor-pointer" onClick={() => navigate('/ai-generator')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Generator
              </CardTitle>
              <CardDescription>
                Create flashcards instantly with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Generate</div>
              <p className="text-sm text-muted-foreground">From any topic</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Decks */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Decks</h2>
            <Button
              variant="ghost"
              onClick={() => navigate('/decks')}
              className="text-primary hover:bg-primary/10"
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentDecks.map((deck) => (
              <Card 
                key={deck.id} 
                className="glass-card border-0 hover-glow cursor-pointer"
                onClick={() => navigate(`/deck/${deck.id}`)}
              >
                <CardHeader>
                  <div className={`w-full h-32 rounded-lg ${deck.color} flex items-center justify-center mb-4`}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{deck.name}</CardTitle>
                  <CardDescription>{deck.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {deck.cardCount} cards
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {deck.createdAt}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Study Streak */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle>Study Streak 🔥</CardTitle>
            <CardDescription>
              Keep your momentum going! You've studied for {streakDays} days in a row.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" 
                  style={{ width: '70%' }}
                />
              </div>
              <span className="text-sm font-medium">7/10 days</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Study 3 more days to reach your weekly goal!
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}