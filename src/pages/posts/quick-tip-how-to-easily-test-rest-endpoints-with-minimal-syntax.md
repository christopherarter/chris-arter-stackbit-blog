---
title: 'Quick tip: How to easily test rest endpoints with minimal syntax.'
date: 2020-01-10T14:00:41.651Z
thumb_img_path: /images/carbon.png
content_img_path: /images/carbon.png
template: post
---
When I write unit tests for APIs, I try to write tests that are as flexible and durable as possible. I try my best to avoid brittle tests that may break if some implimentation in my code base should change. 

Ideally, tests should not care at all about the implimentation, and only care that with X input, we get Y output. Some of your endpoints may return Laravel API Resources. I've seen some devs write tests that ensure that the resource is returned compared to a given shape / array. But, we don't really care about that, do we? We may change our API Resource class, but we want our test to stay resilient. 

In the example image above, we'll say we only really care that the ID of a post is included in the API response. Other fields may change in our resource, but this test ensures that the ID is always contained in the response. 

This is best achieved by using [assertJsonFragment](https://laravel.com/docs/5.8/http-tests#assert-json-fragment). You may have used \`assertJson()\` before, but since we are interested in creating as durable tests as possible, \`assertJsonFragment\` ensures the tests won't fail if the shape of our returned response changes.
