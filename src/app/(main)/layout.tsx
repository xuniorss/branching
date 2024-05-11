import { ReactNode } from 'react'

export default function MainLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<article className="flex h-full w-full flex-col items-center justify-center">
			<h1 className="select-none text-3xl text-white">Github Branch</h1>
			<main className="px-3 pt-7">{children}</main>
		</article>
	)
}
