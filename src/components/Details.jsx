import React from 'react';

import jobDetailsImg from '../job-details.svg';

const Details = ({
  details,
  detailsType,
}) => {
  const jobDetailsJsx = details.id === undefined
    ? (
      <div className="static-img">
        <img src={jobDetailsImg} alt="" />
        <h3>Click on an item to view details</h3>
      </div>
    )
    : (
      <>
        <header>
          <div className="company">
            <div className="img">
              {details.organizations[0] ? (<img src={details.organizations[0].picture} alt="company" />) : ''}
            </div>

            <div>
              <h1>{details.organizations[0] ? details.organizations[0].name : ''}</h1>
              {details.place.location.length > 0
                ? (
                  <p>{details.place.location.map(location => `${location.id}, `)}</p>
                ) : ''}
            </div>
          </div>

          <h4>{details.objective}</h4>
        </header>

        {
          details.details.map(detail => (
            <div className="info" key={Math.random()}>
              <h4>{detail.code}</h4>
              {detail.content.split('\n').map(text => (
                <p key={Math.random()}>{text}</p>
              ))}
            </div>
          ))
        }

        <div className="action-btn">
          <a href={`https://torre.co/jobs/${details.id}`} rel="noreferrer" target="_blank" className="apply-btn">Apply Now</a>
          <a href={`https://torre.co/jobs/${details.id}`} rel="noreferrer" target="_blank" className="details-btn">Full Page</a>
        </div>
      </>
    );

  const peopleDetailsJsx = details.person === undefined
    ? (
      <div className="static-img">
        <img src={jobDetailsImg} alt="" />
        <h3>Click on an item to view details</h3>
      </div>
    )
    : (
      <>
        <header>
          <div className="company">
            <div className="img">
              {details.organizations[0] ? (<img src={details.organizations[0].picture} alt="company" />) : ''}
            </div>

            <div>
              <h1>{details.organizations[0] ? details.organizations[0].name : ''}</h1>
              {details.place.location.length > 0
                ? (
                  <p>{details.place.location.map(location => location.id)}</p>
                ) : ''}
            </div>
          </div>

          <h4>{details.objective}</h4>
        </header>

        {
        details.details.map(detail => (
          <div className="info" key={Math.random()}>
            <h4>{detail.code}</h4>
            {detail.content.split('\n').map(text => (
              <p key={Math.random()}>{text}</p>
            ))}
          </div>
        ))
      }

        <div className="action-btn">
          <a href={`https://torre.co/jobs/${details.id}`} rel="noreferrer" target="_blank" className="apply-btn">Apply Now</a>
          <a href={`https://torre.co/jobs/${details.id}`} rel="noreferrer" target="_blank" className="details-btn">Full Page</a>
        </div>
      </>
    );

  return (
    <section className="job-details">
      {detailsType === 'job' ? jobDetailsJsx : peopleDetailsJsx}
    </section>
  );
};

export default Details;
