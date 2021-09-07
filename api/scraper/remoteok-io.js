const axios = require('axios');
const cheerio = require('cheerio');

const data = [];
axios.get('https://remoteok.io/', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
    },
}).then((response) => {
    const $ = cheerio.load(response.data);

    $('#jobsboard > tbody > tr.job').each(function jobSection() {
        const jobTitle = $('td.company_and_position > a[itemprop="url"] > h2[itemprop="title"]', this).text().trim();
        const jobRegion = $('td.company_and_position > div.location.tooltip:nth-of-type(1)', this).text().trim();
        const jobSalary = $('td.company_and_position > div.location.tooltip:nth-of-type(2n)', this).text().trim();
        const jobURL = `https://remoteok.io${$('td.company_and_position > a[itemprop="url"]', this).attr('href')}`;

        const companyTitle = $('td.company_and_position > span.companyLink > a.preventLink > h3[itemprop="name"]', this).text().trim();
        const companyLogo = $('td.image.has-logo > a.preventLink > img.logo', this).attr('data-src') || '';
        const companyURL = `https://remoteok.io${$('td.image > a.preventLink', this).attr('href')}`;

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
                url: companyURL,
            },
        });
    });

    console.log(data);
})
    .catch((error) => console.log(error));
