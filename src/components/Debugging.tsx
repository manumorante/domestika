import { Detail } from '@raycast/api'
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

  const markdown = `
  \`\`\`
  REQUEST
  ${apiUrl}
  
  RESPONSE
  ${JSON.stringify(results, undefined)}
  \`\`\`
  `
  return (
    <Detail
      markdown={markdown}
      navigationTitle='Debugging'
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title='Host' text={paths.host} />
          <Detail.Metadata.Label title='Total items' text={`${results?.meta?.totalItems}`} />
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

          <Detail.Metadata.Link title='Domestika' target='https://www.domestika.org' text='www.domestika.org' />
        </Detail.Metadata>
      }
    />
  )
}

export default Debugging
