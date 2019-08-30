export default {
  'name': 'Generic MIDI',
  'instrument': 'cc',
  'categories': [
    {
      'id': 'parameters',
      'label': 'Parameters'
    }
  ],
  'parameters': [
    {
      'id': 1,
      'type': 'fader',
      'name': 'midi CC',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'parameters'
    }
  ]
}
