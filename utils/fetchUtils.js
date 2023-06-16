const { default: fetch } = require("node-fetch");
const { JSDOM } = require("jsdom");

const fetchDocument = async (url) => {
    const html = await fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      return html;
    })
    .catch((err) => {
      console.warn("Something went wrong.", err);
      throw err;
    });
    

    const dom = new JSDOM(html);
    const document = dom.window.document;
    return document
}

module.exports = {
  fetchDocument
}