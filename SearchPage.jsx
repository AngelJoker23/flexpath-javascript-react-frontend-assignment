import { useState } from 'react';
import { MetricDisplay } from './MetricsDisplay';
import { SearchTable } from './SearchTable';

export function SearchPage({ searchResults, setSearchResults, hasSearched, setHasSearched }) {
    const [filterType, setFilterType] = useState('gender');
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams();
            if (keyword.trim()) {
                queryParams.append('filterType', filterType);
                queryParams.append('keyword', keyword.trim());
            }

            const res = await fetch(`/api/data/search?${queryParams.toString()}`);
            if (!res.ok) throw new Error(`Error fetching data: ${res.statusText}`);

            const data = await res.json();
            setSearchResults(data);
            setHasSearched(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Search form */}
            <form onSubmit={handleSearch} className="row g-3 mb-3 text-start">
                <div className="col-auto">
                    <select
                        className="form-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="gender">gender</option>
                        <option value="operatingSystem">operatingSystem</option>
                        <option value="model">model</option>
                        <option value="behaviorclass">behaviorclass</option>
                    </select>
                </div>
                <div className="col-auto">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search keyword..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>

            {/* Record Counter Message */}
            <div className="text-start mb-3">
                {Loading ? (
                    <p>Loading...</p>
                ) : !hasSearched ? (
                    <p>No Records To Display</p>
                ) : (
                    <p>Displaying {searchResults.length.toLocaleString('en-US')} records</p>
                )}
            </div>

            {error && <div className="text-danger mb-3">{error}</div>}

            {/* Metrics & Table Components */}
            <MetricDisplay data={searchResults} />
            <SearchTable data={searchResults} loading={loading} />
        </div>
    );
}