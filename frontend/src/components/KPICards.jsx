export function KPICards({ total, cities, categories, sources }) {
  const cards = [
    { title: 'Total Listings', value: total, note: 'Records in current result set' },
    { title: 'City Coverage', value: cities, note: 'Distinct markets represented' },
    { title: 'Category Spread', value: categories, note: 'Business verticals captured' },
    { title: 'Source Diversity', value: sources, note: 'Independent data channels' }
  ];

  return (
    <section className="kpi-cards" aria-label="Key performance indicators">
      {cards.map(card => (
        <article className="kpi-card card-panel" key={card.title}>
          <h3>{card.title}</h3>
          <p>{card.value}</p>
          <small>{card.note}</small>
        </article>
      ))}
    </section>
  );
}
