const fs = require(`node:fs`)
const path = require("node:path")
module.exports = async (client) => {
const events = fs.readdirSync(`./eventos`)
for(const folders of events) {
	  const folder = fs.readdirSync(path.join(`./eventos`, folders))
  for (const file of folder) {
	  const event = require(path.join(`../eventos`, folders, file))
		client.on(event.name, async (...args) => event.run(client, ...args));
	}
}

}