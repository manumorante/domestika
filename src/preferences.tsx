import { openCommandPreferences, ActionPanel, Action, Icon, List, Color } from '@raycast/api'
import { paths } from '../config'

const isHost = paths?.host?.trim()

export default function Preferences() {
  return (
    <List>
      <List.Item
        key='preferences'
        icon={Icon.Gear}
        title='Open preferences'
        actions={
          <ActionPanel>
            <Action title='Open Preferences' onAction={openCommandPreferences} />
          </ActionPanel>
        }
      />

      <List.Section title='Preferences'>
        <List.Item
          key={1}
          icon={{ source: Icon.Folder, tintColor: isHost ? Color.Green : Color.Red }}
          title='Projects'
          subtitle={isHost ? paths.host : 'Please, select the project folder'}
          accessories={[{ text: 'folder' }]}
          actions={
            <ActionPanel>
              {isHost && <Action.CopyToClipboard content={paths.host} />}
              <Action title='Open Preferences' onAction={openCommandPreferences} />
            </ActionPanel>
          }
        />

      </List.Section>
    </List>
  )
}
