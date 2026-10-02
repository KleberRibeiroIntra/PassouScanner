export const FilterCondition = {
  Equal: 13,
  NotEqual: 35,
  GreaterThan: 15,
  GreaterThanOrEqual: 16,
  LessThan: 20,
  LessThanOrEqual: 21,
  Contains: 70,
} as const

export type FilterCondition = (typeof FilterCondition)[keyof typeof FilterCondition]

export const QueryOperator = {
  And: 2,
  Or: 36,
} as const

export type QueryOperator = (typeof QueryOperator)[keyof typeof QueryOperator]

export interface PropertyFilter {
  name: string
  condition: FilterCondition
  value: string | number | boolean | null | Array<string | number>
}

export interface PropertySort {
  name: string
  order: 'asc' | 'desc'
}

export interface DynamicQuery {
  pageNumber?: number
  pageSize?: number
  operator?: QueryOperator
  filter?: PropertyFilter[]
  orderBy?: PropertySort[]
}

export interface DynamicQueryResult<T> {
  pageSize: number
  pageNumber: number
  totalRows: number
  result: T[]
}
