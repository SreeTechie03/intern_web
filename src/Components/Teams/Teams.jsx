import React, { useEffect, useState } from 'react';
import { Search, Plus, Trash2, Edit3, Users, Calendar, DollarSign, UserCircle } from 'lucide-react';
import TeamForm from './TeamForm';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeams(data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Failed to load teams');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (formData) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;
      setTeams([data, ...teams]);
      setShowForm(false);
      toast.success('Team created successfully');
    } catch (error) {
      console.error('Error creating team:', error);
      toast.error('Failed to create team');
    }
  };

  const handleUpdateTeam = async (formData) => {
    if (!editingTeam) return;

    try {
      const { data, error } = await supabase
        .from('teams')
        .update(formData)
        .eq('id', editingTeam.id)
        .select()
        .single();

      if (error) throw error;
      setTeams(teams.map((team) => (team.id === editingTeam.id ? data : team)));
      setEditingTeam(null);
      toast.success('Team updated successfully');
    } catch (error) {
      console.error('Error updating team:', error);
      toast.error('Failed to update team');
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!confirm('Are you sure you want to delete this team?')) return;

    try {
      const { error } = await supabase.from('teams').delete().eq('id', teamId);
      if (error) throw error;
      setTeams(teams.filter((team) => team.id !== teamId));
      toast.success('Team deleted successfully');
    } catch (error) {
      console.error('Error deleting team:', error);
      toast.error('Failed to delete team');
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Teams Management</h1>
              <p className="text-gray-600">Manage your teams and track their progress</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              Add Team
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search teams by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading teams...</p>
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No teams found</p>
              <p className="text-gray-500">Try adjusting your search or create a new team</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTeams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-indigo-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTeam(team)}
                        className="text-gray-600 hover:text-indigo-600 p-1 rounded-full hover:bg-indigo-50 transition-colors duration-200"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteTeam(team.id)}
                        className="text-gray-600 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <UserCircle size={20} className="text-indigo-600" />
                      <span className="font-medium">{team.manager}</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600">
                      <Users size={20} className="text-indigo-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                          {team.members.map((member, index) => (
                            <span
                              key={index}
                              className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-sm"
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar size={20} className="text-indigo-600" />
                      <span>
                        {new Date(team.target_month).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <DollarSign size={20} className="text-indigo-600" />
                      <span>₹{team.target_amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(showForm || editingTeam) && (
        <TeamForm
          onSubmit={editingTeam ? handleUpdateTeam : handleCreateTeam}
          onClose={() => {
            setShowForm(false);
            setEditingTeam(null);
          }}
          initialData={editingTeam}
          isEdit={!!editingTeam}
        />
      )}
    </div>
  );
}

export default Teams;