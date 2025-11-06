import React, { useState } from 'react';
import HorizontalTeamScroll from '../components/HorizontalTeamScroll';
import TeamFilters from '../components/TeamFilters';
import { teamMembers } from '../utils/teamData';
import './css/Profiles.css'

export default function Profiles() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeRole, setActiveRole] = useState('all');

  const filteredMembers = teamMembers.filter(member => {
    const batchMatch = activeFilter === 'all' || member.batch === activeFilter;
    const roleMatch = activeRole === 'all' || member.role === activeRole;
    return batchMatch && roleMatch;
  });

  const batches = ['all', ...Array.from(new Set(teamMembers.map(m => m.batch)))];
  const roles = ['all', 'Media', 'Tech', 'Manager', 'Design'];

  return (
    <div className="profiles-wrapper">
      <TeamFilters 
        batches={batches}
        roles={roles}
        activeFilter={activeFilter}
        activeRole={activeRole}
        setActiveFilter={setActiveFilter}
        setActiveRole={setActiveRole}
      />
      <HorizontalTeamScroll members={filteredMembers} />
    </div>
  );
}