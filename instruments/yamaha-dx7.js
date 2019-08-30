export default {
  'name': 'DX7',
  'instrument': 'dx7',
  'categories': [
    {
      'id': 'op1',
      'label': 'Operator 1'
    },
    {
      'id': 'op2',
      'label': 'Operator 2'
    },
    {
      'id': 'op3',
      'label': 'Operator 3'
    },
    {
      'id': 'op4',
      'label': 'Operator 4'
    },
    {
      'id': 'op5',
      'label': 'Operator 5'
    },
    {
      'id': 'op6',
      'label': 'Operator 6'
    },
    {
      'id': 'pitch',
      'label': 'Pitch envelope'
    },
    {
      'id': 'setup',
      'label': 'Setup'
    },
    {
      'id': 'lfo',
      'label': 'LFO'
    }
  ],
  'overlays': [
    {
      'id': 1,
      'name': 'Op Modes',
      'items': [
        {
          'value': 0,
          'label': 'Fixed'
        },
        {
          'value': 1,
          'label': 'Ratio'
        }
      ]
    },
    {
       "id": 2,
       "name": "Op Curves",
       "items": [
         {
           "value": 0,
           "label": "-Linear"
         },
         {
           "value": 1,
           "label": "-Exponential"
         },
         {
           "value": 2,
           "label": "+Exponential"
         },
         {
           "value": 3,
           "label": "+Linear"
         }
       ]
    },
    {
      'id': 3,
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
    },
    {
       "id": 4,
       "name": "LFO Waveforms",
       "items": [
         {
           "value": 0,
           "label": "Triangle"
         },
         {
           "value": 1,
           "label": "Saw Up"
         },
         {
           "value": 2,
           "label": "Saw Down"
         },
         {
           "value": 3,
           "label": "Square"
         },
         {
           "value": 4,
           "label": "Sine"
         },
         {
           "value": 5,
           "label": "Sample & Hold"
         }
       ]
    },
  ],
  'parameters': [
    {
      'id': 134,
      'type': 'fader',
      'name': 'Algorithm',
      'min': 0,
      'max': 31,
      'defaultValue': 0,
      'categoryId': 'setup'
    },
    {
      'id': 135,
      'type': 'fader',
      'name': 'Feedback',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'setup'
    },
    {
      'id': 136,
      'type': 'list',
      'name': 'Oscillator sync',
      'overlayId': 3,
      'defaultValue': 0,
      'categoryId': 'setup'
    },
    {
      'id': 144,
      'type': 'fader',
      'name': 'Transpose',
      'min': 0,
      'max': 48,
      'defaultValue': 0,
      'categoryId': 'setup'
    },
    {
      'id': 155,
      'type': 'fader',
      'name': 'Operators',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'setup'
    },


    {
      'id': 142,
      'type': 'list',
      'name': 'Waveform',
      'overlayId': 4,
      'defaultValue': 0,
      'categoryId': 'lfo'
    },
    {
      'id': 137,
      'type': 'fader',
      'name': 'Speed',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'lfo'
    },
    {
      'id': 138,
      'type': 'fader',
      'name': 'Delay',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'lfo'
    },
    {
      'id': 139,
      'type': 'fader',
      'name': 'Pitch mod depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'lfo'
    },
    {
      'id': 140,
      'type': 'fader',
      'name': 'Amp mod depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'lfo'
    },
    {
      'id': 141,
      'type': 'list',
      'name': 'Sync',
      'overlayId': 3,
      'defaultValue': 0,
      'categoryId': 'setup'
    },


    {
      'id': 126,
      'type': 'fader',
      'name': 'Rate 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'pitch'
    },
    {
      'id': 127,
      'type': 'fader',
      'name': 'Rate 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'pitch'
    },
    {
      'id': 128,
      'type': 'fader',
      'name': 'Rate 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'pitch'
    },
    {
      'id': 129,
      'type': 'fader',
      'name': 'Rate 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'pitch'
    },
    {
      'id': 130,
      'type': 'fader',
      'name': 'Level 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'pitch'
    },
    {
      'id': 131,
      'type': 'fader',
      'name': 'Level 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'pitch'
    },
    {
      'id': 132,
      'type': 'fader',
      'name': 'Level 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'pitch'
    },
    {
      'id': 133,
      'type': 'fader',
      'name': 'Level 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'pitch'
    },
    {
      'id': 143,
      'type': 'fader',
      'name': 'Mod sensitivity',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'pitch'
    },


    {
      'id': 105,
      'type': 'fader',
      'name': 'Rate 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 106,
      'type': 'fader',
      'name': 'Rate 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 107,
      'type': 'fader',
      'name': 'Rate 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 108,
      'type': 'fader',
      'name': 'Rate 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 109,
      'type': 'fader',
      'name': 'Level 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 110,
      'type': 'fader',
      'name': 'Level 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 111,
      'type': 'fader',
      'name': 'Level 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 112,
      'type': 'fader',
      'name': 'Level 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 113,
      'type': 'fader',
      'name': 'Key level scale',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 114,
      'type': 'fader',
      'name': 'Key left depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 115,
      'type': 'fader',
      'name': 'Key right depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 116,
      'type': 'list',
      'name': 'Key left curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 117,
      'type': 'list',
      'name': 'Key right curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 118,
      'type': 'fader',
      'name': 'Key rate scaling',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 119,
      'type': 'fader',
      'name': 'Amp mod sensitivity',
      'min': 0,
      'max': 3,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 120,
      'type': 'fader',
      'name': 'Key vel sensitivity',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 121,
      'type': 'fader',
      'name': 'Output level',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 122,
      'type': 'list',
      'name': 'Mode',
      'overlayId': 1,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 123,
      'type': 'fader',
      'name': 'Freq coarse',
      'min': 0,
      'max': 31,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 124,
      'type': 'fader',
      'name': 'Freq fine',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op1'
    },
    {
      'id': 125,
      'type': 'fader',
      'name': 'Detune',
      'min': -7,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op1'
    },


    {
      'id': 84,
      'type': 'fader',
      'name': 'Rate 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 85,
      'type': 'fader',
      'name': 'Rate 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 86,
      'type': 'fader',
      'name': 'Rate 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 87,
      'type': 'fader',
      'name': 'Rate 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 88,
      'type': 'fader',
      'name': 'Level 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 89,
      'type': 'fader',
      'name': 'Level 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 90,
      'type': 'fader',
      'name': 'Level 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 91,
      'type': 'fader',
      'name': 'Level 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 92,
      'type': 'fader',
      'name': 'Key level scale',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 93,
      'type': 'fader',
      'name': 'Key left depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 94,
      'type': 'fader',
      'name': 'Key right depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 95,
      'type': 'list',
      'name': 'Key left curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 96,
      'type': 'list',
      'name': 'Key right curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 97,
      'type': 'fader',
      'name': 'Key rate scaling',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 98,
      'type': 'fader',
      'name': 'Amp mod sensitivity',
      'min': 0,
      'max': 3,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 99,
      'type': 'fader',
      'name': 'Key vel sensitivity',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 100,
      'type': 'fader',
      'name': 'Output level',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 101,
      'type': 'list',
      'name': 'Mode',
      'overlayId': 1,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 102,
      'type': 'fader',
      'name': 'Freq coarse',
      'min': 0,
      'max': 31,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 103,
      'type': 'fader',
      'name': 'Freq fine',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op2'
    },
    {
      'id': 104,
      'type': 'fader',
      'name': 'Detune',
      'min': -7,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op2'
    },



    {
      'id': 63,
      'type': 'fader',
      'name': 'Rate 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 64,
      'type': 'fader',
      'name': 'Rate 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 65,
      'type': 'fader',
      'name': 'Rate 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 66,
      'type': 'fader',
      'name': 'Rate 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 67,
      'type': 'fader',
      'name': 'Level 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 68,
      'type': 'fader',
      'name': 'Level 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 69,
      'type': 'fader',
      'name': 'Level 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 70,
      'type': 'fader',
      'name': 'Level 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 71,
      'type': 'fader',
      'name': 'Key level scale',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 72,
      'type': 'fader',
      'name': 'Key left depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 73,
      'type': 'fader',
      'name': 'Key right depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 74,
      'type': 'list',
      'name': 'Key left curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 75,
      'type': 'list',
      'name': 'Key right curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 76,
      'type': 'fader',
      'name': 'Key rate scaling',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 77,
      'type': 'fader',
      'name': 'Amp mod sensitivity',
      'min': 0,
      'max': 3,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 78,
      'type': 'fader',
      'name': 'Key vel sensitivity',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 79,
      'type': 'fader',
      'name': 'Output level',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 80,
      'type': 'list',
      'name': 'Mode',
      'overlayId': 1,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 81,
      'type': 'fader',
      'name': 'Freq coarse',
      'min': 0,
      'max': 31,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 82,
      'type': 'fader',
      'name': 'Freq fine',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op3'
    },
    {
      'id': 83,
      'type': 'fader',
      'name': 'Detune',
      'min': -7,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op3'
    },


    {
      'id': 42,
      'type': 'fader',
      'name': 'Rate 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 43,
      'type': 'fader',
      'name': 'Rate 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 44,
      'type': 'fader',
      'name': 'Rate 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 45,
      'type': 'fader',
      'name': 'Rate 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 46,
      'type': 'fader',
      'name': 'Level 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 47,
      'type': 'fader',
      'name': 'Level 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 48,
      'type': 'fader',
      'name': 'Level 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 49,
      'type': 'fader',
      'name': 'Level 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 50,
      'type': 'fader',
      'name': 'Key level scale',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 51,
      'type': 'fader',
      'name': 'Key left depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 52,
      'type': 'fader',
      'name': 'Key right depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 53,
      'type': 'list',
      'name': 'Key left curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 54,
      'type': 'list',
      'name': 'Key right curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 55,
      'type': 'fader',
      'name': 'Key rate scaling',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 56,
      'type': 'fader',
      'name': 'Amp mod sensitivity',
      'min': 0,
      'max': 3,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 57,
      'type': 'fader',
      'name': 'Key vel sensitivity',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 58,
      'type': 'fader',
      'name': 'Output level',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 59,
      'type': 'list',
      'name': 'Mode',
      'overlayId': 1,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 60,
      'type': 'fader',
      'name': 'Freq coarse',
      'min': 0,
      'max': 31,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 61,
      'type': 'fader',
      'name': 'Freq fine',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op4'
    },
    {
      'id': 62,
      'type': 'fader',
      'name': 'Detune',
      'min': -7,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op4'
    },


    {
      'id': 21,
      'type': 'fader',
      'name': 'Rate 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 22,
      'type': 'fader',
      'name': 'Rate 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 23,
      'type': 'fader',
      'name': 'Rate 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 24,
      'type': 'fader',
      'name': 'Rate 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 25,
      'type': 'fader',
      'name': 'Level 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 26,
      'type': 'fader',
      'name': 'Level 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 27,
      'type': 'fader',
      'name': 'Level 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 28,
      'type': 'fader',
      'name': 'Level 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 29,
      'type': 'fader',
      'name': 'Key level scale',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 30,
      'type': 'fader',
      'name': 'Key left depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 31,
      'type': 'fader',
      'name': 'Key right depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 32,
      'type': 'list',
      'name': 'Key left curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 33,
      'type': 'list',
      'name': 'Key right curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 34,
      'type': 'fader',
      'name': 'Key rate scaling',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 35,
      'type': 'fader',
      'name': 'Amp mod sensitivity',
      'min': 0,
      'max': 3,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 36,
      'type': 'fader',
      'name': 'Key vel sensitivity',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 37,
      'type': 'fader',
      'name': 'Output level',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 38,
      'type': 'list',
      'name': 'Mode',
      'overlayId': 1,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 39,
      'type': 'fader',
      'name': 'Freq coarse',
      'min': 0,
      'max': 31,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 40,
      'type': 'fader',
      'name': 'Freq fine',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op5'
    },
    {
      'id': 41,
      'type': 'fader',
      'name': 'Detune',
      'min': -7,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op5'
    },


    {
      'id': 0,
      'type': 'fader',
      'name': 'Rate 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 1,
      'type': 'fader',
      'name': 'Rate 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 2,
      'type': 'fader',
      'name': 'Rate 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 3,
      'type': 'fader',
      'name': 'Rate 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 4,
      'type': 'fader',
      'name': 'Level 1',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 5,
      'type': 'fader',
      'name': 'Level 2',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 6,
      'type': 'fader',
      'name': 'Level 3',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 7,
      'type': 'fader',
      'name': 'Level 4',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 8,
      'type': 'fader',
      'name': 'Key level scale',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 9,
      'type': 'fader',
      'name': 'Key left depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 10,
      'type': 'fader',
      'name': 'Key right depth',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 11,
      'type': 'list',
      'name': 'Key left curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 12,
      'type': 'list',
      'name': 'Key right curve',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 13,
      'type': 'fader',
      'name': 'Key rate scaling',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 14,
      'type': 'fader',
      'name': 'Amp mod sensitivity',
      'min': 0,
      'max': 3,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 15,
      'type': 'fader',
      'name': 'Key vel sensitivity',
      'min': 0,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 16,
      'type': 'fader',
      'name': 'Output level',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 17,
      'type': 'list',
      'name': 'Mode',
      'overlayId': 1,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 18,
      'type': 'fader',
      'name': 'Freq coarse',
      'min': 0,
      'max': 31,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 19,
      'type': 'fader',
      'name': 'Freq fine',
      'min': 0,
      'max': 99,
      'defaultValue': 0,
      'categoryId': 'op6'
    },
    {
      'id': 20,
      'type': 'fader',
      'name': 'Detune',
      'min': -7,
      'max': 7,
      'defaultValue': 0,
      'categoryId': 'op6'
    }
  ]
}
