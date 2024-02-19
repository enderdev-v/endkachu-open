const { ShardingManager } = require('discord.js');
const chalk = require('chalk');
const shards = new ShardingManager('./index.js', {
	token: process.env.token,
	totalShards: 1
});
shards.on('shardCreate', shard =>
	console.log(chalk.bold.blue`Shard: ${shard.id} cargado`)
);
shards.spawn({ amount: shards.totalShards, delay: 5500, timeout: 30000 });
