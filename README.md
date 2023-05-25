# movies-explorer-api

## Описание

Backend часть дипломного проекта на ЯндексПрактикум. Реализована аунтентификации и регистрация пользователей, добавление фильма и вывод фильмов пользователя. 
Создан для сервиса поиска фильмов **Movie Explorer**, в котором можно найти фильмы по ключевым словам.

**адрес домена сервера:**

IP 51.250.8.87

`https://api.movies.kreslin.nomoredomains.monster`

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Схемы и модели ресурсов API

### Поля схемы `user`:

Поле | Описание
-----|------------
email | Почта пользователя, по которой он регистрируется. Валидируется на соответствие схеме элекстронной почты.
password | Хеш пароля.
name | Имя пользователя.

### Поля схемы `movie`:

Поле | Описание
-----|------------
country | Страна создания фильма.
director | Режиссёр фильма.
duration | Длительность фильма. 
year | Год выпуска фильма. 
description | Описание фильма. 
image | Cсылка на постер к фильму. 
trailerLink | Cсылка на трейлер фильма. 
thumbnail | Миниатюрное изображение постера к фильму. 
owner | **_id** пользователя, который сохранил статью.
movieId | **id** фильма, который содержится в ответе сервиса **MoviesExplorer**. 
nameRU | Название фильма на русском языке. 
nameEN | Название фильма на английском языке. 

## Методы и роуты

Метод | Роут | Описание
----- |------|---------
GET | `/users/me` | возвращает **email** и **имя**
PATCH | `/users/me` | обновляет информацию о пользователе с переданными в `body` **email** и **имя**
POST | `/movies` | создаёт фильм с передаными в `body` **country**, **director**, **duration**, **year**, **description**, **image*, **trailer**, **nameRU**, **nameEN**, **movieId** и **thumbnail**
GET | `/movies` | возвращает все сохранённые пользователем фильмы
DELETE | `/movies/movieId` | удаляет сохранённый фильм по его **_id**
POST | `/signup` | создает пользователя с передаными в `body` **email**, **password**, **name**
POST | `/signin` | проверяет переданные в `body` **email** и **password** и возвращает **JWT**

## Используемые технологии 

* Expressjs
* nodemon
* MongoDB
* mongoose
* dotenv
* cors
* celebrate
* bcryptjs
* express-rate-limit
* winston
* express-winston
* helmet
* jsonwebtoken
* eslint
