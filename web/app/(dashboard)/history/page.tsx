"use client";

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Trash2, Lock, Globe, MapPin, Smile, Edit2, Save, X } from 'lucide-react';

const MOODS = ['Calm', 'Radiant', 'Reflective', 'Tired', 'Focused', 'Anxious', 'Happy'];

export default function HistoryPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editMood, setEditMood] = useState<string | null>(null);
  const [editLocation, setEditLocation] = useState('');

  const fetchEntries = async () => {
    try {
      const response = await api.get('/entries');
      setEntries(response.data.entries);
    } catch (err) {
      setError('Failed to fetch history logs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('WARNING: PERMANENTLY DELETE THIS RECORD?')) return;
    
    try {
      await api.delete(`/entries/${id}`);
      setEntries(entries.filter(e => e.id !== id));
    } catch (error) {
      console.error(error);
      alert('Failed to delete entry');
    }
  };

  const startEdit = (entry: any) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
    setEditMood(entry.mood || null);
    setEditLocation(entry.location || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
    setEditMood(null);
    setEditLocation('');
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const response = await api.put(`/entries/${id}`, {
        content: editContent,
        mood: editMood,
        location: editLocation
      });
      
      // Update local state with new data
      setEntries(entries.map(e => (e.id === id ? response.data.entry : e)));
      cancelEdit();
    } catch (error) {
      console.error(error);
      alert('Failed to update entry');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <span className="font-bold uppercase tracking-widest animate-pulse">Retrieving Logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-0">
      
      <div className="border-b-2 border-black pb-4">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Archive</h2>
        <p className="text-secondary font-bold uppercase text-sm tracking-widest mt-1">
          Historical System Logs ({entries.length})
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border-2 border-red-900 text-red-900 px-4 py-3 font-bold uppercase">
          {error}
        </div>
      )}

      {entries.length === 0 ? (
        <div className="border-2 border-dashed border-black p-12 text-center">
          <p className="font-bold uppercase tracking-widest text-secondary">No records found in database.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => {
            const dateObj = new Date(entry.created_at.endsWith('Z') ? entry.created_at : entry.created_at + 'Z');
            const dateStr = dateObj.toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric'
            });
            
            const isEditing = editingId === entry.id;

            return (
              <Card key={entry.id} className="flex flex-col gap-4">
                
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-black pb-4 gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black uppercase tracking-widest text-lg">{dateStr}</h3>
                    {!isEditing && (
                      <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs font-bold uppercase tracking-widest text-secondary">
                        <span className="flex items-center gap-1">
                          {entry.is_public === 1 ? <Globe size={14} /> : <Lock size={14} />}
                          {entry.is_public === 1 ? 'PUBLIC' : 'PRIVATE'}
                        </span>
                        {entry.mood && (
                          <span className="flex items-center gap-1">
                            <Smile size={14} /> {entry.mood}
                          </span>
                        )}
                        {entry.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {entry.location}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {!isEditing && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button 
                        onClick={() => startEdit(entry)}
                        className="p-2 border-2 border-transparent hover:border-black text-black transition-none focus:outline-2 focus:outline-black focus:outline-offset-2"
                        title="Edit entry"
                      >
                        <Edit2 size={20} strokeWidth={2.5} />
                      </button>
                      <button 
                        onClick={() => handleDelete(entry.id)}
                        className="p-2 border-2 border-transparent hover:border-black text-black transition-none focus:outline-2 focus:outline-black focus:outline-offset-2"
                        title="Delete entry"
                      >
                        <Trash2 size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                {isEditing ? (
                  <div className="space-y-6 pt-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest">Edit Content</label>
                      <textarea
                        className="w-full h-48 border-2 border-black p-4 font-body focus:outline-none focus:shadow-brutal-md focus:-translate-y-0.5 focus:-translate-x-0.5 transition-none resize-y"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest">Edit Mood</label>
                      <div className="flex flex-wrap gap-2">
                        {MOODS.map(m => (
                          <button
                            key={m}
                            onClick={() => setEditMood(m === editMood ? null : m)}
                            className={`border-2 border-black px-3 py-1 font-bold uppercase text-xs tracking-wider focus:outline-2 focus:outline-black focus:outline-offset-2 ${
                              editMood === m 
                                ? 'bg-black text-white' 
                                : 'bg-white text-black hover:bg-gray-100'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest">Edit Location</label>
                      <Input
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        placeholder="SECTOR / CITY"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t-2 border-black">
                      <Button onClick={() => handleSaveEdit(entry.id)} className="gap-2 w-full sm:w-auto">
                        <Save size={18} /> Update Record
                      </Button>
                      <Button variant="outline" onClick={cancelEdit} className="gap-2 w-full sm:w-auto">
                        <X size={18} /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="font-body whitespace-pre-wrap leading-relaxed pt-2">
                    {entry.content}
                  </div>
                )}
                
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
