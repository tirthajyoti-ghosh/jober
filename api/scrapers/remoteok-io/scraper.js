const cheerio = require('cheerio');

const urls = require('../../utilities/urls');
const selectors = require('../../utilities/html-selectors');
const { createAxiosInstance } = require('../../utilities/helpers');

module.exports = async (requestType, keywords) => {
    try {
        const axios = createAxiosInstance();

        let response;
        if (requestType === 'search') {
            response = await axios.get(`${urls.search['remoteok-io']}${keywords}-jobs`);
        } else {
            response = await axios.get(urls.home['remoteok-io']);
        }

        const $ = cheerio.load(response.data);

        const {
            job, title, region, salary, url, company, logo, logoAttr, companyURL,
        } = selectors['remoteok-io'];

        const data = [];
        $(job).each(function jobSection() {
            const jobTitle = $(title, this).text().trim();
            const jobRegion = $(region, this).text().trim();
            const jobSalary = $(salary, this).text().trim();
            const jobURL = `https://remoteok.io${$(url, this).attr('href')}`;

            const companyTitle = $(company, this).text().trim();
            const companyLogo = $(logo, this).attr(logoAttr) || '';
            const companyLink = `https://remoteok.io${$(companyURL, this).attr('href')}`;

            data.push({
                job: {
                    title: jobTitle,
                    salary: jobSalary,
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
