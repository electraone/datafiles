# Version 2 test presets

A collection of presets to test new features of Electra firmware version 2. The presets are not compatible with current version of the Editor - **do not load them to Electra with firmware 0.9.x**

![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/adsr.png?raw=true)

More pics available below...

## Reasons for version 2

Elecra has been used by real users for about over 6 months now. We have listened to the feedback from our users as well as we have come up with number of new features we wanted to implement. It has become obvious that the format of Electra preset file is rather limiting. This document is a proposal on a new format to be used in near future. The format is designed to address following feature requests:

- support pads (touch operated on-screen controls)
- support controls that represent more than one value (envelopes, etc)
- support macro functionality (one knob changing of multiple controls at the same time)
- support lists with images (eg. waveshapes) instead of text labels
- make it possible to assign "functions" to rubber buttons
- place controls freely on the canvas (not strictly aligned in the 6x6 grid)
- allow setting custome size to individual controls

## Testing and contributing

If you wish to take part of testing and help us with fine tuning the format of version 2 preset format, just contact us. We will give you an access to an online tool that allows you to upload presets in new format to your Electra. Of course, you will also need to update your Electra to a beta version on the firmware.

We will be happy if any of you decides to develop their own tools for creating and managing presets. Again, if you have ideas, just contact us.

## Sysex primer
Electra can be configured / programmed with two different interfaces: Sysex MIDI messages and low-level USB Raw HID. Following lines describe the essential preset exchange using the Sysex message format.

### Getting info about connected Electra
Electra can provide info about itself on a request. This call comes in handy if you need to find out if connected Electra is working correctly and get information about the firmware it runs.

#### Request

```
0xF0 0x00 0x21 0x45 0x7F 0xF7
```

- 0xF0 Sysex header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x7F info request command
- 0xF7 Sysex closing byte

#### Response

```
0xF0 0x00 0x21 0x45 0x7F info-json-data 0xF7
```
- 0xF0 Sysex header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x7F info request command
- info-json-data JSON document with info about Electra (see below)
- 0xF7 Sysex closing byte

```
{
   "versionText":"eOS 1.0",
   "versionSeq":91100,
   "serial":"EO1-123456"
}
```


### Uploading a preset to Electra
Preset upload call is meant to upload a new preset to Electra. The preset is always loaded to a currently selected preset slot (out of 12 preset slots supported). Once the preset is uploaded, it is activated immediately and the user may use it.

#### Request

```
0xF0 0x00 0x21 0x45 0x01 0x00 preset-json-data 0xF7
```

- 0xF0 Sysex header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x01 upload command
- 0x00 preset file
- preset-json-data bytes representing ascii bytes of the preset file
- 0xF7 Sysex closing byte

#### Response
No response


### Downloading current preset from Electra


#### Request
```
0xF0 0x00 0x21 0x45 0x02 0x00 0xF7
```

- 0xF0 Sysex header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x02 download command
- 0x00 preset file
- 0xF7 Sysex closing byte

#### Response
```
0xF0 0x00 0x21 0x45 0x01 0x00 preset-json-data 0xF7
```

Electra responds with the sysex message that has exactly the same format as the Preset upload messsage (see above). Thus a Sysex message downloaded with a preset download call can directly used to upload the preset to Electra later.

## Brief description of the preset JSON

### JSON schema
This is a WIP (work-in-progress) version of JSON schema of [Electra preset file format version 2](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/schema.json)

### Top level objects

```
{
  "version":2,
  "name":"ADSR Test",
  "projectId":"d8WjdwYrP3lRyyx8nEMF",
  "pages":[
  ],
  "devices":[
  ],
  "overlays":[
  ],
  "groups":[
  ],
  "controls":[
  ]
}

```

#### version
Provides information about the version of the preset file. Electra controller uses version information to distinguish between various preset file formats.

- mandatory
- numeric

#### name
A name of the preset. The name will be shown to the user on the screen in the status bar.

- mandatory
- string
- minLength = 1
- maxLength = 20

#### projectId
An identifier of the Electra Editor project. The identifier is used to associate a preset with an Electra Editor project.

- optional - used only by the editor
- string
- minLength = 20
- maxLength = 20


#### Pages
An array of pages. Electra supports up to 12 pages, identified with ids 1 .. 12. A page is a collection of controls and graphic objects shown on the screen at once. Each page has a name to make it easier to switch between pages. The page name is shown in the status bar.

- mandatory
- array

##### example:

```
  "pages":[
    {
      "id":1,
      "name":"OSCILLATORS"
    },
    {
      "id":2,
      "name":"FILTER"
    }   
  ]
```

#### devices
A device is a MIDI hardware or software instrument connected to one of the Electra's ports. It can be a hardware synth connected to a MIDI IO port, hardware sequencer connected to Electra's USB host port or a software plugin attached to Electra's USB device ports. Electra can handle up to 16 simultaneously connected devices. When working with Electra, you always need to define your connected devices, you never send or receive MIDI messages from port and channel directly.

- mandatory
- array

##### example:
```
   "devices":[
      {
         "id":1,
         "name":"My MKS-50",
         "instrumentId":"roland-mks50",
         "port":1,
         "channel":1
      },
      {
         "id":2,
         "name":"BeatFX plugin",
         "instrumentId":"generic-midi",
         "port":2,
         "channel":1
      }
   ]
```

#### overlays
Overlays are lists of text labels linked to particular values. Typically they are assigned to selection list controls or to faders. Overlays are referred by its identifier. Overlay items can be both text labels or bitmap images.

- optional
- array
-
##### examples:


```
 "overlays":[
      {
         "id":1,
         "items":[
            {
               "value":0,
               "label":"SAW"
            },
            {
               "value":1,
               "label":"SQUARE"
            },
            {
               "value":2,
               "label":"WHITE NOISE"
            },
            {
               "value":3,
               "label":"PINK NOISE"
            }
         ]
      },
      {
         "id":2,
         "items":[
            {
               "value":0,
               "label":"Morph (P6)"
            },
            {
               "value":1,
               "label":"Sinus"
            },
            {
               "value":2,
               "label":"Triangle"
            }
       },
       {
         "id":3,
         "items":[
            {
               "value":0,
               "label":"Small",
               "bitmap":[
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  255, 255, 255, 255, 255, 255,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  255, 255, 255, 255, 255, 255
               ]
            },
            {
               "value":1,
               "label":"Medium",
               "bitmap":[
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  255, 255, 255, 255, 255, 255,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  255, 255, 255, 255, 255, 255
               ]
            },
            {
               "value":2,
               "label":"Large",
               "bitmap":[
                  255, 255, 255, 255, 255, 255,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  255, 255, 255, 255, 255, 255
               ]
            }
         ]
      }
   ]
```



#### groups
Graphical separators used to organize controls to groups by meaning. For example a group "Envelope 1" can be created for controls "Attack", "Decay", "Sustain", and "Release". Groups do not provide any other functionlity then the visual grouping of controls.

- optional
- array

##### example:

```
   "groups":[
      {
         "pageId":1,
         "name":"ATTRIBUTES",
         "bounds":[
            170,
            16,
            485,
            16
         ],
         "color":"FFFFFF"
      }
   ]
```

#### controls
Controls represent means to visualize and change values of MIDI parameters. A controls is for example a fader, knob, pad, or ADSR envelope. A control consists of information about values that are mapped to particular MIDI messages.

- mandatory
- array

##### examples:

A simple control with one value assigned.

```
   "controls":[
      {
         "id":1,
         "type":"fader",
         "name":"WHITE",
         "color":"FFFFFF",
         "bounds":[
            0, 40, 146, 56
         ],
         "pageId":1,
         "controlSetId":1,
         "potId":1,
         "values":[
            {
               "id":"value",
               "message":{
                  "deviceId":1,
                  "type":"cc7",
                  "parameterNumber":1,
                  "min":0,
                  "max":127
               },
               "min":0,
               "max":127
            }
         ]
      },
      {
         "id":2,
         "type":"fader",
         "name":"RED",
         "color":"F45C51",
         "bounds":[
            170, 40, 146, 56
         ],
         "pageId":1,
         "controlSetId":1,
         "potId":2,
         "values":[
            {
               "message":{
                  "deviceId":1,
                  "type":"cc7",
                  "parameterNumber":2,
                  "min":0,
                  "max":127
               },
               "min":0,
               "max":127
            }
         ]
      }
   ]
```


### Device
A device represents an instance of hardware or software MIDI device connected to a particular MIDI port and channel.

##### example:

```
    {
      "id":1,
      "name":"Generic MIDI",
      "instrumentId":"generic-midi",
      "port":1,
      "channel":1
    }
```

#### id
A unique identifier of the device. The identifier is used in other objects to refer to a particular device.

- mandatory
- numeric
- min = 1
- max = 16

#### name
A user defined name of the device. The name makes it easier for users to remember and identify devices.

- mandatory
- string
- minLength = 1
- maxLength = 20

#### instrumentId
An identifier of the type of the device. The instrumentId tells Electra what type of device is connected and allows Electra to exchange device specific MIDI messages.

- optional
- enum
  - general-midi
  - roland-mks50
  - roland-tb3
  - rhodes-chroma
  - yamaha-tx7
  - dsi-mopho
  - elektron-digitone
  - elektron-octatrack
  - toraizas1
- default = general-midi

#### port
A port number that represents the MIDI bus inside the Electra. Port 1 interconnects MIDI IO port 1, USB Host port 1, USB device port 1. Port 2 interconnects MIDI IO 2, USB Host port 2, and USB device port 2.

- mandatory
- numeric
- min = 1
- max = 16

#### channel
A MIDI channel

- mandatory
- numeric
- min = 1
- max = 16


### Overlay
A list of text or bitmap labels that can be assigned to list or fader controls.

##### examples:

an overlay with text labels only

```
      {
         "id":1,
         "items":[
            {
               "value":0,
               "label":"SAW"
            },
            {
               "value":1,
               "label":"SQUARE"
            },
            {
               "value":2,
               "label":"WHITE NOISE"
            },
            {
               "value":3,
               "label":"PINK NOISE"
            }
         ]
      }
```

an overlay with the bitmap data

```
       {
         "id":3,
         "items":[
            {
               "value":0,
               "label":"Small",
               "bitmap":[
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  255, 255, 255, 255, 255, 255,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  255, 255, 255, 255, 255, 255
               ]
            },
            {
               "value":1,
               "label":"Medium",
               "bitmap":[
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0,
                  255, 255, 255, 255, 255, 255,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  255, 255, 255, 255, 255, 255
               ]
            },
            {
               "value":2,
               "label":"Large",
               "bitmap":[
                  255, 255, 255, 255, 255, 255,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  128, 0, 0, 0, 0, 1,
                  255, 255, 255, 255, 255, 255
               ]
            }
         ]
      }
```


#### id
A unique identifier of the overlay. List and fader controls use the identifier to refer to a particular overlay.

- mandatory
- numeric
- min = 1
- max = 128

#### items
An array of value - label pairs.

- mandatory
- array

#### value
A MIDI value assigned to the label.

- mandatory
- numeric
- min = 0
- max = 16383

#### label
A text label assigned to the MIDI value. The control displays the text labels to the users.

- mandatory
- string
- minlength = 1
- maxLength = 14

#### bitmap
An array of bytes that represent the bitmap data. Data is in XBM format, ie. each bit represent one pixel. The dimensions of the bitmap are 48x18 pixels. Note, this attribute will be soon transformed to the base64 encoded string.

- mandatory
- array of 108 bytes


### Group

##### example:

```
      {
         "pageId":1,
         "name":"ENVELOPE",
         "bounds":[
            0, 16, 486, 16
         ],
         "color":"FFFFFF"
      }
```

#### pageId
A reference to a page identifier. Each control must belong to exactly one page and the page must be defined withing the pages array.

- mandatory
- numeric
- min = 1
- max = 12

#### name
A name of the group. The name is shown to the user inside the group graphics.

- mandatory
- string
- minLength = 1
- maxLength = 20

#### bounds
A bounding box of the control, ie. the definition of the control's position on the screen and its size. The bounding box is represented as an array of [x, y, width, height]

- mandatory
- array with fixed items

#### color
A 24-bit RGB code of the control's color. The colors are limited to six predefined colors.

- optional
- string
- default = FFFFFF
- enum
  - FFFFFF (white)
  - F45C51 (red)
  - F49500 (orange)
  - 529DEC (blue)
  - 03A598 (green)
  - C44795 (pink)


### Control

##### examples:

A simple control with one value assigned.

```
   "controls":[
      {
         "id":1,
         "type":"fader",
         "name":"WHITE",
         "color":"FFFFFF",
         "bounds":[
            0, 40, 146, 56
         ],
         "pageId":1,
         "controlSetId":1,
         "potId":1,
         "values":[
            {
               "id":"value",
               "message":{
                  "deviceId":1,
                  "type":"cc7",
                  "parameterNumber":1,
                  "min":0,
                  "max":127
               },
               "min":0,
               "max":127
            }
         ]
      },
      {
         "id":2,
         "type":"fader",
         "name":"RED",
         "color":"F45C51",
         "bounds":[
            170, 40, 146, 56
         ],
         "pageId":1,
         "controlSetId":1,
         "potId":2,
         "values":[
            {
               "message":{
                  "deviceId":1,
                  "type":"cc7",
                  "parameterNumber":2,
                  "min":0,
                  "max":127
               },
               "min":0,
               "max":127
            }
         ]
      }
   ]
```


an ADSR control with multiple values assigned

```
    {
      "id":1,
      "pageId":1,
      "bounds":[
        10,
        40,
        158,
        73
      ],
      "controlSetId":1,
      "potId":1,
      "type":"adsr",
      "name":"ADSR",
      "color":"F49500",
      "defaultValueId":"attack",
      "values":[
        {
          "id":"attack",
          "min":0,
          "max":127,
          "message":{
            "deviceId":1,
            "type":"cc7",
            "parameterNumber":1,
            "min":0,
            "max":127
          }
        },
        {
          "id":"decay",
          "min":0,
          "max":127,
          "message":{
            "deviceId":1,
            "type":"cc7",
            "parameterNumber":2,
            "min":0,
            "max":127
          }
        },
        {
          "id":"sustain",
          "min":0,
          "max":127,
          "message":{
            "deviceId":1,
            "type":"cc7",
            "parameterNumber":3,
            "min":0,
            "max":127
          }
        },
        {
          "id":"release",
          "min":0,
          "max":127,
          "message":{
            "deviceId":1,
            "type":"cc7",
            "parameterNumber":4,
            "min":0,
            "max":127
          }
        }
      ]
    }
```

#### id
A unique identifier of the control. Electra uses the id to uniquely identify each control.

- mandatory
- numeric
- min = 1
- max = 432

#### type
A type of functional and visual representation of the control.

- mandatory
- enum
  - fader
  - list
  - pad
  - vfader
  - dial
  - adsr
  - adr
  - dx7envelope

#### name
A name of the control. The name is usually shown underneath the control. When the control receives touch event via the physical knob, the name is highlighted. If a name is an empty string or the attribute is omitted, name is not shown and touch indication is disabled.

- optional
- string
- minLength = 0
- maxLength = 14

#### color
A 24-bit RGB code of the control's color. The colors are limited to six predefined colors.

- optional
- string
- default = FFFFFF
- enum
  - FFFFFF (white)
  - F45C51 (red)
  - F49500 (orange)
  - 529DEC (blue)
  - 03A598 (green)
  - C44795 (pink)

#### bounds
A bounding box of the control, ie. the definition of the control's position on the screen and its size. The bounding box is represented as an array of [x, y, width, height]

- mandatory
- array with fixed items

#### pageId
A reference to a page identifier. Each control must belong to exactly one page and the page must be defined withing the pages array.

- mandatory
- numeric
- min = 1
- max = 12

#### controlSetId
Controls placed on one page can be further divided in to control sets. The control sets are used t assign controls to pots (knobs). Users may switch between controls sets by pressing the hardware buttons or by sending MIDI messages to Electra. Only one control set can be active at the time. The controls of the activite control sets are highlighted.

- optional
- numeric
- default = 0
- min = 0
- max 12

#### potId
An identifier of the physical pot (knob). There are 12 pots on Electra, identified as 1 (top-left) to 12 (bottom-right) pot. A control with an assigned pot, can be controlled by turning the physical knob. Providing given control set is active.

- optional
- numeric
- default = 0
- min = 0
- max = 12

#### values
An array of values associated with the control. The values represent an instance of value of certain MIDI paramater. Actions made with the control (turning assigned pot, touch events) effectivaly change associated values.

examples:
```
"values":[
   {
      "id":"value",
      "min":-64,
      "max":63,
      "message":{
         "deviceId":1,
         "type":"cc7",
         "parameterNumber":1,
         "min":0,
         "max":127
      }
   }
]
```

#### defaultValueId
Controls with multiple values may have one value set as a default. When a multi-value control is assigned to a pot, the default value is modified when the pot is turned.

- optional
- string
- default = value
- minLength = 1
- maxLength = 20


### Value
A value represents a parameter value of given control. A value is mapped to a value of a MIDI parameter / message. The value object allows translation of MIDI values to user friendly display values.

##### examples:

a continuous value

