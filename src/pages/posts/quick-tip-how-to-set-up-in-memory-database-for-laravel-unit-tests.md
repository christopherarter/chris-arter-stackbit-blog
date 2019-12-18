---
title: 'Quick tip: How to set up in-memory database for Laravel unit tests'
date: 2019-12-18T02:16:15.356Z
template: post
---
Here's a quick tip on how to use an in-memory database for unit testing, more specifically, the RefreshDatabase trait.

First, add a new connection in your `/config/database.php`

```
'sqlite_testing' => [
    'driver'    => 'sqlite',
    'database'  => ':memory:',
    'prefix'    => ''
]
```

Next, head over to your phpunit.xml file and set this property:

```
<server name="DB_CONNECTION" value="sqlite_testing"/>
```

Now, you should be able to just run your test command and use your in-memory database to run unit tests.
