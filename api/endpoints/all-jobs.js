const scrapeRemoteCo = require('../scrapers/remote-co/home');
const scrapeRemoteokIo = require('../scrapers/remoteok-io/home');
const scrapeRemotiveIo = require('../scrapers/remotive-io/home');
const scrapeWeworkremotelyCom = require('../scrapers/weworkremotely-com/home');
const scrapeWorkingnomadsCo = require('../scrapers/workingnomads-co/home');

exports.handler = async () => {
    try {
        const data = {};

        const promises = [
            (async () => {
                const scrapedData = await scrapeRemoteCo();
                data['remote-co'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeRemoteokIo();
                data['remoteok-io'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeRemotiveIo();
                data['remotive-io'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeWeworkremotelyCom();
                data['weworkremotely-com'] = scrapedData;
            })(),
            (async () => {
                const scrapedData = await scrapeWorkingnomadsCo();
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
