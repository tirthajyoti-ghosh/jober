const urls = require('../../utilities/urls');
const properties = require('../../utilities/api-properties');
const { createAxiosInstance } = require('../../utilities/helpers');

module.exports = async (requestType, keywords) => {
    try {
        const axios = createAxiosInstance();

        let response;
        if (requestType === 'search') {
            response = await axios.get(`${urls.home['workingnomads-co']}q=${keywords}`);
        } else {
            response = await axios.get(`${urls.home['workingnomads-co']}q=(category_name.raw:%22Development%22)`);
        }

        const {
            title, type, region, url, tags, company,
        } = properties['workingnomads-co'];

        const jobs = response.data.hits.hits;
        const data = [];
        jobs.forEach((item) => {
            // eslint-disable-next-line no-underscore-dangle
            const job = item._source;
            const jobTitle = job[title];
            const jobType = job[type] === 'ft' ? 'Full-time' : 'Contract';
            const jobRegion = job[region];
            const jobURL = `https://www.workingnomads.co/jobs/${job[url]}`;
            const jobTags = job[tags].map((tag) => `https://www.workingnomads.co/remote-${tag}-jobs`);

            const companyTitle = job[company];

            data.push({
                job: {
                    title: jobTitle,
                    type: jobType,
                    tags: jobTags,
                    region: jobRegion,
                    url: jobURL,
                },
                company: {
                    title: companyTitle,
                },
            });
        });

        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
