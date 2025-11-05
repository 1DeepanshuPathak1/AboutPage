"use client";
import React from 'react';

const TeamFilters = ({ batches, roles, activeFilter, activeRole, setActiveFilter, setActiveRole, filteredMembersCount }) => {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-3">
            Meet Our Team
          </h2>
          <p className="text-neutral-400">
            {filteredMembersCount} talented individuals across {batches.length - 1} batches
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Batch Filter */}
          <div>
            <label className="text-sm font-medium text-neutral-300 mb-2 block">
              Filter by Batch
            </label>
            <div className="flex flex-wrap gap-2">
              {batches.map(batch => (
                <button
                  key={batch}
                  onClick={() => setActiveFilter(batch)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === batch
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {batch === 'all' ? 'All Batches' : batch}
                </button>
              ))}
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="text-sm font-medium text-neutral-300 mb-2 block">
              Filter by Role
            </label>
            <div className="flex flex-wrap gap-2">
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeRole === role
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {role === 'all' ? 'All Roles' : role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="text-center mb-4">
          <p className="text-sm text-neutral-500 uppercase tracking-wider">
            Scroll down to explore team members
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamFilters;