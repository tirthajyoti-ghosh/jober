# Findings on data collection from remotive.io

- remotive.io has a separate API just like remoteok.io and the limitations are exactly the same - the data in the API is delayed by 24 hrs. So we will have to either scrape the site or use their internal API (the API they use to display data on their own site).

- remotive.io has server-rendered web pages. But fortunately they also have an internal API i.e., the API they use to display data on their own site. They are using Algolia. Now I could scrape the data from their site but they are not providing the company URL in their job cards. But on the other hand, their Algolia API sends the company URL in its response. So I have decided to implement both scraping and API data collection logic just in case. But the data collection from API is what will be used.

    > *Note: The Algolia API endpoint use requires public Algolia API key and application ID. These two are being sent as query parameters in the POST request and of course they are public. But I'll keep them in a .env file so that it becomes easier for me to change them should remotive.io updates their keys in the future.*

- The search URL is the same as getting all jobs. We will need send a POST request to the Algolia API endpoint. The only difference is that search term is included in the form data of the POST request. The search term goes inside the value of the `params` object which is inside the `requests` array. The `requests` array is put inside an object and `stringify`ed and then sent as the form data in the POST request.

    The value of `params` looks something like this - `query=<SEARCH_TERM>&page=0&maxValuesPerFacet=1000&facets=%5B%22us_only%22%2C%22category%22%5D&tagFilters=`. The search term goes beside `query`.

    The full `stringify`ed form data looks like this:

    ```sh
    {"requests":[{"indexName":"live_jobs","params":"query=<SEARCH_TERM>&page=0&maxValuesPerFacet=1000&facets=%5B%22us_only%22%2C%22category%22%5D&tagFilters="}]}
    ```
