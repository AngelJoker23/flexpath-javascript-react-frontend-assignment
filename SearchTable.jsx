export function SearchTable({ data, loading }) {
  if (loading) {
    return <div className="text-start">Loading Records...</div>;
  }

  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover text-start">
        <thead>
          <tr>
            {headers.map((head) => (
              <th key={head} scope="col">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((head) => (
                <td key={head}>{row[head]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}