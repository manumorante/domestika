/* eslint-disable @typescript-eslint/no-explicit-any */

import { settings } from 'getSettings'
import { Action, ActionPanel, List, LocalStorage } from '@raycast/api'

const Settings = () => {
  async function saveSetting({ name, value }: { name: string; value: string }) {
    await LocalStorage.setItem(name, value)
  }

  async function getSetting({ name }: { name: string }) {
    const item = await LocalStorage.getItem<string>(name)
    return item
  }

  return (
    <List navigationTitle='Settings'>
      {settings?.map((item) => {
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
                          saveSetting({ name: item.id, value: value })
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
