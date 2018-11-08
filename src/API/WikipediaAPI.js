
// Simple API class for Wikipedia. More broad information about Wikipedia's APIs are available here:
// - basic search: https://www.mediawiki.org/wiki/API:Search_and_discovery#Wikipedia
// - Wikimedia REST API: https://en.wikipedia.org/api/rest_v1/#!/Page_content/

class WikipediaAPI {
    constructor(lang) {
        this.lang = lang;
        this.format = "json";
        this.formatversion = 2;
        this.wikiURLPrefix = `https://${this.lang}.wikipedia.org`;
    }

    search(query) {
        const urlStr = `${this.wikiURLPrefix}/w/api.php`;
        // action=query&list=search&srsearch=Notre Dame de Paris&format=json&formatversion=2
        const params = {
            action: "query",
            list: "search",
            srsearch: query,
            format: this.format,
            formatversion: this.formatversion,
            "origin": "*"
        };
        const qString = Object.keys(params).map(k => `${k}=${params[k]}`).join("&");
        const url = new URL(`${urlStr}?${qString}`);
        return fetch(url, {
            mode: "cors"
        })
            .then((response) => {
                // TODO better error handling in the future
                return response.json();
            })
            .then(data => {
                return new Promise((resolve, reject) => {
                    if (!data["query"]) {
                        reject("No data");
                        return;
                    }
                    resolve(data["query"]["search"]);
                });
            }).catch(e => {
                console.log(`Error searching data from Wikipedia ${e}`);
                alert("Error searching data from Wikipedia");
            })
    }

    getPageSummary(title) {
        const urlStr = `${this.wikiURLPrefix}/api/rest_v1/page/summary/${title}`;
        const url = new URL(urlStr);
        return fetch(url)
            .then(response => {
                return response.json();
            }).catch(e => {
                console.log(`Error obtaining page summary data from Wikipedia ${e}`);
                alert("Error obtaining page summary data from Wikipedia");
            })
    }
};


export default WikipediaAPI;
