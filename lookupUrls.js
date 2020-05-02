const rp = require('request-promise');
const $ = require('cheerio');

const SPRINGER_BASE_URL = "https://link.springer.com";
const urlPromises = Array(24).fill(undefined);

async function getUrls(page) {
    const FREE_BOOKS_URL = SPRINGER_BASE_URL + `/search/page/${page}?showAll=true&package=mat-covid19_textbooks&facet-content-type=%22Book%22&sortOrder=newestFirst`
    return rp(FREE_BOOKS_URL)
        .then((html) => {
            const resultList = $('.content-item-list', html);
            const as = $('.text .title', resultList)
            const aAttributes = Object.values(as).map(a => a.attribs).filter(val => !!val)
            return aAttributes.map(attr => attr.href)
        }).catch(e => {
            console.log(e)
        })
}

for(let page = 1; page < 25; page++) {
    urlPromises[page - 1] = getUrls(page)
}

Promise.all(urlPromises)
    .then(urls => {
        let list = urls.flat();
        console.log(list.map(str => {
            str.split
        }))
        list = list.map(l => `${SPRINGER_BASE_URL}${l}`)
        const set = new Set(list);
        console.log(`List length: ${list.length}`)
        console.log(` Set Lenght: ${set.size}`)
    })
