export default {
  'name': 'composite MIDI messging',
  'instrument': 'Test',
  'categories': [
    {
      'id': 'cc',
      'label': 'Continuous controllers'
    },
    {
      'id': 'ssysex',
      'label': 'Static SysEx messages'
    },
    {
      'id': 'dsysex',
      'label': 'Dynamic SysEx messages'
    }
  ],
  'parameters': [
    {
      'id': 1,
      'type': 'fader',
      'name': 'midi CC',
      'midiParameter': 32,
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'cc'
    },
    {
      'id': 2,
      'type': 'button',
      'name': 'Static sysex',
      'message': [
        'F7', '7D', '06', '01', 'f7'
      ],
      'categoryId': 'ssysex'
    },
    {
      'id': 3,
      'type': 'fader',
      'name': 'Dynamic sysex',
      'midiParameter': 16,
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'message': [
        'F7', '7D', '06', 'value', 'f7'
      ],
      'categoryId': 'ssysex'
    },
    {
      'id': 3,
      'type': 'fader',
      'name': 'Dynamic sysex bits ',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'message': [
        'F7', '7D', '06', 'value.0123', 'value.4567', 'f7'
      ],
      'categoryId': 'dsysex'
    },
    {
      'id': 3,
      'type': 'fader',
      'name': 'Dynamic sysex checksum',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'message': [
        'F7', '7D', '06', 'value.0123', 'value.4567', 'chsum01', 'f7'
      ],
      'categoryId': 'dsysex'
    },
  ],
  'patchParameterMappings': [
    {
      'byte': 0,
      'midiParameter': 16
    }


  ]
}
