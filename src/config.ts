import { getPreferenceValues } from '@raycast/api'

// https://stg.domestika.org/api
interface Preferences {
  hostPath: string
}

const preferences = getPreferenceValues<Preferences>()

export const paths = {
  host: preferences.hostPath,
}
