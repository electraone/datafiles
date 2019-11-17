export default {
  'name': 'composite MIDI messging',
  'instrument': 'Test',
  'categories': [
    {
      'id': 'general',
      'label': 'General'
    }
  ],
  "overlays": [
    {
      'id': 1,
      'name': 'On / Off',
      'items': [
        {
          'value': 0,
          'label': 'Off'
        },
        {
          'value': 1,
          'label': 'On'
        }
      ]
    }
  ],
  "patch": [
    {
      "request": ["43", "20", "00"],
      "responses": [
        {
          "header": ["43", "00", "00", "01", "1B"],
          "rules": [
            { "id": 1, "pPos": 0, "byte": 1, "bPos": 5, "size": 1 },
            { "id": 2, "pPos": 0, "byte": 1, "bPos": 4, "size": 1 },
            { "id": 3, "pPos": 0, "byte": 1, "bPos": 3, "size": 1 },
            { "id": 4, "pPos": 0, "byte": 1, "bPos": 2, "size": 1 },
            { "id": 5, "pPos": 0, "byte": 1, "bPos": 1, "size": 1 },
            { "id": 6, "pPos": 0, "byte": 1, "bPos": 0, "size": 1 }
          ]
        }
      ]
    },
    {
      "request": ["43", "20", "01"],
      "responses": [
        {
          "header": ["43", "00", "01", "00", "5E"],
          "rules": [
            { "id": 7, "pPos": 0, "byte": 2, "bPos": 0, "size": 7 },
            { "id": 8, "pPos": 0, "byte": 3, "bPos": 0, "size": 3 },
            { "id": 8, "pPos": 0, "byte": 4, "bPos": 0, "size": 7 },
            { "id": 9, "pPos": 0, "byte": 3, "bPos": 3, "size": 4 }
          ]
        }
      ]
    }
  ]
  'parameters': [
    {
      'id': 1,
      'name': 'Operator 1',
      'categoryId': 'general',
      'type': 'list',
      'overlayId': 1,
      'msg': 'sysex',
      'data': ['43', '10', '01', '1B',
        { 'type': 'value',
          'rules': [
            { 'id': 1, 'bPos': 5, 'size': 1 },
            { 'id': 2, 'bPos': 4, 'size': 1 },
            { 'id': 3, 'bPos': 3, 'size': 1 },
            { 'id': 4, 'bPos': 2, 'size': 1 },
            { 'id': 5, 'bPos': 1, 'size': 1 },
            { 'id': 6, 'bPos': 0, 'size': 1 }
          ]
        }
      ]
    },
    {
      'id': 2,
      'name': 'Operator 2',
      'categoryId': 'general',
      'type': 'list',
      'overlayId': 1,
      'msg': 'sysex',
      'data': ['43', '10', '01', '1B',
        { 'type': 'value',
          'rules': [
            { 'id': 1, 'bPos': 5, 'size': 1 },
            { 'id': 2, 'bPos': 4, 'size': 1 },
            { 'id': 3, 'bPos': 3, 'size': 1 },
            { 'id': 4, 'bPos': 2, 'size': 1 },
            { 'id': 5, 'bPos': 1, 'size': 1 },
            { 'id': 6, 'bPos': 0, 'size': 1 }
          ]
        }
      ]
    },
    {
      'id': 3,
      'name': 'Operator 3',
      'categoryId': 'general',
      'type': 'list',
      'overlayId': 1,
      'msg': 'sysex',
      'data': ['43', '10', '01', '1B',
        { 'type': 'value',
          'rules': [
            { 'id': 1, 'bPos': 5, 'size': 1 },
            { 'id': 2, 'bPos': 4, 'size': 1 },
            { 'id': 3, 'bPos': 3, 'size': 1 },
            { 'id': 4, 'bPos': 2, 'size': 1 },
            { 'id': 5, 'bPos': 1, 'size': 1 },
            { 'id': 6, 'bPos': 0, 'size': 1 }
          ]
        }
      ]
    },
    {
      'id': 4,
      'name': 'Operator 4',
      'categoryId': 'general',
      'type': 'list',
      'overlayId': 1,
      'msg': 'sysex',
      'data': ['43', '10', '01', '1B',
        { 'type': 'value',
          'rules': [
            { 'id': 1, 'bPos': 5, 'size': 1 },
            { 'id': 2, 'bPos': 4, 'size': 1 },
            { 'id': 3, 'bPos': 3, 'size': 1 },
            { 'id': 4, 'bPos': 2, 'size': 1 },
            { 'id': 5, 'bPos': 1, 'size': 1 },
            { 'id': 6, 'bPos': 0, 'size': 1 }
          ]
        }
      ]
    },
    {
      'id': 5,
      'name': 'Operator 5',
      'categoryId': 'general',
      'type': 'list',
      'overlayId': 1,
      'msg': 'sysex',
      'data': ['43', '10', '01', '1B',
        { 'type': 'value',
          'rules': [
            { 'id': 1, 'bPos': 5, 'size': 1 },
            { 'id': 2, 'bPos': 4, 'size': 1 },
            { 'id': 3, 'bPos': 3, 'size': 1 },
            { 'id': 4, 'bPos': 2, 'size': 1 },
            { 'id': 5, 'bPos': 1, 'size': 1 },
            { 'id': 6, 'bPos': 0, 'size': 1 }
          ]
        }
      ]
    },
    {
      'id': 6,
      'name': 'Operator 6',
      'categoryId': 'general',
      'type': 'list',
      'overlayId': 1,
      'msg': 'sysex',
      'data': ['43', '10', '01', '1B',
        { 'type': 'value',
          'rules': [
            { 'id': 1, 'bPos': 5, 'size': 1 },
            { 'id': 2, 'bPos': 4, 'size': 1 },
            { 'id': 3, 'bPos': 3, 'size': 1 },
            { 'id': 4, 'bPos': 2, 'size': 1 },
            { 'id': 5, 'bPos': 1, 'size': 1 },
            { 'id': 6, 'bPos': 0, 'size': 1 }
          ]
        }
      ]
    },
    {
      'id': 7,
      'name': 'Keyboard mode',
      'categoryId': 'general',
      'type': 'fader',
      'min': 0,
      'max': 127,
      'msg': 'sysex',
      'data': ['43', '10', '04', '02',
        { 'type': 'value',
          'rules': [
            { 'id': 7, 'bPos': 0, 'size': 7 }
          ]
        }
      ]
    },
    {
      'id': 8,
      'type': 'fader',
      'name': 'Waveform',
      'categoryId': 'general',
      'min': 0,
      'max': 1024,
      'msg': 'sysex',
      'data': ['43', '10', '01', '0E',
        { 'type': 'value',
          'rules': [
            { 'id': 8, 'bPos': 0, 'size': 7 }
          ]
        },
        { 'type': 'value',
          'rules': [
            { 'id': 8, 'bPos': 8, 'size': 3 }
          ]
        }
      ]
    },
    {
      'id': 9,
      'type': 'fader',
      'name': 'Speed',
      'min': 0,
      'max': 15,
      'categoryId': 'general',
      'msg': 'sysex',
      'data': ['43', '10', '01', '09',
        { 'type': 'value',
          'rules': [
            { 'id': 9, 'bPos': 0, 'size': 4 }
          ]
        }
      ]
    }
  ]
}
