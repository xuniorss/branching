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
import { useCallback, useEffect, useState } from 'react'

export default function Home() {
	const [branch, setBranch] = useState<string | null>(null)
	const [cor, setCor] = useState('#fff')
	const [name, setName] = useState({
		programador: '',
		taskNumber: '',
		task: '',
	})

	const { toast } = useToast()

	const branchSelected = tiposBranches.find((b) => b.tipo === branch)

	useEffect(() => {
		if (branchSelected) setCor(branchSelected.cor)
		else setCor('#fff')
	}, [branchSelected])

	const handleCopy = useCallback(() => {
		if (
			!branch &&
			name.programador &&
			name.taskNumber === '' &&
			name.task === ''
		)
			return

		const text = `${branch}/${formataBranch(name.programador)}-${name.taskNumber}-${formataBranch(name.task)}`

		if (text.length > 0) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					toast({
						title: 'Branch copiada',
						description: text,
					})
				})
				.catch((err: any) => {
					console.error(err)
				})
		}
	}, [branch, name.programador, name.task, name.taskNumber, toast])

	return (
		<section className="flex flex-col space-y-4">
			<div className="flex flex-row items-center justify-center space-x-2">
				<Select
					onValueChange={(v) => {
						setBranch(v)
					}}
				>
					<SelectTrigger className="w-[18.75rem]" style={{ color: cor }}>
						<SelectValue placeholder="Escolha..." />
					</SelectTrigger>
					<SelectContent>
						{tiposBranches.map((t) => (
							<SelectItem
								className="text-base"
								style={{ color: t.cor }}
								key={t.tipo}
								value={t.tipo}
							>
								{t.tipo}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<span className="text-2xl">/</span>
				<Input
					name="programador"
					type="text"
					autoComplete="off"
					placeholder="Programador"
					onChange={(ev) => {
						const { value } = ev.target
						setName((prev) => ({
							...prev,
							programador: value,
						}))
					}}
				/>
				<span className="text-2xl">-</span>
				<Input
					name="task-number"
					type="number"
					autoComplete="off"
					placeholder="Número da task"
					onChange={(ev) => {
						const { value } = ev.target
						setName((prev) => ({
							...prev,
							taskNumber: value,
						}))
					}}
				/>
				<span className="text-2xl">-</span>
				<Input
					name="task-name"
					type="text"
					autoComplete="off"
					placeholder="Nome da task"
					onChange={(ev) => {
						const { value } = ev.target
						setName((prev) => ({
							...prev,
							task: value,
						}))
					}}
				/>
			</div>
			<div className="flex flex-row">
				{(branch || name.programador || name.taskNumber || name.task) && (
					<Button
						type="button"
						className={cn(
							'mt-5 flex w-full select-none flex-row items-center justify-center rounded-md border bg-transparent p-3 hover:bg-transparent',
							branch && name.programador && name.taskNumber && name.task
								? 'cursor-pointer'
								: 'cursor-not-allowed',
						)}
						style={{ borderColor: cor, color: cor }}
						onClick={
							branch && name.programador && name.task
								? handleCopy
								: undefined
						}
					>
						<p>{branch}</p>/<p>{formataBranch(name.programador)}</p>-
						<p>{formataBranch(name.taskNumber)}</p>-
						<p>{formataBranch(name.task)}</p>
					</Button>
				)}
			</div>
		</section>
	)
}
