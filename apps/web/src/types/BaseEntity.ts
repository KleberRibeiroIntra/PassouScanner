export interface BaseEntity {
  id: string
  createdAt: string
  createdBy?: string
  updatedAt: string | null
  updatedBy?: string | null
  active: boolean
}
