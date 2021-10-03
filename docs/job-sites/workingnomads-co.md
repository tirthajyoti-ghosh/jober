# Findings on data collection from workingnomads.co

- workingnomads.co fortunately has an API that they use themselves to display data in their Angular front-end. Sending a GET request to <https://www.workingnomads.co/jobsapi/job/_search> with proper parameters sends us well formatted JSON data. Among other query string parameters, `q` and `_source` are the most important ones I think.
  - The `q` parameter takes in a search term which we can use in our search endpoint. This **search term MUST HAVE a star (*) at the end of it**, something I noticed. This parameter can also be used GET jobs of a certain category by using this format - `(category_name.raw:"{{category}}")`. Removing this parameter entirely from the request would result in the API sending all types of jobs. This is equivalent to visiting <https://www.workingnomads.co/jobs> in the browser.
  - The `_source` parameter indicates what properties of each job should the back-end send on each request. An example is:

    ```sh
    _source: 'company,category_name,description,location_base,salary_range,salary_range_short,instructions,id,external_id,slug,title,pub_date,tags,source,apply_url,premium,expired,use_ats,position_type'
    ```

    In the above example you can see `company`, `location_base`, `title`, etc. comma (,) separated properties being sent along with the GET request. It means that these data points will be sent back to us from the API.
