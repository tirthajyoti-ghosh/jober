# Findings on data collection from weworkremotely.com

- weworkremotely.com has an API but getting all jobs or search jobs through the API is not supported. The API (<https://weworkremotely.com/api>) only supports creating, updating and displaying **a** job.

- So there is no choice but to scrape the jobs from there site directly. Luckily, their site is server-rendered and the jobs are in a nice table.

- They also have a structured search URL (<https://weworkremotely.com/remote-jobs/search>) with appropriate query string parameters such as `term`, `categories`, `region`, `company`, and `job_listing_type`. The `term` parameter being the most important here as we can put anything in it - skills, position, etc.

- weworkremotely.com has a server-rendered job details page like other remote job sites. And also like any other job sites, they don't have any structured HTML element structure to display data such as company description, job duties, etc.

  This might be because these sites provides rich text editor to job posters and the content is saved as is in their database. So a proper system should be set up on my end to properly format the response from my API. Need a lot of research.
