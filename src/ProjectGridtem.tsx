/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from '../config'
import { Action, ActionPanel, Grid } from '@raycast/api'

const ProjectGridtem = ({ item }: { item: any }) => {
  return (
    <Grid.Item
      key={item.id}
      content={item.image}
      title={item.name}
      actions={
        <ActionPanel>
          <ActionPanel.Section title={item.name}>
            <Action.Open title='Open folder' target={`${paths.projects}/${item.id}`} />
            <Action.OpenInBrowser title={`${item.url}`} url={item.url} />
            <Action.OpenInBrowser title='Open repository' url={item.repository} />
            <Action.Open title='Open repository' target={paths.projects} />
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

export default ProjectGridtem
