# Findings on data collection from remoteok.io

- remoteok.io has a separate API but the data in the API is delayed by 24 hrs (read the legal property of the first object in <https://remoteok.io/api>). The reason being that remoteok.io wants their job postings to appear first in Google search results rather than the websites that consume their API. This means that if I use their API, all the job postings will be 1 day old which I think defeats the purpose of creating job search aggregator.

- On the other hand, remoteok.io serves server-rendered web pages. So scraping their website will be piece of cake.

- Any job can be searched through their URL - <https://remoteok.io/remote-{{search-term}}-jobs>. The search results URL is very structured and it makes it easy to programmatically send a request to the URL to scrape the data.

- The job details page is a bit tricky as the content is in markdown format. So I will have to parse the markdown and send back a well formatted JSON. Torre API response might help here. I have noticed Torre also crawls job sites and sends a formatted JSON in their API.

    - For more information, check the "remoteok.io" section in job details docs file.
