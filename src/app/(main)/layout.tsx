import { ReactNode } from 'react'

export default function MainLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<article className="flex h-full w-full flex-col items-center justify-center">
			<main className="px-3 pt-7">{children}</main>
		</article>
	)
}
