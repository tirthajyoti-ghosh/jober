const axios = require('axios');
const cheerio = require('cheerio');

const data = [];
axios.get('https://remote.co/remote-jobs/developer/', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
    },
}).then((response) => {
    const $ = cheerio.load(response.data);

    $('body > main > div.container.pt-4 > div.row > div.col > div.card.bg-light.mb-3.rounded-0 > div.card-body > div.card.bg-white.m-0 > div.card-body.p-0 > a.card.m-0').each(function jobSection() {
        const jobTitle = $('div.job-card > div.row.no-gutters > div.col.position-static > div.card-body > p:nth-child(1) > span.font-weight-bold.larger', this).text().trim();
        const jobType = $('div.job-card > div.row.no-gutters > div.col.position-static > div.card-body > p:nth-child(2) > span.badge.badge-success:nth-child(1) > small', this).text();
        const jobRegion = $('div.job-card > div.row.no-gutters > div.col.position-static > div.card-body > p:nth-child(2) > span.badge.badge-success:nth-child(2) > small', this).text();
        const jobURL = `https://remote.co${$(this).attr('href')}`;

        const companyTitle = $('div.job-card > div.row.no-gutters > div.col.position-static > div.card-body > p:nth-child(2)', this).text().split('\n')[1].trim();
        const companyLogo = $('div.job-card > div.row.no-gutters > div.col-lg-1.col-md-2.position-static.d-none.d-md-block.pr-md-3 > img.card-img', this).attr('data-lazy-src') || '';

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

    console.log(data);
})
    .catch((error) => console.log(error));
