import { removerCaracteresEspeciais } from './removerCaracteresEspeciais'

export const formataBranch = (text: string): string => {
	return removerCaracteresEspeciais(text).toLowerCase()
}
