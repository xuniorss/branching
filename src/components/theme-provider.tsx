'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children, ...props }: Readonly<any>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
