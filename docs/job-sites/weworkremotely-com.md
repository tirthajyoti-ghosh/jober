# Findings on data collection from weworkremotely.com

- weworkremotely.com has an API but getting all jobs or search jobs through the API is not supported. The API (<https://weworkremotely.com/api>) only supports creating, updating and displaying **a** job.

- So there is no choice but to scrape the jobs from there site directly. Luckily, their site is server-rendered and the jobs are in a nice table.

- They also have a structured search URL (<https://weworkremotely.com/remote-jobs/search>) with appropriate query string parameters such as `term`, `categories`, `region`, `company`, and `job_listing_type`. The `term` parameter being the most important here as we can put anything in it - skills, position, etc.
