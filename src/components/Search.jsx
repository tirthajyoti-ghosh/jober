import React, { useState } from 'react';

const Search = ({
  initiateSearch, type, total, defaultValue,
}) => {
  const [query, setQuery] = useState(defaultValue);

  return (
    <section className="search-section">
      <div className="heading">
        <h1>
          Search
          {' '}
          {type}
        </h1>
        {
          total
            ? (
              <p>
                <span className="result-number">
                  {total}
                  {' '}
                  results
                  {' '}
                </span>
                for your search term
              </p>
            )
            : ''
        }
      </div>

      <div className="search">
        <div className="search-bar">
          <input type="text" placeholder="Search jobs" onChange={e => setQuery(e.target.value)} value={query} />
          <button type="button" onClick={() => initiateSearch(query)}>
            <svg width="17" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" /></svg>
          </button>
        </div>

        <div className="skills">
          <ul>
            <li>Popular Skills</li>
            <li>
              <a href={`/${type}?query=typescript`}>TypeScript</a>
            </li>
            <li>
              <a href={`/${type}?query=vue`}>Vue</a>
            </li>
            <li>
              <a href={`/${type}?query=react/redux`}>React/Redux</a>
            </li>
            <li>
              <a href={`/${type}?query=ruby`}>Ruby</a>
            </li>
            <li>
              <a href={`/${type}?query=ruby%20on%20rails`}>Ruby on Rails</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Search;
