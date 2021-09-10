/* eslint-disable max-len */
// const cheerio = require('cheerio');
const axios = require('axios');

const data = [];
axios.post('https://oqubrx6zeq-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.0.0)%3B%20Browser%20(lite)&x-algolia-api-key=7a1d0ebc0d0e9ba3dc035fc09729f2a8&x-algolia-application-id=OQUBRX6ZEQ',
    '{"requests":[{"indexName":"live_jobs","params":"query=&page=0&maxValuesPerFacet=1000&facets=%5B%22us_only%22%2C%22category%22%5D&tagFilters=&facetFilters=%5B%5B%22us_only%3Afalse%22%5D%5D"},{"indexName":"live_jobs","params":"query=&page=0&maxValuesPerFacet=1000&hitsPerPage=1&attributesToRetrieve=%5B%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&tagFilters=&analytics=false&clickAnalytics=false&facets=us_only"}]}',
    {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
    .then((res) => {
        const jobs = res.data.results[0].hits;

        jobs.forEach((job) => {
            data.push({
                job: {
                    title: job.title,
                    type: job.job_type,
                    region: job.candidate_required_location,
                    url: job.url,
                },
                company: {
                    title: job.company_name,
                    logo: job.logo,
                    url: job.company_url && `https://remotive.io${job.company_url}`,
                },
            });
        });

        console.log(data);
    });

// -------------------------------------Scraper logic-------------------------------------
// axios.get('https://remotive.io/', {
//     headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
//     },
// }).then((response) => {
//     const $ = cheerio.load(response.data);

//     $('#initial_job_list > ul > li.category-list > ul > li.tw-cursor-pointer').each(function job() {
//         const jobTitle = $('div.job-tile > div:nth-child(2) > a.job-tile-title > span', this).text().trim();
//         const jobRegion = $('div.job-tile > div:nth-child(2) > p.tw-text-xs > span:last-child', this).text().trim();
//         const jobURL = `https://remotive.io${$('div.job-tile > div:nth-child(2) > a.job-tile-title', this).attr('href')}`;

//         const companyTitle = $('div.job-tile > div:nth-child(2) > p.tw-text-xs > span:first-child', this).text().trim();
//         const companyLogo = $('div.job-tile > div.tw-flex-shrink-0.tw-px-2 > img.tw-inline-block', this).attr('data-lazyload');

//         data.push({
//             job: {
//                 title: jobTitle,
//                 type: jobType,
//                 region: jobRegion,
//                 url: jobURL,
//             },
//             company: {
//                 title: companyTitle,
//                 logo: companyLogo,
//             },
//         });
//     });

//     console.log(data);
// })
//     .catch((error) => console.log(error));
