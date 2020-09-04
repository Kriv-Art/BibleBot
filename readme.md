# Bible Bot

[![Build Status](https://travis-ci.com/Kriv-Art/BibleBot.svg?branch=master)](https://travis-ci.com/Kriv-Art/BibleBot)

Git repo for [Bible Bot](https://t.me/bibilia_bot)

## Prerequisites

Before you can run this bot you must have the following

- Telegram bot token from @Botfather
- Nodejs >= 8.5.0
- yarn or npm
- api token from biblia.com

## Usage

Create a `.env` file in the root of the repo with the following details

```conf
BOT_NAME='Bible Bot 📖'
BOT_API=123:....

API='api token from biblia.com'

DEBUG=bot:*
```

then run the following commands

```sh
$ yarn
# or npm install
$ NODE_ENV='development' yarn dev
# or npm run dev
```
