# Version 2 test presets

A collection of presets to test new features of Electra firmware version 2. The presets are not compatible with current version of the Editor - **do not load them to Electra with firmware 0.9.x**

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

## JSON schema
This is a WIP (work-in-progress) version of JSON schema of [Electra preset file format version 2](https://github.com/martinpavlas/electra.one/blob/master/presets/version-2/schema.json)

## Sysex primer
Electra can be configured / programmed with two different interfaces: Sysex MIDI messages and low-level USB Raw HID. Following lines describe the essential preset exchange using the Sysex message format.

### Getting info about connect Electra
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


### Downloading current preser from Electra


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