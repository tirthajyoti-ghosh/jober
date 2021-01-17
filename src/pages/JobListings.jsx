import React from 'react';
import { connect } from 'react-redux';

import Search from '../components/Search';
import queryApi from '../helpers/apiUtilities';
import updateLoadingState from '../store/actions/loadingState';
import addJobSearchResults from '../store/actions/jobSearchResults';

const JobListings = ({
  isLoading,
  jobSearchResults,
  dispatchUpdateLoadingState,
  dispatchJobSearchResults,
}) => {
  const initiateSearch = query => {
    dispatchUpdateLoadingState(true);

    queryApi.post(0, { 'skill/role': { text: query, experience: 'potential-to-develop' } })
      .then(result => {
        dispatchJobSearchResults({ result: result.results, total: result.total });
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
    return locations.join(';');
  };

  const formatCompensation = compensation => {
    if (compensation === null || compensation.data === null) {
      return 'Not available';
    }
    return `${compensation.data.currency} ${compensation.data.minAmount} - ${compensation.data.maxAmount} /${compensation.data.periodicity}`;
  };

  return (
    <>
      <Search initiateSearch={initiateSearch} />

      <section className="job-listings">
        {
          jobSearchResults.result === undefined
            ? 'Start typing...'
            : isLoading
              ? 'Loading...'
              : jobSearchResults.result.map(job => (
                <div className="job-card" key={job.id}>
                  <div className="company">
                    <div className="img">
                      <img src={job.organizations[0].picture} alt="company" />
                    </div>

                    <div className="info">
                      <h3>{job.objective.length > 30 ? `${job.objective.slice(0, 30)}...` : job.objective}</h3>
                      <p>{job.organizations[0].name}</p>
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
              ))
        }
      </section>

      <section className="job-details">
        <header>
          <div className="company">
            <div className="img">
              <img src="https://torre-media.s3-us-west-2.amazonaws.com/Stripe.jfif" alt="company" />
            </div>

            <div>
              <h1>Apple</h1>
              <p>Cupertino, USA</p>
            </div>
          </div>

          <h4>Senior UI/UX Designer</h4>
        </header>

        <div className="info">
          <h4>Description</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorem facilis, perferendis iure expedita vero, assumenda repudiandae labore omnis sit ipsam repellat nostrum! Ut eligendi odit quo! Debitis, quisquam officiis!Unde, atque cupiditate minima aliquid impedit molestiae beatae eum perferendis delectus quis qui quod repellat nemo deleniti eos debitis illo? Nam tenetur eum excepturi omnis ipsum sequi! Esse, laboriosam minus.</p>
        </div>

        <div className="info">
          <h4>Description</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorem facilis, perferendis iure expedita vero, assumenda repudiandae labore omnis sit ipsam repellat nostrum! Ut eligendi odit quo! Debitis, quisquam officiis!Unde, atque cupiditate minima aliquid impedit molestiae beatae eum perferendis delectus quis qui quod repellat nemo deleniti eos debitis illo? Nam tenetur eum excepturi omnis ipsum sequi! Esse, laboriosam minus.</p>
        </div>

        <div className="info">
          <h4>Description</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorem facilis, perferendis iure expedita vero, assumenda repudiandae labore omnis sit ipsam repellat nostrum! Ut eligendi odit quo! Debitis, quisquam officiis!Unde, atque cupiditate minima aliquid impedit molestiae beatae eum perferendis delectus quis qui quod repellat nemo deleniti eos debitis illo? Nam tenetur eum excepturi omnis ipsum sequi! Esse, laboriosam minus.</p>
        </div>

        <div className="action-btn">
          <a href="#" className="apply-btn">Apply Now</a>
          <a href="#" className="details-btn">Full Page</a>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  jobSearchResults: state.jobSearchResults,
});

const mapDispatchToProps = dispatch => ({
  dispatchUpdateLoadingState: value => dispatch(updateLoadingState(value)),
  dispatchJobSearchResults: value => dispatch(addJobSearchResults(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobListings);
