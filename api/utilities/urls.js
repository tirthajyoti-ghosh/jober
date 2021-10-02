module.exports = {
    home: {
        'remote-co': 'https://remote.co/remote-jobs/developer/',
        'remoteok-io': 'https://remoteok.io/',
        'remotive-io': `https://oqubrx6zeq-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.0.0)%3B%20Browser%20(lite)&x-algolia-api-key=${process.env.REMOTIVE_IO_ALGOLIA_API_KEY}&x-algolia-application-id=${process.env.REMOTIVE_IO_ALGOLIA_APPLICATION_ID}`,
        'weworkremotely-com': 'https://weworkremotely.com/',
        'workingnomads-co': 'https://www.workingnomads.co/jobsapi/job/_search?sort=expired:asc,premium:desc,pub_date:desc&_source=company,category_name,description,location_base,salary_range,salary_range_short,instructions,id,external_id,slug,title,pub_date,tags,source,apply_url,premium,expired,use_ats,position_type&size=100&from=0&q=(category_name.raw:%22Development%22)',
    },
    search: {
        'remote-co': 'https://remote.co/jm-ajax/get_listings/',
        'remoteok-io': (keywords) => `https://remoteok.io/remote-${keywords}-jobs`, // The search keyword is inside the url
    },
};
