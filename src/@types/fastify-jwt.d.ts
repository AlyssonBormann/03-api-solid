import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface Fastify {
    user: {
      sub: string
    }
  }
}
