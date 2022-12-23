/* eslint-disable @typescript-eslint/no-explicit-any */
import { paths } from '../config'
import { useFetch } from '@raycast/utils'
import { Action, ActionPanel, Detail, Icon, List } from '@raycast/api'

const TODAY = new Date().toISOString()

type resultsType = {
  meta: {
    totalItems: number
    page: {
      number: number
      size: number
      last: number
    }
  }
  data: courseType[]
}

type courseType = {
  attributes: {
    title: string
    shortDescription: string
    description: string
    cover: {
      original: string
    }
  }
}

const MenuItem = ({ key, icon, title, target }: { key: any; icon: any; title: any; target: any }) => {
  const actions = (
    <ActionPanel>
      <Action.Push title='Run' target={target} />
    </ActionPanel>
  )

  return <List.Item key={key} icon={icon} title={title} actions={actions} />
}

const Main = () => {
  return (
    <List>
      <MenuItem key='Courses' icon={Icon.Bolt} title='Courses' target={<Courses />} />
      <MenuItem key='ConfigRequest' icon={Icon.Gear} title='Config Request' target={<ConfigRequest />} />
      <MenuItem key='debug' icon={Icon.Bug} title='Debug API' target={<Test />} />
    </List>
  )
}

const getURL = () => {
  // prettier-ignore
  const param = {
    pageNumber:     `page[number]=1`,
    pageSize:       `&page[size]=18`,
    hideOpenCourse: `&filter[hideOpenCourse]=false`,
    openForPlus:    `&filter[openForPlusUntil:min]=${TODAY}&filter[openForPlusFrom:max]=${TODAY}`,
    sort:           `&sort=-catalogState,-purchasesCount&filter[isDirectoryHidden]=false`,
  }

  return `${paths.host}/api/courses?${param.pageNumber}${param.pageSize}${param.hideOpenCourse}${param.openForPlus}${param.sort}`
}

const getFetchOptions = () => {
  return { headers: { Accept: 'application/vnd.api+json', 'x-dmstk-accept-version': 'course.v2' } }
}

// Courses
const Courses = () => {
  const { data: results } = useFetch<resultsType>(getURL(), getFetchOptions())

  return (
    <List>
      {results?.data && (
        <List.Section title={`${results?.meta?.totalItems} courses`}>
          {results.data.map((course: courseType) => {
            return (
              <List.Item
                icon={Icon.Circle}
                key={1}
                title={course?.attributes?.title}
                subtitle={course?.attributes?.shortDescription}
                actions={
                  <ActionPanel>
                    <Action.Push title='Show' target={<CourseDetails course={course} />} />
                  </ActionPanel>
                }
              />
            )
          })}
        </List.Section>
      )}
    </List>
  )
}

// Course
const CourseDetails = ({ course }: { course: courseType }) => {
  // const cover = course?.attributes?.cover?.original
  const markdown = `
  ## ${course.attributes.title}
  ### ${course.attributes.description}
  `
  return <Detail markdown={markdown} />
}

// Configurar petición
const ConfigRequest = () => {
  return (
    <List>
      <List.Section title='Configuración'>
        <List.Item title='Algo' />
      </List.Section>
    </List>
  )
}

// Debugging
// Dejo esta llama algo distinta mas simple para testear.
const Test = () => {
  const pageNumber = `page[number]=1`
  const pageSize = `&page[size]=18`
  const hideOpenCourse = `&filter[hideOpenCourse]=false`
  const sort = `&sort=-catalogState,-purchasesCount&filter[isDirectoryHidden]=false`

  const apiUrl = `${paths.host}/api/courses?${pageNumber}${pageSize}${hideOpenCourse}${sort}`

  const headers = { Accept: 'application/vnd.api+json', 'x-dmstk-accept-version': 'course.v2' }
  const { data: results } = useFetch<resultsType>(apiUrl, { headers })

  const markdown = `
  \`\`\`
  REQUEST
  ${apiUrl}
  
  RESPONSE
  ${JSON.stringify(results, undefined)}
  \`\`\`
  `
  return <Detail markdown={markdown} />
}

export default Main
