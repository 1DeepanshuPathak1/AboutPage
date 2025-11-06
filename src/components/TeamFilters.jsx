const TeamFilters = ({ batches, roles, activeFilter, activeRole, setActiveFilter, setActiveRole }) => {
  const nonAllRoles = roles.filter(role => role !== 'all');
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center gap-8">
        {/* Batch Select Dropdown */}
        <div className="relative">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="appearance-none bg-transparent text-neutral-300 px-4 py-2 pr-8 border border-neutral-700 rounded-lg cursor-pointer hover:border-neutral-500 transition-colors focus:outline-none focus:border-neutral-400"
          >
            {batches.map(batch => (
              <option key={batch} value={batch} className="bg-neutral-900">
                {batch === 'all' ? 'All Batches' : batch}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-neutral-700"></div>

        {/* Role Filters */}
        <div className="flex items-center gap-6">
          {/* All Filter */}
          <button
            onClick={() => setActiveRole('all')}
            className={`relative px-2 py-1 text-sm font-medium transition-colors
              ${activeRole === 'all' ? 'text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'}
              group`}
          >
            All
            <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 transform origin-left transition-transform duration-300 
              ${activeRole === 'all' ? 'scale-x-100' : 'scale-x-0'} 
              group-hover:scale-x-100`}
            >
              <div className="absolute inset-0 blur-sm bg-inherit"></div>
            </div>
          </button>

          {/* Other Role Filters */}
          {nonAllRoles.map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role === activeRole ? 'all' : role)}
              className={`relative px-2 py-1 text-sm font-medium transition-colors
                ${activeRole === role ? 'text-neutral-100' : 'text-neutral-400 hover:text-neutral-200'}
                group`}
            >
              {role}
              <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 transform origin-left transition-transform duration-300 
                ${activeRole === role ? 'scale-x-100' : 'scale-x-0'} 
                group-hover:scale-x-100`}
              >
                <div className="absolute inset-0 blur-sm bg-inherit"></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TeamFilters;