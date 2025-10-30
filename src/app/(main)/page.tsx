'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { formataBranch } from '@/utils/formata-branch'
import { tiposBranches } from '@/utils/tipo-branch'
import { useCallback, useEffect, useMemo, useState } from 'react'

// Hook para persistir estado no localStorage (client-only)
function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === 'undefined') return initialValue
		try {
			const raw = window.localStorage.getItem(key)
			return raw ? (JSON.parse(raw) as T) : initialValue
		} catch {
			return initialValue
		}
	})
	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch {}
	}, [key, value])
	return [value, setValue] as const
}

type BranchTipo = { tipo: string; cor: string }

export default function Home() {
	// Estados (mobile-first)
	const [branch, setBranch] = useState<string | undefined>(undefined)
	const [programador, setProgramador] = useLocalStorage<string>(
		'branch:programador',
		'',
	)
	const [taskNumber, setTaskNumber] = useState<string>('')
	const [task, setTask] = useState<string>('')

	const selectKey = branch ?? 'empty'

	const { toast } = useToast()

	const branchSelected: BranchTipo | undefined = useMemo(
		() => tiposBranches.find((b: BranchTipo) => b.tipo === branch),
		[branch],
	)

	const cor = branchSelected?.cor
	const slugProgramador = useMemo(
		() => formataBranch(programador ?? ''),
		[programador],
	)
	const slugTaskNumber = useMemo(
		() => formataBranch(taskNumber ?? ''),
		[taskNumber],
	)
	const slugTask = useMemo(() => formataBranch(task ?? ''), [task])

	const isValid = Boolean(
		branch && slugProgramador && slugTaskNumber && slugTask,
	)
	const preview = useMemo(() => {
		const b = branch ?? 'tipo'
		const p = slugProgramador || 'programador'
		const n = slugTaskNumber || 'número'
		const t = slugTask || 'tarefa'
		return `${b}/${p}-${n}-${t}`
	}, [branch, slugProgramador, slugTaskNumber, slugTask])

	const handleCopy = useCallback(() => {
		if (!isValid) {
			toast({
				title: 'Campos incompletos',
				description: 'Preencha todos os campos para copiar a branch.',
				variant: 'destructive',
			})
			return
		}
		navigator.clipboard
			.writeText(preview)
			.then(() => toast({ title: 'Branch copiada', description: preview }))
			.catch(() =>
				toast({
					title: 'Falha ao copiar',
					description: 'Tente novamente ou copie manualmente.',
					variant: 'destructive',
				}),
			)
	}, [isValid, preview, toast])

	const handleKeyDown = useCallback(
		(ev: React.KeyboardEvent) => {
			if (ev.key === 'Enter') handleCopy()
		},
		[handleCopy],
	)

	const handleClearAll = () => {
		setBranch(undefined)
		setTaskNumber('')
		setTask('')
	}

	const handleClearProgramador = () => {
		setProgramador('')
		toast({
			title: 'Nome limpo',
			description: 'O nome salvo foi removido deste navegador.',
		})
	}

	return (
		<section
			className="mx-auto w-full max-w-3xl p-4 sm:p-6"
			onKeyDown={handleKeyDown}
		>
			<header className="mb-4 space-y-1 sm:mb-6">
				<h1 className="text-center text-2xl font-semibold tracking-tight">
					↯ Github Branch
				</h1>
				<p className="text-muted-foreground text-center text-sm">
					Escolha o tipo, informe seu nome (salvo automaticamente), o
					número e o nome da task.
				</p>
			</header>

			{/* Form - mobile first: 1 coluna; expande em telas maiores */}
			<div className="grid gap-4 sm:gap-5">
				{/* Tipo */}
				<div className="grid gap-2">
					<label htmlFor="tipo" className="text-sm font-medium">
						Tipo de branch
					</label>
					<Select key={selectKey} value={branch} onValueChange={setBranch}>
						<SelectTrigger id="tipo" className="w-full">
							<SelectValue placeholder="Escolha..." />
						</SelectTrigger>
						<SelectContent>
							{tiposBranches.map((t: BranchTipo) => (
								<SelectItem
									key={t.tipo}
									value={t.tipo}
									className="text-base"
									style={{ color: t.cor }}
								>
									{t.tipo}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Programador */}
				<div className="grid gap-2">
					<div className="flex items-center justify-between">
						<label htmlFor="programador" className="text-sm font-medium">
							Programador
						</label>
						{/* Em telas pequenas vira botão separado para não “esmagar” o input */}
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={handleClearProgramador}
							className={cn('sm:hidden', !programador && 'invisible')}
						>
							Limpar
						</Button>
					</div>

					<div className="flex flex-col gap-2 sm:flex-row">
						<Input
							id="programador"
							name="programador"
							type="text"
							autoComplete="off"
							placeholder="Seu nome"
							value={programador}
							onChange={(ev) => setProgramador(ev.target.value)}
							aria-describedby="programador-help"
							className="min-w-0 flex-1"
						/>
						{/* Em telas médias+ fica ao lado, sem esmagar o input */}
						{programador && (
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={handleClearProgramador}
								className="hidden shrink-0 sm:inline-flex"
							>
								Limpar
							</Button>
						)}
					</div>

					<span
						id="programador-help"
						className="text-muted-foreground text-xs"
					>
						Salvo automaticamente neste navegador.
					</span>
				</div>

				{/* Nº e Nome da task (lado a lado a partir de sm) */}
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="grid gap-2">
						<label htmlFor="task-number" className="text-sm font-medium">
							Nº da task
						</label>
						<Input
							id="task-number"
							name="task-number"
							type="number"
							inputMode="numeric"
							autoComplete="off"
							placeholder="1234"
							value={taskNumber}
							onChange={(ev) => setTaskNumber(ev.target.value)}
							className="w-full"
						/>
					</div>

					<div className="grid gap-2">
						<label htmlFor="task-name" className="text-sm font-medium">
							Nome da task
						</label>
						<Input
							id="task-name"
							name="task-name"
							type="text"
							autoComplete="off"
							placeholder="corrigir-bug-de-login"
							value={task}
							onChange={(ev) => setTask(ev.target.value)}
							className="w-full"
						/>
					</div>
				</div>
			</div>

			{/* Preview / Ações */}
			<div
				className={cn(
					'mt-6 flex flex-col gap-3 rounded-2xl border p-4 transition-shadow focus-within:shadow-md',
				)}
				style={{ borderColor: cor }}
			>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<span className="text-sm font-medium">Preview</span>
					<div className="flex gap-2">
						<Button
							variant="ghost"
							className="cursor-pointer"
							size="sm"
							onClick={handleClearAll}
						>
							Limpar campos
						</Button>
						<Button
							type="button"
							onClick={handleCopy}
							disabled={!isValid}
							className={cn(
								'cursor-pointer select-none',
								!isValid && 'cursor-not-allowed opacity-60',
							)}
							style={{ color: isValid ? cor : undefined }}
							variant="outline"
						>
							Copiar
						</Button>
					</div>
				</div>

				<div
					className="mt-6 flex flex-col gap-3 rounded-2xl border p-4 transition-shadow focus-within:shadow-md"
					style={cor ? { borderColor: cor } : undefined}
				>
					<div
						aria-live="polite"
						className="bg-muted/50 rounded-xl p-3 font-mono text-sm"
					>
						<span className="break-all">
							<span style={{ color: cor }}>{branch ?? 'tipo'}</span>/
							{slugProgramador || 'programador'}-
							{slugTaskNumber || 'número'}-{slugTask || 'tarefa'}
						</span>
					</div>
				</div>

				{!isValid && (
					<p className="text-muted-foreground text-xs">
						Preencha todos os campos para habilitar o botão de copiar.
					</p>
				)}
			</div>
		</section>
	)
}
