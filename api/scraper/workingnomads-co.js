const axios = require('axios');

const data = [];
axios.get('https://www.workingnomads.co/jobsapi/job/_search?sort=expired:asc,premium:desc,pub_date:desc&_source=company,category_name,description,location_base,salary_range,salary_range_short,instructions,id,external_id,slug,title,pub_date,tags,source,apply_url,premium,expired,use_ats,position_type&size=100&from=0&q=(category_name.raw:%22Development%22)')
    .then((response) => {
        response.data.hits.hits.forEach((item) => {
            // eslint-disable-next-line no-underscore-dangle
            const job = item._source;
            const jobTitle = job.title;
            const jobType = job.position_type === 'ft' ? 'Full-time' : 'Contract';
            const jobRegion = job.location_base;
            const jobURL = `https://www.workingnomads.co/jobs/${job.slug}`;
            const jobTags = job.tags.map((tag) => `https://www.workingnomads.co/remote-${tag}-jobs`);

            const companyTitle = job.company;

            data.push({
                job: {
                    title: jobTitle,
                    type: jobType,
                    tags: jobTags,
                    region: jobRegion,
                    url: jobURL,
                },
                company: {
                    title: companyTitle,
                },
            });
        });

        console.log(data);
    })
    .catch((error) => console.log(error));
