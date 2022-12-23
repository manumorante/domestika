/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from '../config'
import { Action, ActionPanel, Color, Icon, List } from '@raycast/api'

const ProjectListItem = ({ item }: { item: any }) => {
  return (
    <List.Item
      key={item.id}
      icon={{ source: Icon.Dot, tintColor: Color.Blue }}
      title={item.name}
      subtitle={item.url}
      accessories={[
        { text: item.id },
        iconAlert('Link', item.url?.trim()),
        iconAlert('Image', item.image?.trim()),
        iconAlert('Snippets', item.repository?.trim()),
      ]}
      actions={
        <ActionPanel>
          <ActionPanel.Section title={item.name}>
            <Action.OpenInBrowser title={'Open site'} url={item.url} />
            <Action.Open title='Open folder' target={`${paths.projects}/${item.id}`} />
            <Action.OpenInBrowser title='Open repository' url={item.repository} />
            <Action.Open title='Open projects folder' target={paths.projects} />
          </ActionPanel.Section>
          <ActionPanel.Section title='General'>
            <Action.Open title='Open projects folder' target={paths.projects} />
            <Action.Open title='Open extension folder' target={__dirname} />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  )
}

const iconAlert = (icon: string, bool: boolean) => {
  if (bool) return {}
  return { icon: { source: (Icon as any)[icon], tintColor: Color.Red } }
}

export default ProjectListItem
