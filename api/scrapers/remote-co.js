const cheerio = require('cheerio');

const urls = require('../utilities/urls');
const selectors = require('../utilities/html-selectors');
const { createAxiosInstance } = require('../utilities/helpers');

module.exports = async () => {
    try {
        const axios = createAxiosInstance();

        const response = await axios.get(urls.home['remote-co']);

        const $ = cheerio.load(response.data);

        const {
            job, title, type, region, company, logo, logoAttr,
        } = selectors['remote-co'];

        const data = [];
        $(job).each(function jobSection() {
            const jobTitle = $(title, this).text().trim();
            const jobType = $(type, this).text();
            const jobRegion = $(region, this).text();
            const jobURL = `https://remote.co${$(this).attr('href')}`;

            const companyTitle = $(company, this).text().split('\n')[1].trim();
            const companyLogo = $(logo, this).attr(logoAttr) || '';

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
                },
            });
        });

        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
