var fs = require('fs');
var latestNews = JSON.parse(fs.readFileSync('./data/news.json'));
var tips = JSON.parse(fs.readFileSync('./data/tips.json'));
var articles = JSON.parse(fs.readFileSync('./data/articles.json'));

/* GET news view */
const news = (req, res) => {
    res.render('news', { title: 'News - ', latestNews, tips, articles});
};

module.exports = {
    news
};