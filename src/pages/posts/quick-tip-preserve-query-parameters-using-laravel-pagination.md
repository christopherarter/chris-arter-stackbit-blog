---
title: "Quick Tip: Preserve Query Parameters using Laravel Pagination"
date: 2020-07-26T20:42:40.715Z
thumb_img_path: /images/laravelmug.jpg
template: post
---
Hi all!

Just sharing a quick tip I just picked up. 

I was working on a proof of concept for a simple parametric search endpoint for an API. This endpoint receives a number of optional request parameters used to filter the request response. I noticed that using Laravel's built-in paginator worked great, *however* the `next_page_url` was still returning `/api/search?page=1"` without any of the query parameters passed to the search method initially. This is problem, because on subsiquent "next" page requests, the parameters would be removed returning unfiltered results.

Thanks to [this response](https://stackoverflow.com/a/38402859) the solution was incredibly easy to implement:

```
return $query->paginate()->appends( $request->query() );
```

This appends the pagination object with the query parameters from the inbound request, so all subsiquent `next_page_url` and `previous_page_url` will also retain the initial query parameters.

Just a quick tip, hope this helps 👍