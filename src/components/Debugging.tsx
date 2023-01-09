import { Action, ActionPanel, Detail } from '@raycast/api'
import { useFetch } from '@raycast/utils'
import { paths } from 'config'
import { resultsType } from 'types'

// Debugging
// Dejo esta llama algo distinta mas simple para testear.
const Debugging = () => {
  const pageNumber = `page[number]=1`
  const pageSize = `&page[size]=18`
  const hideOpenCourse = `&filter[hideOpenCourse]=false`
  const sort = `&sort=-catalogState,-purchasesCount&filter[isDirectoryHidden]=false`

  const apiUrl = `${paths.host}/api/courses?${pageNumber}${pageSize}${hideOpenCourse}${sort}`

  const headers = { Accept: 'application/vnd.api+json', 'x-dmstk-accept-version': 'course.v2' }
  const { data: results } = useFetch<resultsType>(apiUrl, { headers })

  if (results?.data?.length === undefined) return null

  const responseString = JSON.stringify(results, undefined)
  const course = results?.data[0]

  const markdown = `
  ### Course
  ${course.id}

  ### Request
  ${apiUrl}
  
  ### Response
  \`\`\`
  ${responseString}
  \`\`\`
  `

  return (
    <Detail
      markdown={markdown}
      navigationTitle='Debugging'
      actions={
        <ActionPanel>
          <Action.CopyToClipboard key='1' title='Copy response' content={`${responseString}`} />
        </ActionPanel>
      }
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Link
            title='API Docs'
            target='https://www.domestika.org/api-docs/index.html'
            text='domestika.org/api-docs'
          />

          <Detail.Metadata.Separator />

          <Detail.Metadata.Label title='Host' text={paths.host} />
          <Detail.Metadata.Label title='Total items' text={`${results?.meta?.length}`} />
          <Detail.Metadata.Label
            title={`Page ${results?.meta?.page?.number}`}
            text={`${results?.meta?.page?.size} courses`}
          />

          <Detail.Metadata.Separator />

          <Detail.Metadata.TagList title='Settings'>
            <Detail.Metadata.TagList.Item text='openForPlus' color={'#eed535'} />
            <Detail.Metadata.TagList.Item text='logged' color={'green'} />
          </Detail.Metadata.TagList>

          <Detail.Metadata.Separator />

          {Object.entries(course.attributes).map(([key, value]) => (
            <Detail.Metadata.Label title={key} text={`${value}`} />
          ))}
        </Detail.Metadata>
      }
    />
  )
}

export default Debugging
