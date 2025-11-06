import './TeamFilters.css';

const TeamFilters = ({ batches, roles, activeFilter, activeRole, setActiveFilter, setActiveRole }) => {
  const nonAllRoles = roles.filter(role => role !== 'all');
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="select-wrapper">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="filter-select"
          >
            {batches.map(batch => (
              <option key={batch} value={batch}>
                {batch === 'all' ? 'All Batches' : batch}
              </option>
            ))}
          </select>
          <svg className="select-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </div>

        <div className="divider"></div>

        <div className="filter-buttons">
          <button
            onClick={() => setActiveRole('all')}
            className={`filter-button ${activeRole === 'all' ? 'active' : ''}`}
          >
            All
            <div className={`button-indicator ${activeRole === 'all' ? 'active' : ''}`} />
          </button>

          {nonAllRoles.map(role => (
            <button
              key={role}
              onClick={() => setActiveRole(role === activeRole ? 'all' : role)}
              className={`filter-button ${activeRole === role ? 'active' : ''}`}
            >
              {role}
              <div className={`button-indicator ${activeRole === role ? 'active' : ''}`} />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TeamFilters;