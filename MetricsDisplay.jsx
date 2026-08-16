export function MetricsDisplay({ data }) {
  if (!data || data.length === 0) return null;

  const calculateStats = (key) => {
    const values = data.map(item => Number(item[key])).filter(n => !isNaN(n)).sort((a, b) => a - b);
    if (values.length === 0) return { avg: 0, median: 0 };

    const sum = values.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / values.length;

    const mid = Math.floor(values.length / 2);
    const median = values.length % 2 !== 0 
      ? values[mid] 
      : (values[mid - 1] + values[mid]) / 2;

    return {
      avg: avg.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      median: median.toLocaleString('en-US', { maximumFractionDigits: 2 })
    };
  };

  const metrics = [
    { title: 'App Usage Time', key: 'appUsageTime', unit: 'Minutes' },
    { title: 'Screen On Time', key: 'screenOnTime', unit: 'Hours/day' },
    { title: 'Apps Installed', key: 'numberOfAppsInstalled', unit: 'Apps' },
    { title: 'Age', key: 'age', unit: 'Years' }
  ];

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-4">
      {metrics.map((m) => {
        const stats = calculateStats(m.key);
        return (
          <div className="col" key={m.key}>
            <div className="card h-100 shadow-sm text-start">
              <div className="card-body">
                <h5 className="card-title fs-6">{m.title}</h5>
                <p className="card-text mb-1"><strong>Average:</strong> {stats.avg} {m.unit}</p>
                <p className="card-text"><strong>Median:</strong> {stats.median} {m.unit}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}