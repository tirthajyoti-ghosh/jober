const cheerio = require('cheerio');

const urls = require('../utilities/urls');
const selectors = require('../utilities/html-selectors');
const { createAxiosInstance } = require('../utilities/helpers');

module.exports = async () => {
    try {
        const axios = createAxiosInstance();

        const response = await axios.get(urls.home['weworkremotely-com']);

        const $ = cheerio.load(response.data);

        const {
            job, title, type, region, url, company, logo, companyURL,
        } = selectors['weworkremotely-com'];

        const data = [];
        $(job).each(function job() {
            const jobTitle = $(title, this).text().trim();
            const jobType = $(type, this).text().trim();
            const jobRegion = $(region, this).text().trim();
            const jobURL = `https://weworkremotely.com${$(url, this).attr('href')}`;

            const companyTitle = $(company, this).text().trim();
            const companyLogoBgImg = $(logo, this).css('background-image');
            const companyLogo = companyLogoBgImg ? companyLogoBgImg.replace('url(', '').replace(')', '') : '';
            const companyLink = `https://weworkremotely.com${$(companyURL, this).attr('href')}`;

            data.push({
                job: {
                    title: jobTitle,
                    type: jobType,
                    region: jobRegion,
                    url: jobURL,
                },
                company: {
                    title: companyTitle,
                    logo: companyLogo,
                    url: companyLink,
                },
            });
        });

        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
