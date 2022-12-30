import { paths } from 'config'
import { courseType, resultsType } from '../types'
import { Action, ActionPanel, Detail, Icon, List } from '@raycast/api'
import { useFetch } from '@raycast/utils'

const TODAY = new Date().toISOString()

const getURL = () => {
  // prettier-ignore
  const param = {
    pageNumber:     `page[number]=1`,
    pageSize:       `&page[size]=18`,
    hideOpenCourse: `&filter[hideOpenCourse]=false`,
    openForPlus:    ``,
    // openForPlus:    `&filter[openForPlusUntil:min]=${TODAY}&filter[openForPlusFrom:max]=${TODAY}`,
    sort:           `&sort=-catalogState,-purchasesCount&filter[isDirectoryHidden]=false`,
  }

  return `${paths.host}/api/courses?${param.pageNumber}${param.pageSize}${param.hideOpenCourse}${param.openForPlus}${param.sort}`
}

const getFetchOptions = () => {
  return { headers: { Accept: 'application/vnd.api+json', 'x-dmstk-accept-version': 'course.v2' } }
}

// Courses
function Courses() {
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
  # ${course.attributes.title}
  ## ${course.attributes.description}
  `
  return <Detail markdown={markdown} />
}

export default Courses
