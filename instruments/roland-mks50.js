export default {
  'name': 'Roland MKS-50',
  'instrument': 'mks50',
  'categories': [
    {
      'id': 'dco',
      'label': 'DCO'
    },
    {
      'id': 'vcf',
      'label': 'VCF'
    },
    {
      'id': 'vca',
      'label': 'VCA'
    },
    {
      'id': 'adsr',
      'label': 'Envelope'
    },
    {
      'id': 'lfo',
      'label': 'LFO'
    },
    {
      'id': 'effect',
      'label': 'Effect'
    },
    {
      'id': 'setup',
      'label': 'Setup'
    }
  ],
  'overlays': [
    {
      'id': 1,
      'name': 'DCO Envelope modes',
      'items': [
        {
          'value': 0,
          'label': 'Normal'
        },
        {
          'value': 1,
          'label': 'Inverted'
        },
        {
          'value': 2,
          'label': 'Normal with dynamics'
        },
        {
          'value': 3,
          'label': 'Inverted with dynamics'
        }
      ]
    },
    {
      'id': 2,
      'name': 'VCF Envelope modes',
      'items': [
        {
          'value': 0,
          'label': 'Normal'
        },
        {
          'value': 1,
          'label': 'Inverted'
        },
        {
          'value': 2,
          'label': 'Normal with dynamics'
        },
        {
          'value': 3,
          'label': 'Dynamics'
        }
      ]
    },
    {
      'id': 3,
      'name': 'VCA Envelope modes',
      'items': [
        {
          'value': 0,
          'label': 'Env'
        },
        {
          'value': 1,
          'label': 'Gate'
        },
        {
          'value': 2,
          'label': 'Env with dynamics'
        },
        {
          'value': 3,
          'label': 'Gate with dynamics'
        }
      ]
    },
    {
      'id': 4,
      'name': 'Pulse Shapes',
      'items': [
        {
          'value': 0,
          'label': 'None'
        },
        {
          'value': 1,
          'label': '50:50'
        },
        {
          'value': 2,
          'label': '25:75'
        },
        {
          'value': 3,
          'label': 'PWM'
        }
      ]
    },
    {
      'id': 5,
      'name': 'Saw Shapes',
      'items': [
        {
          'value': 0,
          'label': 'None'
        },
        {
          'value': 1,
          'label': 'Pefect saw'
        },
        {
          'value': 2,
          'label': '50:50'
        },
        {
          'value': 3,
          'label': 'PWM'
        },
        {
          'value': 4,
          'label': 'Comb'
        },
        {
          'value': 5,
          'label': '50:50 Comb'
        }
      ]
    },
    {
      'id': 6,
      'name': 'Sub Shapes',
      'items': [
        {
          'value': 0,
          'label': '50:50'
        },
        {
          'value': 1,
          'label': '25:75'
        },
        {
          'value': 2,
          'label': 'Two peaks'
        },
        {
          'value': 3,
          'label': 'Four peaks'
        },
        {
          'value': 4,
          'label': '50:50 -1 oct'
        },
        {
          'value': 5,
          'label': '25:75 -1 oct'
        }
      ]
    },
    {
      'id': 7,
      'name': 'DCO ranges',
      'items': [
        {
          'value': 0,
          'label': '4\''
        },
        {
          'value': 1,
          'label': '8\''
        },
        {
          'value': 2,
          'label': '16\''
        },
        {
          'value': 3,
          'label': '32\''
        }
      ]
    },
    {
      'id': 8,
      'name': 'On/Off',
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
      'id': 9,
      'name': 'Key modes',
      'items': [
        {
          'value': 0,
          'label': 'Polyphonic'
        },
        {
          'value': 64,
          'label': 'Chord memory'
        },
        {
          'value': 96,
          'label': 'Monophonic'
        }
      ]
    }
  ],
  'parameters': [
    {
      'id': 0,
      'type': 'list',
      'name': 'DCO env mode',
      'overlayId': 1,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '00', '$V' ]
    },
    {
      'id': 1,
      'type': 'list',
      'name': 'VCF env mode',
      'overlayId': 2,
      'defaultValue': 0,
      'categoryId': 'vcf',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '01', '$V' ]
    },
    {
      'id': 2,
      'type': 'list',
      'name': 'VCA env mode',
      'overlayId': 3,
      'defaultValue': 0,
      'categoryId': 'vca',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '02', '$V' ]
    },
    {
      'id': 3,
      'type': 'list',
      'name': 'Waveform pulse',
      'overlayId': 4,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '03', '$V' ]
    },
    {
      'id': 4,
      'type': 'list',
      'name': 'Waveform saw',
      'overlayId': 5,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '04', '$V' ]
    },
    {
      'id': 5,
      'type': 'list',
      'name': 'Waveform sub',
      'overlayId': 6,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '05', '$V' ]
    },
    {
      'id': 6,
      'type': 'list',
      'name': 'Range',
      'overlayId': 7,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '06', '$V' ]
    },
    {
      'id': 7,
      'type': 'fader',
      'name': 'Sub level',
      'min': 0,
      'max': 3,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '07', '$V' ]
    },
    {
      'id': 8,
      'type': 'fader',
      'name': 'Noise level',
      'min': 0,
      'max': 3,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '08', '$V' ]
    },
    {
      'id': 9,
      'type': 'fader',
      'name': 'HPF cutoff',
      'min': 0,
      'max': 3,
      'defaultValue': 0,
      'categoryId': 'vcf',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '09', '$V' ]
    },
    {
      'id': 10,
      'type': 'list',
      'name': 'Chorus',
      'overlayId': 8,
      'defaultValue': 0,
      'categoryId': 'effect',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '0A', '$V' ]
    },
    {
      'id': 11,
      'type': 'fader',
      'name': 'LFO mod depth',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '0B', '$V' ]
    },
    {
      'id': 12,
      'type': 'fader',
      'name': 'Env mod depth',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '0C', '$V' ]
    },
    {
      'id': 13,
      'type': 'fader',
      'name': 'Aftertouch depth',
      'min': 0,
      'max': 15,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '0D', '$V' ]
    },
    {
      'id': 14,
      'type': 'fader',
      'name': 'PW/PWM mod depth',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '0E', '$V' ]
    },
    {
      'id': 15,
      'type': 'fader',
      'name': 'PWM Rate',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '0F', '$V' ]
    },
    {
      'id': 16,
      'type': 'fader',
      'name': 'Cutoff freq',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'vcf',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '10', '$V' ]
    },
    {
      'id': 17,
      'type': 'fader',
      'name': 'Resonance',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'vcf',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '11', '$V' ]
    },
    {
      'id': 18,
      'type': 'fader',
      'name': 'LFO mod depth',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'vcf',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '12', '$V' ]
    },
    {
      'id': 19,
      'type': 'fader',
      'name': 'Env mod depth',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'vcf',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '13', '$V' ]
    },
    {
      'id': 20,
      'type': 'fader',
      'name': 'Key follow',
      'min': 0,
      'max': 15,
      'defaultValue': 0,
      'categoryId': 'vcf',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '14', '$V' ]
    },
    {
      'id': 21,
      'type': 'fader',
      'name': 'Aftertouch depth',
      'min': 0,
      'max': 15,
      'defaultValue': 0,
      'categoryId': 'vcf',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '15', '$V' ]
    },
    {
      'id': 22,
      'type': 'fader',
      'name': 'Level',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'vca',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '16', '$V' ]
    },
    {
      'id': 23,
      'type': 'fader',
      'name': 'Aftertouch depth',
      'min': 0,
      'max': 15,
      'defaultValue': 0,
      'categoryId': 'vca',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '17', '$V' ]
    },
    {
      'id': 24,
      'type': 'fader',
      'name': 'Rate',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'lfo',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '18', '$V' ]
    },
    {
      'id': 25,
      'type': 'fader',
      'name': 'Delay time',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'lfo',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '19', '$V' ]
    },
    {
      'id': 26,
      'type': 'fader',
      'name': 'Attack time',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'adsr',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '1A', '$V' ]
    },
    {
      'id': 27,
      'type': 'fader',
      'name': 'Attack level',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'adsr',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '1B', '$V' ]
    },
    {
      'id': 28,
      'type': 'fader',
      'name': 'Decay 1 time',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'adsr',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '1C', '$V' ]
    },
    {
      'id': 29,
      'type': 'fader',
      'name': 'Decay 1 level',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'adsr',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '1D', '$V' ]
    },
    {
      'id': 30,
      'type': 'fader',
      'name': 'Decay 2 time',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'adsr',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '1E', '$V' ]
    },
    {
      'id': 31,
      'type': 'fader',
      'name': 'Sustain level',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'adsr',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '1F', '$V' ]
    },
    {
      'id': 32,
      'type': 'fader',
      'name': 'Release time',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'adsr',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '20', '$V' ]
    },
    {
      'id': 33,
      'type': 'fader',
      'name': 'Key follow',
      'min': 0,
      'max': 15,
      'defaultValue': 0,
      'categoryId': 'adsr',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '21', '$V' ]
    },
    {
      'id': 34,
      'type': 'fader',
      'name': 'Chorus rate',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'effect',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '22', '$V' ]
    },
    {
      'id': 35,
      'type': 'fader',
      'name': 'Pitchbend range',
      'min': 0,
      'max': 12,
      'defaultValue': 0,
      'categoryId': 'setup',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '20', '01', '23', '$V' ]
    },
    {
      'id': 39,
      'type': 'fader',
      'name': 'Portamento time',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'effect',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '30', '01', '03', '$V' ]
    },
    {
      'id': 40,
      'type': 'list',
      'name': 'Portamento',
      'overlayId': 8,
      'defaultValue': 0,
      'categoryId': 'effect',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '30', '01', '04', '$V' ]
    },
    {
      'id': 41,
      'type': 'fader',
      'name': 'Mod sensitivity',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'setup',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '30', '01', '05', '$V' ]
    },
    {
      'id': 42,
      'type': 'fader',
      'name': 'Key shift',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'setup',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '30', '01', '06', '$V' ]
    },
    {
      'id': 43,
      'type': 'fader',
      'name': 'Volume',
      'min': 0,
      'max': 127,
      'defaultValue': 0,
      'categoryId': 'setup',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '30', '01', '07', '$V' ]
    },
    {
      'id': 44,
      'type': 'fader',
      'name': 'Detune',
      'min': -63,
      'max': 64,
      'defaultValue': 0,
      'categoryId': 'dco',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '30', '01', '08', '$V' ]
    },
    {
      'id': 46,
      'type': 'fader',
      'name': 'Mono Pitchbend Range',
      'min': 0,
      'max': 12,
      'defaultValue': 0,
      'categoryId': 'setup',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '30', '01', '0A', '$V' ]
    },
    {
      'id': 48,
      'type': 'list',
      'name': 'Key assigment',
      'overlayId': 9,
      'defaultValue': 0,
      'categoryId': 'setup',
      'msg': 'sysex',
      'data': ['41', '36', '00', '23', '30', '01', '0C', '$V' ]
    }
  ]
}
