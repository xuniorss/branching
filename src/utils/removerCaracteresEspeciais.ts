export const removerCaracteresEspeciais = (texto: string): string => {
	let textoSemEspacos = texto.replace(/\s+/g, '-')

	textoSemEspacos = textoSemEspacos.replace(/-{2,}/g, '-')

	textoSemEspacos = textoSemEspacos
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[çÇ]/g, 'c')

	textoSemEspacos = textoSemEspacos.replace(/\//g, '-')

	const regex = /[^a-zA-Z0-9/-]/g

	textoSemEspacos = textoSemEspacos.replace(regex, '')

	return textoSemEspacos
}
