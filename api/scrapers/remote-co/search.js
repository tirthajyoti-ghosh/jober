/* eslint-disable max-len */
const cheerio = require('cheerio');
const querystring = require('querystring');

const urls = require('../../utilities/urls');
const selectors = require('../../utilities/html-selectors');
const { createAxiosInstance } = require('../../utilities/helpers');

module.exports = async (keywords) => {
    try {
        const axios = createAxiosInstance();

        const response = await axios.post(urls['remote-co'].search,
            querystring.stringify({
                search_keywords: keywords,
                per_page: 50,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

        // If the "found_jobs" property is false, then return an empty array
        if (!response.data.found_jobs) {
            return [];
        }

        const $ = cheerio.load(response.data.html);

        const {
            job, title, type, region, url, company, logo, logoAttr,
        } = selectors['remote-co'].search;

        const data = [];
        $(job).each(function jobSection() { // The "this" keyword won't work if arrow function is used
            const jobTitle = $(title, this).text().trim();
            const jobType = $(type, this).text().trim();
            const jobRegion = $(region, this).text().trim();
            const jobURL = $(url, this).attr('href');

            const companyTitle = $(company, this).text().trim();
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
