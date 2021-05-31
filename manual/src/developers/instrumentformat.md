# Instrument format description

This document describes the format of the Electra One instrument file. The instrument file provides a complete definition of MIDI implementation of a particular MIDI device (synth, sampler, FX unit, etc). The instrument files are not transferred to the controller. Instead, they are used to generate [preset files](./presetformat.md).

## Instrument JSON format

### JSON schema
The JSON schema of the Electra instrument file is available at [GitHub](https://github.com/martinpavlas/electra.one/blob/master/schemas/instr.json).


### Top level objects
The preset has a number of top-level objects. These are either simple elements providing info about the preset itself or complex objects that define the structure and data of the preset.

``` json
{
  "version":1,
  "id":"mpa-xctrl",
  "name":"X Controller",
  "manufacturer":"Electra.One",
  "manufacturerId":"e1",
  "categories": [
  ],
  "overlays": [
  ],
  "parameters": [
  ],
  "patch": [
  ]
}

```

#### version
Provides information about the version of the instrument file. Electra controller uses version information to distinguish between various preset file formats.

- optional
- numeric
- default = 1


#### id
An unique identifier of the instrument file. The `id` is used to identify the developer and the instrument file itself. Suggested format is `<developer>-<unique id in developer's space>`. The `id` should not be shown to the users.

- optional
- string
- minLength = 0
- maxLength = 20


#### name
A name of the instrument. The field should carry information about the model, make, or the device name.

- mandatory
- string
- minLength = 0
- maxLength = 20

#### manufacturer
A name of the instrument. The field should carry information about the model, make, or the device name.

- mandatory
- string
- minLength = 0
- maxLength = 20


#### categories
An array of pages. A page is a collection of controls and groups displayed to the user at once.

- mandatory
- array

##### example:

``` json
"pages": [
   {
      "id": 1,
      "name": "OSCILLATORS"
   },
   {
      "id": 2,
      "name": "FILTER"
   }
]
```


#### overlays
An array of overlays. An overlay is a list of text labels or graphical symbols that can be assigned to a control.

- optional
- array

##### examples:

``` json
"overlays": [
   {
      "id": 1,
      "items": [
         {
            "value": 0,
            "label": "SAW"
         },
         {
            "value": 1,
            "label": "SQUARE"
         },
         {
            "value": 2,
            "label": "WHITE NOISE"
         },
         {
            "value": 4,
            "label": "PINK NOISE"
         }
      ]
   },
   {
      "id": 2,
      "items": [
         {
            "value": 0,
            "label": "Morph (P6)"
         },
         {
            "value": 16,
            "label": "Sinus"
         },
         {
            "value": 32,
            "label": "Triangle"
         }
      ]
   },
   {
      "id": 3,
      "items": [
         {
            "value": 0,
            "label": "Square",
            "bitmap": "AAAAAAAA/P//AQAA/P//AQAwDACAAQAwDACAAQAwDACAAQAwDACAAQAwDACAAQAwDACAAQAwDACAAQAwDACAAQAwDACAAQAwDACAAQAwDACAAQAwDACA//8/DACA//8/AAAAAAAAAAAAAAAA"
         },
         {
            "value": 1,
            "label": "Triangle",
            "bitmap": "AAAAAAAAAADgAAAAAADwAQAAAAAYAwAAAAAMBgAAAAAGDAAAAAADGAAAAIABMAAgAMAAYAAwAGAAwAAYBDAAgAEMDBgAAAMGGAwAAAYDMAYAAIwB4AMAAPgAwAEAAHAAAAAAAAAAAAAAAAAA"
         },
         {
            "value": 2,
            "label": "Saw",
            "bitmap": "AAAAAAAAAAAAwAEAAAAA8AEAAAAAnAEAAAAAhwEAAADAgQEAAABwgAEAAAAcgAEAAAAHgAEAAMABgAE4AHAAgAEOABwAgIEDAAcAgOEAwAEAgDkAcAAAgA8AHAAAgAMAAAAAAAAAAAAAAAAA"
         }
      ]
   }
]
```


#### parameters
An array of controls. A control is a representation of one or more MIDI parameters or messages that can be controlled by the user.

- mandatory
- array

##### examples:

A simple control with one value assigned.

``` json
"controls": [
   {
      "id": 1,
      "type": "fader",
      "name": "WHITE",
      "color": "FFFFFF",
      "bounds": [
         0,
         40,
         146,
         56
      ],
      "pageId": 1,
      "controlSetId": 1,
      "inputs": [
         {
            "potId": 1,
            "valueId": "value"
         }
      ],
      "values":[
         {
            "id": "value",
            "message": {
               "deviceId": 1,
               "type": "cc7",
               "parameterNumber": 1,
               "min": 0,
               "max": 127
            },
            "min": 0,
            "max": 127
         }
      ]
   },
   {
      "id": 2,
      "type": "fader",
      "name": "RED",
      "color": "F45C51",
      "bounds": [
         170,
         40,
         146,
         56
      ],
      "pageId": 1,
      "controlSetId": 1,
      "visible": false,
      "inputs": [
         {
            "potId": 2,
            "valueId": "value"
         }
      ],
      "values": [
         {
            "message": {
               "deviceId": 1,
               "type": "cc7",
               "parameterNumber": 2,
               "min": 0,
               "max": 127
            },
            "min": 0,
            "max": 127,
            "formatter": "formatFractions"
         }
      ]
   }
]
```
