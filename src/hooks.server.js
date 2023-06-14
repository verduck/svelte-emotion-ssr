import { renderStatic } from '$lib/server/renderer'

export const handle = (async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: async ({ html }) => {
			const { css, ids } = await renderStatic(html)
			const style = `<style data-emotion-css="${ids.join(' ')}">${css}</style>`
			return html.replace('%sveltekit.style%', style)
		}
	})

	return response
})