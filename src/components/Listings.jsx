import React from 'react';
import queryString from 'query-string';

import jobSearchImg from '../job-search.svg';

const Listings = ({
  searchResults,
  searchType,
  location,
  getJobDetails,
}) => {
  const searchParams = queryString.parse(location.search);

  const formatLocations = (remote, locations) => {
    if (remote) {
      if (locations.length === 0) {
        return 'Remote';
      }
      return `Remote - ${locations.join('; ')}`;
    }
    return locations.join('; ');
  };

  const formatCompensation = compensation => {
    if (compensation === null || compensation.data === null) {
      return 'Not available';
    }
    return `${compensation.data.currency} ${compensation.data.minAmount} - ${compensation.data.maxAmount} /${compensation.data.periodicity}`;
  };

  const jobSearchResultsJsx = !searchResults.result
    ? (
      <div className="static-img">
        <h2>Let&apos;s get started!</h2>
        <img src={jobSearchImg} alt="" />
      </div>
    )
    : (
      <section className="job-listings">
        {searchResults.result.map(job => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div className={`job-card ${searchParams.jobId && searchParams.jobId === job.id ? 'active' : ''}`} key={job.id} role="menuitem" tabIndex={0} onClick={() => getJobDetails(job.id)}>
            <div className="company">
              <div className="img">
                {job.organizations[0] ? (<img src={job.organizations[0].picture} alt="company" />) : ''}
              </div>

              <div className="info">
                <h3>{job.objective.length > 30 ? `${job.objective.slice(0, 30)}...` : job.objective}</h3>
                <p>{job.organizations[0] ? job.organizations[0].name : ''}</p>
              </div>
            </div>
            <div>
              <h3>{formatLocations(job.remote, job.locations)}</h3>
              <p>Location</p>
            </div>
            <div>
              <h3>{formatCompensation(job.compensation)}</h3>
              <p>Salary</p>
            </div>
          </div>
        ))}
      </section>
    );

  const peopleSearchResultsJsx = !searchResults.result
    ? (
      <div className="static-img">
        <h2>Let&apos;s get started!</h2>
        <img src={jobSearchImg} alt="" />
      </div>
    )
    : (
      <section className="job-listings">
        {searchResults.result.map(job => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div className={`job-card ${searchParams.jobId && searchParams.jobId === job.id ? 'active' : ''}`} key={job.id} role="menuitem" tabIndex={0} onClick={() => getJobDetails(job.id)}>
            <div className="company">
              <div className="img">
                {job.organizations[0] ? (<img src={job.organizations[0].picture} alt="company" />) : ''}
              </div>

              <div className="info">
                <h3>{job.objective.length > 30 ? `${job.objective.slice(0, 30)}...` : job.objective}</h3>
                <p>{job.organizations[0] ? job.organizations[0].name : ''}</p>
              </div>
            </div>
            <div>
              <h3>{formatLocations(job.remote, job.locations)}</h3>
              <p>Location</p>
            </div>
            <div>
              <h3>{formatCompensation(job.compensation)}</h3>
              <p>Salary</p>
            </div>
          </div>
        ))}
      </section>
    );

  return searchType === 'job' ? jobSearchResultsJsx : peopleSearchResultsJsx;
};

export default Listings;
