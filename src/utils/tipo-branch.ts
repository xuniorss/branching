export interface TiposBranches {
	tipo: string
	cor: string
	descricao: string
}

export const tiposBranches: TiposBranches[] = [
	{
		tipo: 'feature',
		cor: '#7FFF00',
		descricao: 'Para adicionar uma nova funcionalidade.',
	},
	{
		tipo: 'bugfix',
		cor: '#FF0000',
		descricao: 'Para corrigir um bug específico.',
	},
	{
		tipo: 'hotfix',
		cor: '#FFA500',
		descricao: 'Para correções urgentes em produção.',
	},
	{
		tipo: 'release',
		cor: '#ADD8E6',
		descricao: 'Para preparar uma versão para lançamento.',
	},
	{
		tipo: 'support',
		cor: '#A52A2A',
		descricao: 'Para corrigir problemas em uma versão de suporte específica.',
	},
	{
		tipo: 'refactor',
		cor: '#FFC0CB',
		descricao:
			'Para refatorar o código sem adicionar ou alterar funcionalidades.',
	},
	{
		tipo: 'docs',
		cor: '#D2B48C',
		descricao: 'Para atualizar ou adicionar documentação.',
	},
	{
		tipo: 'test',
		cor: '#FFFF00',
		descricao: 'Para adicionar ou modificar testes.',
	},
	{
		tipo: 'experimental',
		cor: '#9370DB',
		descricao: 'Para testar ideias ou funcionalidades experimentalmente.',
	},
]
