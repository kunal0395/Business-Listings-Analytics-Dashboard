import React from 'react';

export function ListingTable({ rows, page, pageSize, total, onPageChange, loading }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="listing-panel card-panel" aria-label="Business listings table">
      <div className="listing-header">
        <div>
          <h2>Business Listings</h2>
          <p>{total.toLocaleString()} records available</p>
        </div>
        <div className="listing-pagination-summary">
          <span>Page {page} of {pageCount}</span>
        </div>
      </div>

      <div className="listing-table-wrap">
        <table className="listing-table">
          <thead>
            <tr>
              <th>Business</th>
              <th>Category</th>
              <th>City</th>
              <th>Source</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="table-loading">Loading listings...</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan="5" className="table-empty">No listings match the selected filters.</td>
              </tr>
            ) : (
              rows.map(listing => (
                <tr key={listing.id}>
                  <td>{listing.business_name || 'Unknown'}</td>
                  <td>{listing.category || 'Unknown'}</td>
                  <td>{listing.city || 'Unknown'}</td>
                  <td>{listing.source || 'Unknown'}</td>
                  <td>{listing.address || 'Unknown'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount}>
          Next
        </button>
      </div>
    </section>
  );
}
