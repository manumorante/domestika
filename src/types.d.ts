export type courseType = {
  attributes: {
    title: string
    shortDescription: string
    description: string
    cover: {
      original: string
    }
  }
}

export type resultsType = {
  meta: {
    totalItems: number
    page: {
      number: number
      size: number
      last: number
    }
  }
  data: courseType[]
}
