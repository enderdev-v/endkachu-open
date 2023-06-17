

module.exports = {
	subcommand: `utilidad.calc`,
	async run(client, int) {
		const n = int.options.getString(`numero`)
		const n1 = int.options.getString('numero2')
		const s = int.options.getString('signo')

		let resultado = eval(`${n} ${s} ${n1}`)
		int.reply({ embeds: [{ title: `La Operación matemática`, description: `${n} ${s} ${n1}`, fields: [{ name: `Resultado`, value: `${resultado}` }], color: 0x3f7ede }] })

	}
}