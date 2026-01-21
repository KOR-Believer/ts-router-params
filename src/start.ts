import { createStart } from '@tanstack/react-start'

export const startInstance = createStart(() => ({
  requestMiddleware: [],
  functionMiddleware: [],
}))

export const { router, startServer } = startInstance
