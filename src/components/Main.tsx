/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ActionPanel, Icon, List } from '@raycast/api'
import Courses from 'components/Courses'
import Debugging from 'components/Debugging'
import Settings from 'components/Settings'

const Main = () => {
  const MenuItem = ({ icon, title, target }: { icon: any; title: string; target: any }) => {
    const actions = (
      <ActionPanel>
        <Action.Push title={title} target={target} />
      </ActionPanel>
    )

    return <List.Item key={title} icon={icon} title={title} actions={actions} />
  }

  return (
    <List searchBarPlaceholder='Domestika in your desktop'>
      <List.Section title='Navigation'>
        <MenuItem title='Courses' icon={Icon.Bolt} target={<Courses />} />
        <MenuItem title='Settings' icon={Icon.Gear} target={<Settings />} />
        <MenuItem title='Debugging' icon={Icon.Bug} target={<Debugging />} />
      </List.Section>
    </List>
  )
}

export default Main
