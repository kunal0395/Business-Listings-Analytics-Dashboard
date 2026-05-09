import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { API_BASE } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import { FilterBar } from './components/FilterBar';
import { KPICards } from './components/KPICards';
import { CityChart } from './components/CityChart';
import { CategoryChart } from './components/CategoryChart';
import { SourceChart } from './components/SourceChart';
import { ListingTable } from './components/ListingTable';

const defaultFilters = {
  search: '',
  city: '',
  category: '',
  source: '',
  start_date: '',
  end_date: ''
};

function App() {
  const [filters, setFilters] = useState(defaultFilters);
  const debouncedSearch = useDebounce(filters.search, 500);
  const [filterOptions, setFilterOptions] = useState({ cities: [], categories: [], sources: [] });
  const [categoryStats, setCategoryStats] = useState([]);
  const [cityStats, setCityStats] = useState([]);
  const [sourceStats, setSourceStats] = useState([]);
  const [listings, setListings] = useState([]);
  const [totalListings, setTotalListings] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listingsLoading, setListingsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const filterQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (filters.city) params.set('city', filters.city);
    if (filters.category) params.set('category', filters.category);
    if (filters.source) params.set('source', filters.source);
    if (filters.start_date) params.set('start_date', filters.start_date);
    if (filters.end_date) params.set('end_date', filters.end_date);
    return params.toString();
  }, [debouncedSearch, filters.city, filters.category, filters.source, filters.start_date, filters.end_date]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const response = await axios.get(`${API_BASE}/filter-options`);
        setFilterOptions(response.data);
      } catch (err) {
        console.error('Unable to load filter options', err);
      }
    };
    loadFilters();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filterQuery]);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const statsParams = new URLSearchParams(filterQuery);

        const [categoryRes, cityRes, sourceRes, countRes] = await Promise.all([
          axios.get(`${API_BASE}/category-stats?${statsParams}`),
          axios.get(`${API_BASE}/city-stats?${statsParams}`),
          axios.get(`${API_BASE}/source-stats?${statsParams}`),
          axios.get(`${API_BASE}/listings/count?${statsParams}`)
        ]);

        setCategoryStats(categoryRes.data);
        setCityStats(cityRes.data);
        setSourceStats(sourceRes.data);
        setTotalListings(countRes.data.total || 0);
      } catch (err) {
        setError(err.message || 'Error fetching dashboard metrics');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [filterQuery]);

  useEffect(() => {
    const fetchListings = async () => {
      setListingsLoading(true);
      setError(null);

      try {
        const listingsParams = new URLSearchParams(filterQuery);
        listingsParams.set('limit', pageSize.toString());
        listingsParams.set('offset', ((page - 1) * pageSize).toString());

        const response = await axios.get(`${API_BASE}/listings?${listingsParams}`);
        setListings(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching listing records');
      } finally {
        setListingsLoading(false);
      }
    };

    fetchListings();
  }, [filterQuery, page]);

  const activeFilters = Object.values(filters).filter(Boolean).length;
  const totalCities = filterOptions.cities.length;
  const totalCategories = filterOptions.categories.length;
  const totalSources = filterOptions.sources.length;
  const totalPages = Math.max(1, Math.ceil(totalListings / pageSize));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const topCity = cityStats[0] || { city: 'N/A', count: 0 };
  const topCategory = categoryStats[0] || { category: 'N/A', count: 0 };
  const topSource = sourceStats[0] || { source: 'N/A', count: 0, percentage: 0 };
  const refreshedAt = useMemo(
    () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    [categoryStats, cityStats, sourceStats]
  );

  const handlePageChange = (nextPage) => {
    const normalized = Math.max(1, Math.min(nextPage, totalPages));
    setPage(normalized);
  };

  return (
    <div className="dashboard-shell">
      <div className="app-container">
        <header className="hero-panel card-panel">
          <div className="hero-copy-wrap">
            <p className="eyebrow">Listing intelligence hub</p>
            <h1>Business Listings Analytics Dashboard</h1>
            <p className="hero-copy">
              Turn raw listings into sharp business insight. Explore location, category, and source performance in a
              dashboard built for fast decisions.
            </p>
            <div className="hero-chip-row">
              <span className="hero-chip">{totalListings.toLocaleString()} records indexed</span>
              <span className="hero-chip muted">Updated at {refreshedAt}</span>
            </div>
          </div>

          <div className="hero-stat-grid">
            <div className="hero-stat-card">
              <span>{totalListings.toLocaleString()}</span>
              <p>Total listings</p>
            </div>
            <div className="hero-stat-card">
              <span>{totalCities}</span>
              <p>Total cities</p>
            </div>
            <div className="hero-stat-card">
              <span>{totalCategories}</span>
              <p>Total categories</p>
            </div>
            <div className="hero-stat-card">
              <span>{totalSources}</span>
              <p>Total sources</p>
            </div>
          </div>
        </header>

        <section className="insight-strip card-panel" aria-label="Summary insights">
          <article className="insight-card">
            <h3>Top city</h3>
            <p>{topCity.city}</p>
            <span>{topCity.count.toLocaleString()} listings</span>
          </article>
          <article className="insight-card">
            <h3>Top category</h3>
            <p>{topCategory.category}</p>
            <span>{topCategory.count.toLocaleString()} listings</span>
          </article>
          <article className="insight-card">
            <h3>Top source</h3>
            <p>{topSource.source}</p>
            <span>{topSource.percentage.toFixed(1)}% share</span>
          </article>
          <article className="insight-card">
            <h3>Active filters</h3>
            <p>{activeFilters}</p>
            <span>Filter rules applied</span>
          </article>
        </section>

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          cities={filterOptions.cities}
          categories={filterOptions.categories}
          sources={filterOptions.sources}
          activeFilters={activeFilters}
        />

        {loading && <div className="message-box">Loading dashboard data...</div>}
        {error && <div className="message-box error">Error: {error}</div>}

        {!loading && !error && (
          <>
            <KPICards
              total={totalListings}
              cities={totalCities}
              categories={totalCategories}
              sources={totalSources}
            />

            {totalListings === 0 ? (
              <div className="message-box">No listings found for the selected filters.</div>
            ) : (
              <div className="chart-grid">
                <CategoryChart data={categoryStats} />
                <CityChart
                  data={sourceStats}
                  labelKey="source"
                  title="Source Coverage"
                  subtitle="Contribution by ingestion channel"
                  ariaLabel="Businesses by Source chart"
                />
                <SourceChart
                  data={cityStats}
                  labelKey="city"
                  title="City Momentum"
                  subtitle="Top cities by listing volume"
                  ariaLabel="Businesses by City chart"
                />
              </div>
            )}

            <ListingTable
              rows={listings}
              page={page}
              pageSize={pageSize}
              total={totalListings}
              onPageChange={handlePageChange}
              loading={listingsLoading}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
