export const removerCaracteresEspeciais = (texto: string): string => {
	let textoSemEspacos = texto.replace(/[\s_]+/g, '-')

	textoSemEspacos = textoSemEspacos
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')

	textoSemEspacos = textoSemEspacos.replace(/[^a-zA-Z0-9-]/g, '-')
	textoSemEspacos = textoSemEspacos.replace(/-{2,}/g, '-')
	textoSemEspacos = textoSemEspacos.replace(/^-+|-+$/g, '')

	return textoSemEspacos
}
