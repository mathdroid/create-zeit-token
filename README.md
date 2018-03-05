# create-zeit-token

This is a Node module to obtain a new ZEIT token for a supplied account. The implementation is based on `puppeteer` and `EventEmitter`

## Usage

```bash
npm install create-zeit-token
```

Then use it like this example:

```js
const T = new CreateZeitToken("example@gmail.com");

T.getSecurityCode().then(async code => {
  console.log(code); // Security code is usually in the form of Adjective-Animal
});

T.on("token", token => {
  console.log(`token is ${token}`);
});
```

## API

### class: CreateZeitToken

```js
const z = new CreateZeitToken("example@gmail.com");

z.getSecurityCode().then(async code => {
  console.log(code); // Security code is usually in the form of Adjective-Animal
});

z.on("token", token => {
  console.log(`token is ${token}`);
});
```

### z.getSecurityCode(opts)

* `opts` \<Object> a puppeteer options object
* returns \<Promise\<String>>

### z.resetSession()

* returns \<Promise>

Creates a new browser session which will create new Security Code

### event: 'token'

* \<String> Bearer Token

Emitted when Puppeteer first detects a valid `Authorization` header.

## Roadmap

* [ ] Allows named token instead of `Chrome (Browser)` coming from Puppeteer
* [ ] Use direct API if possible?
* [ ] API documentation

## License

MIT.
