const cheerio = require('cheerio');
const axios = require('axios');

const data = [];
axios.get('https://weworkremotely.com/')
    .then((response) => {
        const $ = cheerio.load(response.data);

        $('section.jobs > article > ul > li.feature').each(function job() {
            const jobTitle = $('a > span.title', this).text().trim();
            const jobType = $('a > span.company:nth-of-type(2n):not(.region)', this).text().trim();
            const jobRegion = $('a > span.company.region', this).text().trim();
            const jobURL = `https://weworkremotely.com${$('a:not(.tooltip > a)', this).attr('href')}`;

            const companyTitle = $('a > span.company:nth-of-type(1)', this).text().trim();
            const companyLogoBgImg = $('.tooltip > a > .flag-logo', this).css('background-image');
            const companyLogo = companyLogoBgImg ? companyLogoBgImg.replace('url(', '').replace(')', '') : '';
            const companyURL = `https://weworkremotely.com${$('.tooltip > a', this).attr('href')}`;

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
                    url: companyURL,
                },
            });
        });

        console.log(data);
    })
    .catch((error) => console.log(error));
