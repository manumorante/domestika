export type courseType = {
  id: string
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
    length: number
    page: {
      number: number
      size: number
      last: number
    }
  }
  data: courseType[]
}
