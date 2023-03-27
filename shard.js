const { ShardingManager } = require('discord.js');
const chalk = require('chalk');
const shards = new ShardingManager('./index.js', {
	token: process.env.token,
	totalShards: 1
});
shards.on('shardCreate', shard =>
	console.log(
		chalk.bold.green`Shards ━━━━━━━━━━━┓ \n`,
		chalk.bold.green`║ \n`,
		chalk.bold.green`║`,
		chalk.bold.white`Shard ${shard.id} Lanzada \n`,
		chalk.bold.green`║`,
		chalk.bold.white`${String(new Date().toLocaleString())} \n`,
		chalk.bold.green`║\n`,
		chalk.green`┗━━━━━━━━━━━━━━━┛`
	)
);
shards.spawn({ amount: shards.totalShards, delay: 5500, timeout: 30000 });
