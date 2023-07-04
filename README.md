# WA-VERIFY

### What

Tool to verify the existence of a phone number on Whatsapp.

### How

Uses Whatsapp Web to verify if the number has an associated Whatsapp account without sending a message.

### Why

Built for personal use. It can be extended to check phone numbers in bulk.

### How To Use

Install Dependencies:

```
npm install
```

Initiate login on Whatsapp:

```
npm run login
```

Convert csv to json using https://csvjson.com/csv2json, add array to variable numbers in data/Numbers.js

```
npm run check 
```


valid number will appear in data.csv

***Note*** Phone Number format is (**Country Prefix without**)(Phone Number Digits)

***Caution*** Using this method to verify numbers in bulk can result in the logged in number being banned by WhatsApp
