import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './Navbar';
import { HomePage } from './HomePage';
import { SearchPage } from './SearchPage';

export default function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    return (
        <BrowserRouter>
            <NavBar />
            <div className="container" style={{ marginTop: '70px' }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/search"
                        element={
                            <SearchPage
                                searchResults={searchResults}
                                hasSearched={hasSearched}
                                setHasSearched={setHasSearched}
                            />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}