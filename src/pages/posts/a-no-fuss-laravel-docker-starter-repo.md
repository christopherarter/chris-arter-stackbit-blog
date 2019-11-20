---
title: 'A No Fuss Laravel & Docker Starter Repo '
date: 2019-11-20T17:17:38.936Z
thumb_img_path: /images/laravel-docker-starter.png
template: post
---
When I initially wanted to transition from Homestead & Vagrant to a containerized version of Laravel, I struggled to get it working. I Googled far and wide, and tried a ton of different "simple" walk throughs that were anything but. 

This repo is what I _wish_ I had run into during that search, and is now a good quick startup for developing Laravel applications. It's still a work in progress, so if you have suggestions to make it better (but still simple) I'm all ears, drop me a mention [@ChrisArter](https://twitter.com/ChrisArter).

To get started, head to [https://github.com/christopherarter/Quick-Laravel-Docker-Starter](https://github.com/christopherarter/Quick-Laravel-Docker-Starter)


Prerequisites:

1. **PHP 7.1 (minimum)**
2. **Composer** [install guide](https://getcomposer.org/doc/00-intro.md)
3. **Docker** [install guide](https://docs.docker.com/v17.09/engine/installation/)
4. **Docker Compose** [install guide](https://docs.docker.com/compose/install/)

### Get started

 
1. Clone this repo and navigate to the repo folder. Run `composer create-project --prefer-dist laravel/laravel my-app`
4. Run `mv my-app/* my-app/.* ./ && rm -rf my-app`
5. Change the values in your `.env` to the values below:

```
DB_CONNECTION=mysql
DB_HOST=laravel_db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel_user
DB_PASSWORD=myStrongPassword1234
```
 
The last step, run `docker-compose up`

When you run `docker ps`, you should see your service running locally at `http://localhost:9000`

**To run migrations and commands that interact with the database** you need to be inside the laravel web app container. 

Run `docker ps` and get the id of the laravel web container. Next, run `docker exec -it <container-id> /bin/bash` and you should be at `/var/www/app`. You may now run artisan commands to interact with the database.

### Connecting to your database with a database tool 

To connect with this database using tools like MySQL Workbench, DB Beaver or TablePlus, you can access it with the `3305` port, username and password you specified in your `.env` file.
