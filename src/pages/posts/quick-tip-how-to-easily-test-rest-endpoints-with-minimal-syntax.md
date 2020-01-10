---
title: 'Quick tip: How to easily test rest endpoints with minimal syntax.'
date: 2020-01-10T14:00:41.651Z
thumb_img_path: /images/carbon(1).png
content_img_path: /images/carbon(1).png
template: post
---
When I write unit tests for APIs, I try to write tests that are as flexible and durable as possible. I try my best to avoid brittle tests that may break if some implementation in my code base should change. 

Ideally, tests should not care at all about the implementation, and only care that with X input, we get Y output. Some of your endpoints may return Laravel API Resources. I've seen some developers write tests that ensure that the resource is returned compared to a given shape / array. But, we don't really care about that, do we? We may change our API Resource class, but we want our test to stay resilient. 

In the example image above, we'll say we only really care that the `title` and `content` of a post is included in the API response. Other fields may change in our resource, but this test ensures that those two fields are always contained in the response. 

This is best achieved by using [assertJsonFragment](https://laravel.com/docs/5.8/http-tests#assert-json-fragment). You may have used \`assertJson()\` before, but since we are interested in creating as durable tests as possible, \`assertJsonFragment\` ensures the tests won't fail if the shape of our returned response changes.

In our scenario, we're mainly concerned that the post `title` and `content` are returned.

#### Examples

For now, this is passing with `assertJson()`.
```
// PostTest.php

        $this->get('/posts')->assertJson([
            'id'        =>  $post->id,
            'title'     =>  $post->title,
            'content'   =>  $post->content;
        ]);
```
with our API Resource looking like:

```
// PostResource.php

function toArray()
{
    return [
        'id'        =>  $this->id,
        'title'     =>  $this->title,
        'content'   =>  $this->content
    ];
}
```

But what if we add something to our resource class?

```
// PostResource.php

function toArray()
{
    return [
        'id'        =>  $this->id,
        'title'     =>  $this->title,
        'content'   =>  $this->content,
        'author'    =>  new UserResource($this->author)
    ];
}
```

**Suddenly, our test above will break, because the data return does not match our assertion exactly.** This is where `assertJsonFragment` comes in. The same test using `assertJsonFragment` will pass test, where our previous failed. 

```
// PostTest.php
﻿
        $this->get('/posts')->assertJsonFragment([
            'id'        =>  $post->id,
            'title'     =>  $post->title,
            'content'   =>  $post->content;
        ]);
// 💪 passes test!
```

We could write a test that ensures the array returned by `PostResource` matches the response returned by the API, but that would test our implemintation, not our business logic. The best tests ask the best questions. If we're primarily concerned with ensuring the response contains the important data that matters, then it's best to keep our tests as relevant & focused as possible. 

Happy testing!
