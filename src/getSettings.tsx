import { Icon } from '@raycast/api'

const TODAY = new Date().toISOString()

// const saveSettingsObj = async () => {
//   await LocalStorage.setItem(name, value)
//   const value = await LocalStorage.getItem<string>('openForPlus')
//   console.log(name, value)
// }

export const getSettings = () => {
  return [
    {
      id: 'pageNumber',
      icon: Icon.AppWindow,
      description: 'Página donde empieza.',
      value: 1,
      defaultValue: 1,
      stringValue: `page[number]=$pageNumber`,
      values: [1, 2, 3, 10, 100],
    },

    {
      id: 'pageSize',
      icon: Icon.List,
      description: 'Cursos por página.',
      value: 18,
      defaultValue: 18,
      stringValue: `&page[size]=$pageSize`,
      values: [1, 2, 3, 10, 100],
    },

    {
      id: 'hideOpenCourse',
      icon: Icon.BoltDisabled,
      description: 'Oculta cursos en abierto.',
      value: 'false',
      defaultValue: 'false',
      stringValue: `&filter[hideOpenCourse]=$hideOpenCourse`,
      values: ['true', 'false'],
    },

    {
      id: 'openForPlus',
      icon: Icon.PlusCircle,
      description: 'Cursos abiertos para Plus.',
      type: 'boolean',
      value: false,
      defaultValue: false,
      stringValue: `&filter[openForPlusUntil:min]=${TODAY}&filter[openForPlusFrom:max]=${TODAY}`,
    },

    // sort: `&sort=-catalogState,-purchasesCount&filter[isDirectoryHidden]=false`,
  ]
}
