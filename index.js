const { generateSpells } = require("./generateSpells");

const main = async () => {
  try {
		const type = process.argv[2];
		if (type === 'SPELLS') {
			console.log('starting spells');
			return await generateSpells();
		}
		
		console.log("No scrapper found")
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
