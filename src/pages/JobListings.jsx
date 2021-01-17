import React, { useState } from 'react';
import { connect } from 'react-redux';

import Search from '../components/Search';
import queryApi from '../helpers/apiUtilities';
import updateLoadingState from '../store/actions/loadingState';
import addJobSearchResults from '../store/actions/jobSearchResults';
import addJobDetails from '../store/actions/jobDetails';

const JobListings = ({
  isLoading,
  jobSearchResults,
  jobDetails,
  dispatchUpdateLoadingState,
  dispatchAddJobSearchResults,
  dispatchAddJobDetails,
}) => {
  const initiateSearch = query => {
    dispatchUpdateLoadingState(true);

    queryApi.post(0, { 'skill/role': { text: query, experience: 'potential-to-develop' } })
      .then(result => {
        dispatchAddJobSearchResults({ result: result.results, total: result.total });
        dispatchUpdateLoadingState(false);
      });
  };

  const getJobDetails = jobId => {
    dispatchUpdateLoadingState(true);

    queryApi.get(`https://torre.co/api/opportunities/${jobId}`)
      .then(result => {
        dispatchAddJobDetails(result);
        dispatchUpdateLoadingState(false);
      });
  };

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

  return (
    <>
      <Search initiateSearch={initiateSearch} total={jobSearchResults.total} />

      <section className="job-listings">
        { !jobSearchResults.result
          ? 'Start typing...' : (
            jobSearchResults.result.map(job => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div className="job-card" key={job.id} role="menuitem" tabIndex={0} onClick={() => getJobDetails(job.id)}>
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
            )))}
      </section>

      <section className="job-details">
        {
          jobDetails.id === undefined
            ? 'Start typing...'
            : (
              <>
                <header>
                  <div className="company">
                    <div className="img">
                      {jobDetails.organizations[0] ? (<img src={jobDetails.organizations[0].picture} alt="company" />) : ''}
                    </div>

                    <div>
                      <h1>{jobDetails.organizations[0] ? jobDetails.organizations[0].name : ''}</h1>
                      {jobDetails.place.location.length > 0
                        ? (
                          <p>{jobDetails.place.location.map(location => location.id)}</p>
                        ) : ''}
                    </div>
                  </div>

                  <h4>{jobDetails.objective}</h4>
                </header>

                {
                  jobDetails.details.map(detail => (
                    <div className="info" key={Math.random()}>
                      <h4>{detail.code}</h4>
                      {detail.content.split('\n').map(text => (
                        <p key={Math.random()}>{text}</p>
                      ))}
                    </div>
                  ))
                }

                <div className="action-btn">
                  <a href={`https://torre.co/jobs/${jobDetails.id}`} rel="noreferrer" target="_blank" className="apply-btn">Apply Now</a>
                  <a href={`https://torre.co/jobs/${jobDetails.id}`} rel="noreferrer" target="_blank" className="details-btn">Full Page</a>
                </div>
              </>
            )
        }
      </section>
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  jobSearchResults: state.jobSearchResults,
  jobDetails: state.jobDetails,
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdateLoadingState: value => dispatch(updateLoadingState(value)),
  dispatchAddJobSearchResults: value => dispatch(addJobSearchResults(value)),
  dispatchAddJobDetails: value => dispatch(addJobDetails(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobListings);
