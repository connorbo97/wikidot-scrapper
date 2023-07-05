const BASE_URL = "http://dnd5e.wikidot.com";
const { fetchDocument } = require("../utils/fetchUtils");

const removePrefix = (val, prefix) => {
  return val.substr(prefix.length);
};

const statKeysAndPrefixes = [
  ["castingTime", "Casting Time: "],
  ["range", "Range: "],
  ["components", "Components: "],
  ["duration", "Duration: "],
];

const createFeat = async (link) => {
  console.log(`Scraping feat link ${link}`);
  const URL = `${BASE_URL}${link}`;

  let document;
  try {
    document = await fetchDocument(URL);
  } catch (err) {
    console.log(`Failed to parse ${URL}: ${err.toString()}`);
    return;
  }

  const header = document.getElementsByClassName("page-title page-header")[0];
  const content = document.getElementById("page-content");

  const children = Array.from(content.children);


  let source = children.shift();
  source = removePrefix(source.textContent, "Source: ")

  // const result = {
  //   name: header?.textContent,
  //   source,
  //   content: `<div>${children.map(tag => `<${tag.tagName.toLowerCase()}>${tag.innerHTML.replace(/\n/g, '').replace(/&nbsp;/g, '')}</${tag.tagName.toLowerCase()}>`).join('')}</div>`,
  // };
  const result = {
    name: header?.textContent,
    source,
    content: children.map(c => c.textContent).join('\n'),
  };

  const featName = link.split(":")[1];
  console.log(`finished parsing feat ${featName}`);

  return [result, featName];
};

module.exports = {
  createFeat,
};
