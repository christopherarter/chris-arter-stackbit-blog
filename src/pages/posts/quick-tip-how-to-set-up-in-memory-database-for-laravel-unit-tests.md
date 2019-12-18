---
title: 'Quick tip: How to set up in-memory database for Laravel unit tests'
date: 2019-12-18T02:16:15.356Z
thumb_img_path: /images/screen-shot-2019-12-17-at-9.42.15-pm.png
content_img_path: /images/screen-shot-2019-12-17-at-9.42.15-pm.png
template: post
---
If you're using the `RefreshDatabase` trait, this is how I set up my unit tests that require a database to use an in-memory database using SQLite. Using an in-memory database simplifies our testing process and does not require us to set up additional testing databases.

Here's a quick tip on how to use an in-memory database for unit testing:

**1. First, add a new connection in your `/config/database.php`**

```
'sqlite_testing' => [
    'driver'    => 'sqlite',
    'database'  => ':memory:',
    'prefix'    => ''
]
```

** 2. In your your `phpunit.xml` file and set this property:**

```
<server name="DB_CONNECTION" value="sqlite_testing"/>
```

** 3. Clear config cache **

Don't forget to clear configuration cache after we added our new SQLite connection above using `php artisan config:cache`, which will clear & re-cache your application configs.

Now, you should be able to just run your test command and use your in-memory database to run unit tests.

Happy testing 🤘
