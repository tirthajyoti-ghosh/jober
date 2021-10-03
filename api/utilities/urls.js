module.exports = {
    'remote-co': {
        home: 'https://remote.co/remote-jobs/developer/',
        search: 'https://remote.co/jm-ajax/get_listings/',
    },
    'remoteok-io': {
        home: 'https://remoteok.io/',
        search: 'https://remoteok.io/remote-', // The complete search url is https://remoteok.io/remote-<keywords>-jobs
    },
    'weworkremotely-com': {
        home: 'https://weworkremotely.com/',
        search: 'https://weworkremotely.com/remote-jobs/search',
    },
    'remotive-io': `https://oqubrx6zeq-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.0.0)%3B%20Browser%20(lite)&x-algolia-api-key=${process.env.REMOTIVE_IO_ALGOLIA_API_KEY}&x-algolia-application-id=${process.env.REMOTIVE_IO_ALGOLIA_APPLICATION_ID}`,
    'workingnomads-co': 'https://www.workingnomads.co/jobsapi/job/_search?sort=expired:asc,premium:desc,pub_date:desc&_source=company,category_name,description,location_base,salary_range,salary_range_short,instructions,id,external_id,slug,title,pub_date,tags,source,apply_url,premium,expired,use_ats,position_type&size=100&from=0&',
};
