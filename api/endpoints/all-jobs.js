const scrapeRemoteCoHome = require('../scrapers/remote-co/home');
const scrapeRemoteokIoHome = require('../scrapers/remoteok-io/scraper');
const scrapeRemotiveIoHome = require('../scrapers/remotive-io/scraper');
const scrapeWeworkremotelyComHome = require('../scrapers/weworkremotely-com/scraper');
const scrapeWorkingnomadsCoHome = require('../scrapers/workingnomads-co/scraper');

exports.handler = async () => {
    try {
        const data = {};

        const promises = [
            (async () => {
                const scrapedData = await scrapeRemoteCoHome();
                data['remote-co'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeRemoteokIoHome();
                data['remoteok-io'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeRemotiveIoHome();
                data['remotive-io'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeWeworkremotelyComHome();
                data['weworkremotely-com'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeWorkingnomadsCoHome();
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
