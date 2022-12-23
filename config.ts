import { getPreferenceValues } from '@raycast/api'

// https://stg.domestika.org/api
interface Preferences {
  hostPath: string
}

const preferences = getPreferenceValues<Preferences>()

export const paths = {
  host: preferences.hostPath,
}

// const today = (new Date).toISOString()
// const pageNumber = `page[number]=1`
// const pageSize = `&page[size]=18`
// const hideOpenCourse = `&filter[hideOpenCourse]=false`
// const openForPlus = `&filter[openForPlusUntil:min]=${today}&filter[openForPlusFrom:max]=${today}`
// const sort = `&sort=-catalogState,-purchasesCount&filter[isDirectoryHidden]=false`

// const url = `https://${window.location.host}/api/courses?${pageNumber}${pageSize}${hideOpenCourse}${openForPlus}${sort}`

// const headers = {'Accept': 'application/vnd.api+json', 'x-dmstk-accept-version': 'course.v2'}
// await (await fetch(url, { headers  })).json()