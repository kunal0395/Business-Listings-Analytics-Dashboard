const initialFilters = {
  search: '',
  city: '',
  category: '',
  source: '',
  start_date: '',
  end_date: ''
};

export function FilterBar({ filters, setFilters, cities, categories, sources, activeFilters = 0 }) {
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <section className="filter-bar card-panel">
      <div className="filter-topline">
        <div>
          <p className="filter-eyebrow">Precision Filters</p>
          <h2>Focus on what matters</h2>
        </div>
        <div className="filter-badge">{activeFilters} active</div>
      </div>

      <div className="filter-fields">
        <div className="filter-group search-group">
          <label htmlFor="search-input">Search</label>
          <input
            id="search-input"
            type="text"
            placeholder="Search companies, tags, or addresses"
            aria-label="Search business"
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="city-select">City</label>
          <select
            id="city-select"
            aria-label="City filter"
            value={filters.city}
            onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}
          >
            <option value="">All Cities</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="category-select">Category</label>
          <select
            id="category-select"
            aria-label="Category filter"
            value={filters.category}
            onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            {categories.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="source-select">Source</label>
          <select
            id="source-select"
            aria-label="Source filter"
            value={filters.source}
            onChange={e => setFilters(f => ({ ...f, source: e.target.value }))}
          >
            <option value="">All Sources</option>
            {sources.map(source => <option key={source} value={source}>{source}</option>)}
          </select>
        </div>

        <div className="filter-column date-group">
          <div className="filter-group">
            <label htmlFor="start-date">From</label>
            <input
              id="start-date"
              type="date"
              value={filters.start_date}
              onChange={e => setFilters(f => ({ ...f, start_date: e.target.value }))}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="end-date">To</label>
            <input
              id="end-date"
              type="date"
              value={filters.end_date}
              onChange={e => setFilters(f => ({ ...f, end_date: e.target.value }))}
            />
          </div>
        </div>

        <div className="filter-actions">
          <button type="button" onClick={resetFilters}>Reset filters</button>
        </div>
      </div>
    </section>
  );
}
