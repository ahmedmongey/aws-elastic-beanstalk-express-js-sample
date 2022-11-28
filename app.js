const express = require('express');
const app = express();
const port = 8080;

const fs = require('fs') // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple template engine
    const rendered = content.toString()
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`)
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})


app.listen(port);
console.log(`App running on http://localhost:${port}`);
