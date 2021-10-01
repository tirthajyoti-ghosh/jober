# Findings on data collection from remote.co

- remote.co does not have any API. Their content is server-rendered so scraping is the way to go. The development jobs can be found at <https://remote.co/remote-jobs/developer/>

- However, their search functionality has an API - <https://remote.co/jm-ajax/get_listings/> and it accepts a POST request with the search term and some other parameters such as `order`, `per_page`, etc. besides `search_keywords` that takes in the query. It returns a JSON data which has a property `html` that contains the actual result for the search term. Each result is wrapped in `li` tags. So the proper way to get data here is to send a POST request to the URL with the search term and use `cheerio` to extract the details from the `html` property.
