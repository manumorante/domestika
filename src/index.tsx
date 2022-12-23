import { paths } from 'config'
import Preferences from 'components/Preferences'
import Main from 'components/Main'
import Settings from 'components/Settings'
const isConfigured = paths?.host?.trim()

export default function Command() {
  if (!isConfigured) return <Preferences />

  return <Settings />
  return <Main />
}
