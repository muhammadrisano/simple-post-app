<h1 align="center">Simple Post App</h1>
<p align="center">
  Build with Laravel Sanctum & Next JS
</p>

## Requirements
- PHP 8.3
- composer
- Node JS
- Postgre SQL 


## Usage for development
1. Open your terminal or command prompt
2. Type `git clone https://github.com/muhammadrisano/simple-post-app.git`
3. Open the folder be-post-app `composer install` for install dependencies
4. Open the folder fe-post-app `npm install` for install dependencies
5. Create Environment Variable [here](#create-environment-variable)
6. Before run this, you must run backend and migrate & seed `php artisan migrate --seed`


## Create Environment Variable

```
$ cp .env.example .env
$ nano .env
```

```
# Set ENV FOR BACKEND
DB_CONNECTION=pgsql
DB_HOST=YOUR_DB_HOST
DB_PORT=YOUR_DB_PORT
DB_DATABASE=YOUR_DB_DATABASE
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000,localhost,127.0.0.1
SESSION_DOMAIN=localhost 
```

```
# Set ENV FOR FRONTEND
NEXT_PUBLIC_API_URL= YOUR_API_URL

```

## Documentasi
- Postman Collection
https://documenter.getpostman.com/view/7675329/2sBXiomVQj


## Noted
- Backend
* menggunakan Laravel Sanctum dan perlu menjadilan kan migration dan seeder (untuk mengisi record di table post_category)



