const { createSpell } = require("./scripts/scrapeSpells");
const fs = require("fs");
const { fetchDocument } = require("./utils/fetchUtils");
const { createFeat } = require("./scripts/scrapeFeats");
const { mapKeys } = require('lodash');


const OUTPUT_FOLDER = 'featOutput';
const generateFeats = async () => {
  console.log("STARTING");
  const document = await fetchDocument("http://dnd5e.wikidot.com");
  const publishedFeats = document.getElementById("toc69");
  const featsParent = publishedFeats.closest('.row')

  const links = Array.from(featsParent.getElementsByTagName('a')).map(a => a.href);
  // const links = [Array.from(featsParent.getElementsByTagName('a')).map(a => a.href).find(v => v.includes('piercer'))];

	fs.mkdir(`./${OUTPUT_FOLDER}`, { recursive: true }, (err) => {
		if (err) throw err;
	});

  // NORMAL OBJECT
  // const results = {}
  // for (let i = 0; i < links.length; i++) {
  //     const [result, featName] = await createFeat(links[i]);
	// 		results[featName.toUpperCase().replace(/-/g, '_')] = result;
  // }
  // fs.writeFileSync(`./${OUTPUT_FOLDER}/feats.json`, JSON.stringify(results, null, '\t'));

  // BASIC OBJECT
  const results = {}
  for (let i = 0; i < links.length; i++) {
      const [result, featName] = await createFeat(links[i]);
			results[featName.toUpperCase().replace(/-/g, '_')] = result;
  }
  fs.writeFileSync(`./${OUTPUT_FOLDER}/feats-basic.json`, JSON.stringify(mapKeys(results, (v,k) => `REPLACE_FRONT${k}REPLACE_BACK`), null, '\t'));


  
  // FEAT KEYS
  // fs.writeFileSync(`./${OUTPUT_FOLDER}/featkeys.ts`, `export enum FEATS {\n${links.map(l => {
  //   const featName = l.split(":")[1];
  //   const featKey = featName.toUpperCase().replace(/-/g, '_')
  //   console.log(l, featName, featKey);

  //   return `\t${featKey} = '${featKey}',`
  // }).join('\n')}\n}`);
};

module.exports = {
  generateFeats,
}