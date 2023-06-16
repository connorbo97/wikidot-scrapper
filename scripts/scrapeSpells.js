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

const createSpell = async (link, level) => {
  console.log(`Scraping spell link ${link}`);
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

  let [spacer, source, type, stats, ...rest] = children;
  // delete the spacer at the end of the content
  rest.splice(rest.length - 1, 1);
  source = source.textContent
  type = type.textContent
  stats = stats.textContent

  const statsInPieces = stats.split("\n");
  const statsToSpread = {};

  statsInPieces.forEach((curStr) => {
    statKeysAndPrefixes.forEach(([key, prefix]) => {
      if (curStr.startsWith(prefix)) {
        statsToSpread[key] = removePrefix(curStr, prefix);
      }
    });
  });

  let higherLevels;
  let spellLists;

  if (rest[rest.length - 1].textContent.startsWith("Spell Lists. ")) {
    spellLists = removePrefix(rest[rest.length - 1].textContent, "Spell Lists. ");
    rest.splice(rest.length - 1, 1);
  }
  
  if (rest[rest.length - 1].textContent.startsWith("At Higher Levels. ")) {
    higherLevels = removePrefix(rest[rest.length - 1].textContent, "At Higher Levels. ");
    rest.splice(rest.length - 1, 1);
  }

  const description = `<div>${rest.map(tag => `<${tag.tagName.toLowerCase()}>${tag.innerHTML.replace(/\n/g, '').replace(/&nbsp;/g, '')}</${tag.tagName.toLowerCase()}>`).join('')}</div>`;

  const result = {
    name: header?.textContent,
    source: removePrefix(source, "Source: "),
    type: (level === 0 ? type.split(" ")[0] : type.split(" ")[1]).toUpperCase(),
    level,
    description,
    higherLevels,
    spellLists,
    ...statsToSpread,
  };

  const spellName = link.split(":")[1];
  console.log(`finished parsing spell ${spellName}`);

  return [result, spellName];
};

module.exports = {
  createSpell,
};
