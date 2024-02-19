import mongo from "mongoose";
import chalk from "chalk";

module.exports = () => {
	mongo.connect(process.env.MongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as mongo.ConnectOptions).then(() => {
		console.log(chalk.bold.green`conectado correctamente a Mongo DB`);
	}).catch((e) => {
		console.log(chalk.bold.red`ocurrió un error al conectarse a MongoDB : ${e}`);

	});

};