# Polka EJS
Adds [ejs](https://ejs.co) template engine support to [polka](https://github.com/lukeed/polka)

## Install

```sh
npm install polka-ejs
```

## Usage

```js
const polka = require("polka");
const ejs = require("polka-ejs");

const app = polka();

app.use(ejs());

app.get("/", (req, res) => {
  res.render("index.ejs", { number: 5 });
});

app.listen(3000);
```

Create a `views/index.ejs` with the following

```html
<html>
  <body>
    <h1>The Number is <%= number %></h1>
  </body>
</html>
```

Now visiting `http://localhost:3000` will display the number `5` on the page!

## Options
All options with their default values.

```js
app.use(ejs({
  views: path.join(process.cwd(), "views"),
  cache: process.env.NODE_ENV === "production",
  contentType: "text/html",
  status: 200,
  ext: "ejs",
  options: {}
}));
```

Options can be overriden per call basis aswell

```js
res.render("index", {
  views: path.join(__dirname, "secretViewsJustForThisRoute"),
  status: 500,
  contentType: "text/html",
  cache: false,
  ext: "html",
  options: {}
});
```

Few things to note

- ext is used if the extension is not provided in the render call, i.e lets you make views/index.html and if ext is set to `html` just `res.render("index")` is enough.
- Cache uses the simple in memory cache that comes with ejs to override this `require()` ejs and change the value of `ejs.cache` like examples in their readme
- Could possibly work with other frameworks if they have a similar style of middleware but i haven't seen any.

## License
MIT
