---
title: 'Introducing Laravel Resourceable'
date: 2020-4-5
thumb_img_path: /images/laravel-resourceable.png
content_img_path: /images/laravel-resourceable.png
template: post
excerpt: "A new package for retrieving a model's API Resource class."
---
Almost all of the packages I write are born out of my own necessity for them, and this is no exception. I wrote this package to mainly help with writing more accurate HTTP tests.

**TL;DR**

<a href="https://github.com/christopherarter/laravel-resourceable">Laravel Resourceable</a> is a package that allows you to retrieve a model's API resource by naming convention. e.g. `$user->toResourceArray()` would return the array representation of it's json shape from `UserResource` API Resource class. This is useful for writing accurate HTTP response tests.

### What are Laravel API Resources?

Laravel provides a really handy tool called API Resources, that are simply a layer between your Eloquent models and the actual JSON responses from your API.

They provide a way to return a consistent response shape for your models and collections, without having to shape the responses manually with eloquent.

This is an example provided from the documentation, which we will use for a hypothetical situation. In our scenario, we have a **User** model, a **UserResource** class, a **UserController** and a **UserTest** unit HTTP test.


```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'email'      => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

```

This ensures no extraneous data will be returned, like pivot table relations. It allows you to return consistent, predictable shapes from your API. This makes documentation much easier, as you can change your implementation without changing your responses at all. 

In our scenario, here is a standard controller method for returning a single user from the database.

```php 

public function show(Request $request, User $user) {
    return new UserResource($user);
}

```

### Testing

Predictable response shapes make HTTP testing much easier. A very good approach is to test for the minimum required data in the response, and disregard the shape entirely. 

```php
// tests/Unit/UserApiTests.php

$user = factory(\App\User::class)->create();
$this->withHeaders([
            'Accept' => 'application/json',
        ])
    ->get( route('users.show', [$user]))
    ->assertJsonFragment([
        'id'     => $user->id,
        'email'  => $user->email,
        ]);

```

Notice that this test isn't concerned with the shape of the response. It only tests whether the minimum required data is present in the request. **However, if we want to ensure our response is a consistent shape, and that the response accurately reflects the data in the database, it gets more complicated.**

```php
// tests/Unit/UserTest.php

$user = factory(\App\User::class)->create();
$this->withHeaders([
            'Accept' => 'application/json',
        ])
    ->get( route('users.show', [$user]))
    ->assertJsonFragment($user->toArray());

```

Suddenly, **our test is failing.** This is because our test is asserting our response will include json from the model's `toArray()` method, but it will not, because in our example, **our endpoint is returning the User's API Resource**.

### Laravel Resourceable

This is what Laravel Resourceable was created to do: return an array representation of a model's API resource.

```php
// tests/Unit/UserTest.php

$user = factory(\App\User::class)->create();
$this->withHeaders([
            'Accept' => 'application/json',
        ])
    ->get( route('users.show', [$user]))
    ->assertJsonFragment($user->toResourceArray());
```

Oh snap! Our tests are passing again! This method allows us to change the API Resource class without breaking our current tests. It ensures that our tests are durable & accurate. 

So, **if we add more properties to our `UserResource` class, our test above will still pass.**

By default, Laravel Resourceable uses a common naming convention of the class name + "Resource" on the end, however, you may also pass in a custom class:

```php
$user->toResourceArray(AlternateUserResource::class);
```

This package is still in its alpha phase of testing, and please feel welcome to open an issue or PR. The idea behind this package is to ensure we write durable and accurate HTTP tests for our Laravel API applications.