```
   {
      "id":"value",
      "min":-64,
      "max":63,
      "message":{
         "deviceId":1,
         "type":"cc7",
         "parameterNumber":1,
         "min":0,
         "max":127
      }
   }
```

value with a list of discrete values (an overlay)
```
   {
      "id":"value",
      "overlayId":2,
      "message":{
         "deviceId":1,
         "type":"cc7",
         "parameterNumber":2
       }        
    }
```

#### id
An identifier of the value. This identifier is a text string. This is to make it easier for the programmers to get oriented. The identifier expresses the meaning of the value, eg. attack, rate, or value.

- optional
- string
- default = value
- minLength = 1
- maxLength = 20

#### min
A minimum value that the control can display. Note this is not the MIDI value, it is the minimum value that can be displayed by the control.

- optional
- numeric
- default = 0
- min = -16383
- max = 16383

#### max
A maximum value that the control can display. Note this is not the MIDI value, it is the maximum value that can be displayed by the control.

- optional
- numeric
- default = 0
- min = -16383
- max = 16383

#### overlayid
A reference to the overlay identifier defined in the array of overlays. The list control will use the overlay items as the list items. Fader control will show overlay labels for matching values.

- optional
- numeric
- min = 1
- max = 128

#### message
An object that describes a MIDI message that will be sent when the value of the control is changed by the touch or turning the knobs. The message is also use to parse incoming MIDI messages. When incoming midi data matches the message object, the value of the control is adjusted accordingly.

- mandatory
- object


### Message

##### examples:

A simple CC7 message
```
      "message":{
         "deviceId":1,
         "type":"cc7",
         "parameterNumber":1,
         "min":0,
         "max":127
      }
```

A message with a sysex template
```
      "message": {
         "deviceId": 1,
         "type": "sysex",
         "parameterNumber": 6,
         "min": 0,
         "max": 127,
         "data":[
            67,
            16,
            1,
            15,
            {
               "type":"value",
               "rules":[
                  {
                     "parameterNumber":40,
                     "bitPosition":0,
                     "bitWidth":3
                  }
               ]
            }
         ]
      }
```

#### deviceId
A reference to the device identifier defined in the array of devices. The message will be sent to the referenced device. Also messages received from this device that match the message definition will modify the value accordingly.

#### type
A type of the MIDI message. The type is not limited to basic MIDI messages, but supports their higher level implementation, such as NRPN, etc.

- mandatory
- enum
  - cc7
  - cc14
  - nrpn
  - rpn
  - sysex
  - note
  - program
  - start
  - stop

#### parameterNumber
A parameter number of the message. The parameterNumber is used to specify the parameter number, note number, program number. To fully support NRPN and sysex, a parameterNumber is a 14-bit number.

- optional
- numeric
- min = 0
- max = 16383

#### min
A MIDI minimum value to be transfered. This minimum MIDI value is mapped to the display value minimum defined in the value object.

- optional
- numeric
- default = 0
- min = 0
- max = 16383

#### max
A MIDI maximum value to be transfered. This maximum MIDI value is mapped to the display value maximum defined in the value object.

- optional
- numeric
- default = 0
- min = 0
- max = 16383

#### data
An array of bytes and placeholder variables to be sent and parsed for sysex messages.

- optional
- array


## Demos
### Simple demo
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/colors.png?raw=true)

[A simple demo of version 2 format](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/colors.epr)

### Scrollable lists
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/lists.png?raw=true)

[A demo of several list controls](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/lists.epr)

### Lists with bitmap data
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/list-bitmap.png?raw=true)

[A demo of a lists with bitmap images](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/list-bitmap.epr)

### Pads
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/pads.png?raw=true)

[A demo of various types of pads](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/pads.epr)

### Vertical faders
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/vfaders.png?raw=true)

[A demo of vertical faders](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/vfaders.epr)

### Dials
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/dials.png?raw=true)

[A demo of dial knob controls](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/dials.epr)

### ADSR envelope
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/adsr.png?raw=true)

[A demo of an ADSR envelope](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/adsr-demo.epr)

### ADR envelope
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/adr.png?raw=true)

[A demo of an ADR envelope](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/adr-demo.epr)

### DX7 (multi-stage) envelope
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/dx7env.png?raw=true)

[A demo o a DX7 envelope](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/dx7envelope.epr)

### Macro
![image](https://github.com/martinpavlas/electra.one/blob/master/docs/images/v2/macro.png?raw=true)

[A demo of "macros"](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/macro.epr)
