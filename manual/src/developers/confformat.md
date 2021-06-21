# Config format description

This document describes the format of the Electra One configuration file. The configuration file allow users to customize behaviour of the controler.


## Config JSON format

### JSON schema
The JSON schema of the Electra configuration file is available at [GitHub](https://github.com/martinpavlas/electra.one/blob/master/schemas/config.json).


### Minification
We strongly advise minifying the JSON data prior to transfer to Electra One over the USB MIDI protocol. Minification greatly affects the amount of data that must be transferred, therefore it speeds up the time of uploading and downloading configuration files.


### Top level objects
A preset has a number of top-level objects. These are either simple elements providing info about the preset itself or complex objects that define the structure and data of the preset.

``` json
{
   "version":1,
   "router":{
   },
   "presetBanks":[
   ],
   "usbHostAssigments":[
   ],
   "midiControl":[
   ],
   "uiFeatures":[
   ]
}
```

#### version
Provides information about the version of the configuration file. Electra controller uses version information to distinguish between various configuration file formats.

- mandatory
- numeric

#### router
An object that sets rules for forwarding of inbound MIDI messages to output ports of available MIDI interfaces.

- optional
- object

##### example:

``` json
"router":{
   "usbDevToMidiIo":   true,
   "usbDevToUsbHost":  true,
   "midiIoToUsbDev":   true,
   "midiIoToUsbHost":  true,
   "usbHostToMidiIo":  true,
   "usbHostToUsbDev":  true,
   "midiIo1Thru":  true,
   "midiIo2Thru":  true
}
```

Attributes:
| attribute       |  description                                       |
|-----------------|----------------------------------------------------|
| usbDevToMidiIo  | forwarding USB Device messages to MIDI IO ports    |
| usbDevToUsbHost | forwarding USB Device messages to USB Host ports   |
| midiIoToUsbDev  | forwarding MIDI IO to USB Device ports             |
| midiIoToUsbHost | forwarding MIDI IO to USB Host ports               |
| usbHostToMidiIo | forwarding USB Host to MIDI IO ports               |
| usbHostToUsbDev | forwarding USB Host to USB Device ports            |
| midiIo1Thru     | forwarding MIDI IO IN 1 to MIDI IO OUT 1 port      |
| midiIo2Thru     | forwarding MIDI IO IN 2 to MIDI IO OUT 2 port      |

Values:
| value   | description         |
|---------|---------------------|
| false   | forwarding disabled |
| true    | forwarding enabled  |


#### presetBanks
An array of preset bank definitions. A preset bank is a named collection of 12 presets.

- optional
- array

##### example:

``` json
"presetBanks":[
   {
      "id":1,
      "name":"FX UNITS",
      "color":"FFFFFF"
   },
   {
      "id":2,
      "name":"SAMPLERS",
      "color":"529DEC"
   }
]
```


#### usbHostAssigments
An array of instructions on how to assign USB Host devices to Electra's ports.

- optional
- array

##### examples:

``` json
"usbHostAssigments":[
   {
      "pattern":"launchpad",
      "port":3
   },
   {
      "pattern":"keycontrol",
      "port":1
   }
]
```


#### midiControl
An array of assignments of MIDI messages to Electra internal commands, such as page and preset switching.

- optional
- array

##### example:

``` json
"midiControl":[
   {
      "event":"switchPage",
      "eventParameter":1,
      "midiMessage":"cc7",
      "parameterNumber":1
   },
   {
      "event":"switchPageNext",
      "midiMessage":"note",
      "parameterNumber":36
   },
   {
      "event":"switchPreset",
      "eventParameter":1,
      "midiMessage":"program",
      "parameterNumber":1
   },
   {
      "event":"switchPresetPrev",
      "midiMessage":"note",
      "parameterNumber":50
   }
]
```


### uiFeatures
The UI features object is used to configure / customize the user interface of the controller.

##### example:

``` json
{
   "version":1,
   "uiFeatures":{
      "touchSwitchControlSets":true,
      "activeControlSetType":"dim"
   }
}
```

#### touchSwitchControlSets
When set to true, touch on controls changes changes the active control set (section of active controls). When set to false, only hardware buttons switch the active control set.

- mandatory
- boolean

#### activeControlSetType
Sets the type of the visual indicator of the active control set.

- mandatory
- enum
  - none
  - dim
  - bars
  - background


### presetBank
A preset bank is a named collection of 12 presets. Electra support 6 presets banks. Each bank has a name and color assigned.

##### example:

``` json
{
   "id":1,
   "name":"FX UNITS",
   "color":"FFFFFF"
}
```

#### id
A unique identifier of the preset bank.

- mandatory
- numeric
- min = 1
- max = 6

#### name
A user-defined name of the bank. The name makes it easier for users to remember and identify the banks.

- mandatory
- string
- minLength = 1
- maxLength = 20

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


### usbHostAssignment
USB Host assignments allow automating the assignment of MIDI devices connected to the USB host interface to Electra's internal ports. A string pattern is used to match the product name of USB devices.

##### example:

``` json
{
   "pattern":"launchpad",
   "port":3
}
```

#### pattern
A string to be matched with USB Device product name. If the pattern is found within the product name, the device is assigned to the specified port. The matching algorithm is case-insensitive. The first match results in the port assignment, subsequent matches are ignored.

- mandatory
- string
- minLength = 1
- maxLength = 20

#### port
An identifier of Electra's internal port. The port is expressed as a number, where Port CTRL is represented with a port 3.

- numeric
- min = 1
- max = 3


### midiControl
A rule that tells what internal event will be triggered after receipt of the given MIDI message. The MIDI message is defined by the MIDI message type and the parameter number.

##### example:

``` json
{
   "event":"switchPreset",
   "eventParameter":1,
   "midiMessage":"program",
   "parameterNumber":1
}
```

#### event
A command to be triggered.

- mandatory
- string
- enum
  - switchPreset
  - switchPresetPrev
  - switchPresetNext
  - switchPage
  - switchPagePrev
  - switchPageNext

#### eventParameter
An optional parameter of the event, eg. page number.

- optional
- numeric
- min = 0
- max = 127

#### midiMessage
A MIDI message type that will trigger the event

- mandatory
- string
- enum
  - note
  - cc7
  - program

#### parameterNumber
A parameter of MIDI message that will trigger the event

- mandatory
- numeric
- min = 0
- max = 127
