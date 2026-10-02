import { z } from 'zod'

export const crudListSearchSchema = z.object({
  page: z.number().int().min(0).optional().catch(undefined),
  search: z.string().optional().catch(undefined),
})
