const scrapeRemoteCoSearch = require('../scrapers/remote-co/search');
const scrapeRemoteokIoSearch = require('../scrapers/remoteok-io/scraper');
const scrapeRemotiveIoSearch = require('../scrapers/remotive-io/scraper');
const scrapeWeworkremotelyComSearch = require('../scrapers/weworkremotely-com/scraper');
const scrapeWorkingnomadsCoSearch = require('../scrapers/workingnomads-co/scraper');

exports.handler = async (event) => {
    try {
        const { query } = event.queryStringParameters;

        if (!query) {
            return {
                statusCode: 400,
                body: 'Bad request. "query" must be present',
            };
        }

        const data = {};

        const promises = [
            (async () => {
                const scrapedData = await scrapeRemoteCoSearch(query);
                data['remote-co'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeRemotiveIoSearch('search', query);
                data['remotive-io'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeRemoteokIoSearch('search', query);
                data['remoteok-io'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeWeworkremotelyComSearch('search', query);
                data['weworkremotely-com'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeWorkingnomadsCoSearch('search', query);
                data['workingnomads-co'] = scrapedData;
            })(),
        ];
        await Promise.all(promises);

        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed fetching data' }),
        };
    }
};
