/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSettings } from 'getSettings'
import { Action, ActionPanel, List } from '@raycast/api'
import { useState } from 'react'

const Settings = () => {
  const [settings, setSettings] = useState(getSettings())

  const saveSetting = (id: string, value: string) => {
    console.log(id, value)

    const setting = settings.find((item) => item.id === id)
    console.log('setting', setting)
    // setting.value = value

    // const newSettings = { ...settings.filter((item) => item.id !== id) }
    // newSettings.push(setting)

    // console.log(newSettings)
    // const old = { ...settings }
    // setSettings()
  }

  return (
    <List navigationTitle='Settings' isLoading={settings?.length <= 0}>
      {settings.map((item) => {
        return (
          <List.Item
            key={item.id}
            icon={item.icon}
            title={item.id}
            subtitle={item.description}
            accessories={[{ text: `${item.value}` }]}
            actions={
              <ActionPanel title='Set to'>
                {/* Lista de valores */}
                {item.type !== 'boolean' &&
                  item.values &&
                  item.values.map((value: any, index: number) => {
                    return (
                      <Action
                        key={index}
                        title={`${value}`}
                        onAction={() => {
                          saveSetting(item.id, value)
                        }}
                      />
                    )
                  })}

                {/* Booleano (se pinta o no la setting) */}
                {item.type === 'boolean' &&
                  (item.value ? <Action key='false' title='false' /> : <Action key='true' title='true' />)}
              </ActionPanel>
            }
          />
        )
      })}
    </List>
  )
}

export default Settings
