/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, List } from '@raycast/api'
import ProjectListItem from './ProjectListItem'
import ProjectGridtem from './ProjectGridtem'
import OptionsDropdown from './OptionsDropdown'
import { useState } from 'react'

const ProjectList = ({ data }: { data: any[] }) => {
  const [option, setOption] = useState<string>()
  const searchBarAccessory = <OptionsDropdown onChange={(value: string) => setOption(value)} />

  if (option === 'list')
    return (
      <List searchBarAccessory={searchBarAccessory}>
        <List.Section title={`${data.length} projects as ${option}`}>
          {data.map((item) => (
            <ProjectListItem key={item.id} item={item} />
          ))}
        </List.Section>
      </List>
    )

  return (
    <Grid searchBarAccessory={searchBarAccessory}>
      <Grid.Section aspectRatio='3/2' fit='fill' columns={3} title={`${data.length} projects as ${option}`}>
        {data.map((item) => (
          <ProjectGridtem key={item.id} item={item} />
        ))}
      </Grid.Section>
    </Grid>
  )
}

export default ProjectList
