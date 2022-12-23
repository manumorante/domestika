import { paths } from '../config'
import Preferences from './preferences'
import Projects from './Main'
const isConfigured = paths?.host?.trim()

export default function Command() {
  if (!isConfigured) return <Preferences />

  return <Projects />
}
