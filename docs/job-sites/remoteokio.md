## Findings on remoteok.io

- remoteok.io has a separate API but the data in the API is delayed by 24 hrs. The reason being that remoteok.io wants their job postings to appear first in Google search results rather than the websites that consume their API. This means that if I use their API, all the kob postings will be 1 day old which I think defeats the purpose of creating job search aggregator.

- On the other hand, remoteok.io serves server-rendered web pages. So scraping their website will be piece of cake.

- Any job can be searched through their URL - https://remoteok.io/remote-<search-term>-jobs. The search results URL is very structured and it makes it easy to scrape the data.
