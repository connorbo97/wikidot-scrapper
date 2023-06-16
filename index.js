const { createSpell } = require("./scripts/scrapeSpells");
const fs = require("fs");
const { fetchDocument } = require("./utils/fetchUtils");


const OUTPUT_FOLDER = 'outputConsts';
const getSpells = async () => {
  console.log("STARTING");
  const document = await fetchDocument("http://dnd5e.wikidot.com/spells");
  const tables = Array.from(document.getElementsByTagName("table"));

	fs.mkdir(`./${OUTPUT_FOLDER}`, { recursive: true }, (err) => {
		if (err) throw err;
	});

  console.log(`found ${tables.length} tables`);
  for(let i = 0; i < tables.length; i++) {
  // for (let i = 1; i === 1; i++) {
    const table = tables[i];
    const rows = Array.from(table.getElementsByTagName("tr")).splice(1);
    console.log(`found ${rows.length} rows for table ${i}`);

		let results = {}
    for (let j = 0; j < rows.length; j++) {
      const row = rows[j];
      const spellLink = row
        .getElementsByTagName("td")[0]
        .getElementsByTagName("a")[0].href;

      const [result, spellName] = await createSpell(spellLink, i);
  		// const fileName = `./output/${i}/${spellName}.json`;
			// fs.writeFileSync(fileName, JSON.stringify(result, null, '\t'));
			results[spellName.toUpperCase().replace(/-/g, '_')] = result;
    }
		fs.writeFileSync(`./${OUTPUT_FOLDER}/${i}.json`, JSON.stringify(results, null, '\t'));
  }
  console.log("DONE");
};

const main = async () => {
  try {
    await getSpells();
  } catch (err) {
    console.log(err);
  }
};
process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(0);
});

try {
  main();
} catch (err) {
  console.error(err);
}
