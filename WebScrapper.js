const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cheerio = require ("cheerio");
const rp = require ("request-promise");

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/example', (req, res) => {
    rp(req.body.linkname)
    .then(html => {
        var $ = cheerio.load(html);
     
        var itemTitle = $('div.column-block:nth-child(1) > div:nth-child(2) > a:nth-child(1) > h1:nth-child(1)').text().trim();
        var itemPrice = $('div.column-block:nth-child(1) > div:nth-child(3) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h3:nth-child(1)').text().trim()+"<br>" + "<br>";

        var i;
        var otherItemTitle = "";
        var otheritemPrice = "";

        for (i = 2; i <= 30; i++) {
            otherItemTitle += $('div.column:nth-child('+i+') > div:nth-child(2) > a:nth-child(1) > h1:nth-child(1)').text().trim() + "&nbsp;" + "&nbsp;" +
             $('div.column:nth-child('+i+')> div:nth-child(3) > ul:nth-child(1) > li:nth-child(1) > div:nth-child(1) > div:nth-child(1) > h3:nth-child(1)').text().trim()+ "<br>" + "<br>" ;

        }
     
        res.send(
            `<body style="margin:auto;width: 80%;border: 3px solid green; padding:0 10px;">
            <h1 style="color:white;background-color:black;margin:0 auto;margin-bottom:20px;width:90%;padding:10px;text-align:center;">URL Products</h1>`
            + itemTitle +"&nbsp;" +"&nbsp;" + itemPrice + otherItemTitle);

    })
    .catch(err=> {
        console.log(err);
    });
  
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});







