"use client";

import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../lib/api';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Card } from '../../../components/Card';
import { Save } from 'lucide-react';

const MOODS = ['Calm', 'Radiant', 'Reflective', 'Tired', 'Focused', 'Anxious', 'Happy'];

export default function JournalPage() {
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [entryId, setEntryId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const fetchTodayEntry = useCallback(async () => {
    try {
      const response = await api.get('/entries');
      const todayStr = new Date().toLocaleDateString('en-US');
      
      const todayEntry = response.data.entries.find((e: any) => {
        return new Date(e.created_at).toLocaleDateString('en-US') === todayStr;
      });
      
      if (todayEntry) {
        setContent(todayEntry.content);
        setIsPublic(todayEntry.is_public === 1);
        setMood(todayEntry.mood || null);
        setLocation(todayEntry.location || '');
        setEntryId(todayEntry.id);
      } else {
        setContent('');
        setIsPublic(false);
        setMood(null);
        setLocation('');
        setEntryId(null);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTodayEntry();
  }, [fetchTodayEntry]);

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsSaving(true);
    setMessage('');
    
    try {
      if (entryId) {
        await api.put(`/entries/${entryId}`, { content, is_public: isPublic, mood, location });
        setMessage('ENTRY SUCCESSFULLY UPDATED.');
      } else {
        const response = await api.post('/entries', { content, is_public: isPublic, mood, location });
        setEntryId(response.data.entry.id);
        setMessage('NEW ENTRY SAVED TO DATABASE.');
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error(error);
      setMessage(`ERROR: ${error.response?.data?.error || 'Failed to save'}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-0">
      
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-2 border-b-2 border-black pb-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">System Log Entry</h2>
          <p className="text-secondary font-bold uppercase text-sm tracking-widest mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {message && (
          <div className="bg-black text-white px-4 py-2 font-bold uppercase text-xs tracking-widest self-start sm:self-auto">
            {message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-2 order-1">
          <label className="text-sm font-bold uppercase tracking-widest block">Entry Content</label>
          <textarea
            className="w-full h-96 border-2 border-black p-4 font-body focus:outline-none focus:shadow-brutal-md focus:-translate-y-0.5 focus:-translate-x-0.5 transition-none resize-y"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="BEGIN LOGGING..."
          />
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6 lg:col-start-3 lg:row-start-1 lg:row-span-2 order-2">
          <Card compact className="space-y-6">
            
            {/* Mood Selector */}
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest block border-b-2 border-black pb-2">Status Parameter (Mood)</label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map(m => (
                  <button
                    key={m}
                    onClick={() => setMood(m === mood ? null : m)}
                    className={`border-2 border-black px-3 py-1 font-bold uppercase text-xs tracking-wider focus:outline-2 focus:outline-black focus:outline-offset-2 ${
                      mood === m 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest block border-b-2 border-black pb-2">Coordinates (Location)</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="SECTOR / CITY"
              />
            </div>

            {/* Visibility */}
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest block border-b-2 border-black pb-2">Visibility Protocol</label>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`w-full flex items-center justify-between border-2 border-black p-3 font-bold uppercase text-sm tracking-widest focus:outline-2 focus:outline-black focus:outline-offset-2 ${
                  isPublic ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <span>{isPublic ? 'Public Record' : 'Encrypted (Private)'}</span>
                <div className={`w-4 h-4 border-2 ${isPublic ? 'border-white bg-white' : 'border-black bg-transparent'}`} />
              </button>
            </div>

          </Card>
        </div>

        {/* Main Editor Button */}
        <div className="lg:col-span-2 order-3">
          <Button 
            className="w-full flex gap-2" 
            onClick={handleSave} 
            disabled={isSaving || !content.trim()}
          >
            <Save size={20} />
            {isSaving ? 'Processing...' : entryId ? 'Update Existing Entry' : 'Commit New Entry'}
          </Button>
        </div>

      </div>
    </div>
  );
}
