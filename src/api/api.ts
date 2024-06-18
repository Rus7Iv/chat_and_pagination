import { TileData } from '../utils/types'

export const postTile = (newTile: TileData) => {
  return fetch('https://www.example.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'no-cors', // В логах будет сообщение "Ошибка при отправке данных: Error: HTTP error! status: 0"
    body: JSON.stringify(newTile)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .catch(error => {
      console.error('Ошибка при отправке данных:', error)
    })
}
