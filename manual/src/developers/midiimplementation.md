# SysEx implementation

Electra One MIDI controller can be configured, programmed, and controlled with two different communication protocols:

- SysEx MIDI messages
- low-level USB Raw HID

This document describes the essential data exchange and control commands using the SysEx message format over USB MIDI.


## The management port
Electra One can be controlled by exchanging SysEx messages over `Electra Controller CTRL` port. Messages sent to other Electra's ports will be ignored.

## Manufacturer SysEx Id
Electra One uses the MIDI association Manufacturer SysEx Id of Electra One s.r.o.

```
0x00 0x21 0x45
```


## Get Electra info
Electra One MIDI controller can provide info about the hardware and currently loaded firmware on a request. This call comes in handy if you need to find out if connected Electra is working correctly and get information about the firmware it runs.

For example, the Electra App account and Electra Editor use this call to verify that Electra One controller is connected correctly and display the connection indicator.


### Request
```
0xF0 0x00 0x21 0x45 0x02 0x7F 0xF7
```

- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x02 Query data
- 0x7F Electra information
- 0xF7 SysEx closing byte

### Response
```
0xF0 0x00 0x21 0x45 0x01 0x7F info-json-data 0xF7
```
- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x01 Data dump
- 0x7F Electra information
- `info-json-data` JSON document with info about Electra (see below)
- 0xF7 SysEx closing byte

##### An example of info-json-data
``` json
{
   "versionText":"v0.9.11",
   "versionSeq":91100,
   "serial":"EO1-123456"
}
```


## Upload a preset
The preset upload call is meant to upload a new preset to the Electra One MIDI controller. The preset is always loaded to a currently selected preset slot (out of 72 preset slots supported). Once the preset is uploaded, it is activated immediately and the user may use it.

### Request
```
0xF0 0x00 0x21 0x45 0x01 0x01 preset-json-data 0xF7
```

- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x01 Upload data
- 0x01 Preset file
- `preset-json-data` bytes representing ascii bytes of the preset file
- 0xF7 SysEx closing byte

Detailed information about `preset-json-data` is provided at [Preset format description](./presetformat.md)

### Response
- No response


## Download a preset

### Request
```
0xF0 0x00 0x21 0x45 0x02 0x01 0xF7
```

- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x02 Query data
- 0x01 Preset file
- 0xF7 SysEx closing byte

### Response
```
0xF0 0x00 0x21 0x45 0x01 0x01 preset-json-data 0xF7
```
- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x01 Data dump / Upload data
- 0x01 Preset file
- `preset-json-data` JSON document with info about Electra (see below)
- 0xF7 SysEx closing byte

##### An example of preset-json-data
``` json
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

Electra One MIDI controller responds with the SysEx message that has exactly the same format as the Preset upload message (see above). Thus, a SysEx message downloaded with a preset download call can be used to upload the preset to Electra later on.

This call always downloads a preset that is currently selected and active in the controller.

Detailed information about `preset-json-data` is provided at [Preset format description](./presetformat.md)


## Upload a configuration
The configuration upload call is meant to upload and apply a new Electra One configuration to the controller.

### Request
```
0xF0 0x00 0x21 0x45 0x01 0x02 configuration-json-data 0xF7
```

- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x01 Upload data
- 0x02 Configuration file
- `configuration-json-data` bytes representing ascii bytes of the configuration file
- 0xF7 SysEx closing byte

Detailed information about `configuration-json-data` is provided at [Configuration format description](./configurationformat.md)

### Response
- No response


## Download a configuration

### Request
```
0xF0 0x00 0x21 0x45 0x02 0x02 0xF7
```

- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x02 Query data
- 0x02 Configuration file
- 0xF7 SysEx closing byte

### Response
```
0xF0 0x00 0x21 0x45 0x01 0x02 configuration-json-data 0xF7
```
- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x01 Data dump / Upload data
- 0x02 Configuration file
- `configuration-json-data` JSON document with info about Electra (see below)
- 0xF7 SysEx closing byte

##### An example of configuration-json-data
``` json
{
   "version":1,
   "router":{
      "usbDevToMidiIo":true,
      "usbDevToUsbHost":true,
      "midiIoToUsbDev":true,
      "midiIoToUsbHost":true,
      "usbHostToMidiIo":true,
      "usbHostToUsbDev":true,
      "electraToMidiIo":true,
      "electraToUsbHost":true,
      "electraToUsbDev":true
   },
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
   ],
   "usbHostAssigments":[
     {
        "pattern":"launchpad",
        "port":3
     }
   ],
   "midiControl":[
     {
        "event":"switchPreset",
        "eventParameter":1,
        "midiMessage":"program",
        "parameterNumber":1
     }
   ]
}
```

## Upload a Lua script
The Lua script upload call is meant to upload and execute a new Electra One Lua script.

### Request
```
0xF0 0x00 0x21 0x45 0x01 0x7C script-source-code 0xF7
```

- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x01 Upload data
- 0x7C Lua Script file
- `script-source-code` bytes representing a source code of the Electra One Lua script application
- 0xF7 SysEx closing byte

Detailed information about developing Lua script applications is provided at [Electra One Lua script](./lua.md) documentation.

### Response
- No response


## Download a Lua script

### Request
```
0xF0 0x00 0x21 0x45 0x02 0x7C 0xF7
```

- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x02 Query data
- 0x7C Lua script file
- 0xF7 SysEx closing byte

### Response
```
0xF0 0x00 0x21 0x45 0x01 0x7C script-source-code 0xF7
```
- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x01 Data dump / Upload data
- 0x7C Lua Script file
- `script-source-code` bytes representing a source code of the Electra One Lua script application
- 0xF7 SysEx closing byte

##### An example of script-source-code
``` lua
-- Demo application

-- the Setup
clockCounter = 0
beatEnabled = 0


-- User functions
function myPrint (text)
    print ("my Lua: " .. text)
end


-- Standard callbacks
function midi.onClock (midiInput)
    if beatEnabled == 1 then
        if math.mod (clockCounter, 24) == 0 then
            myPrint ("midi beat received: interface=" .. midiInput.interface)
        end
    end
    clockCounter = clockCounter + 1
end

function onButtonDown (buttonId)
    myPrint ("button " .. buttonId .. " pressed")

    if buttonId == BUTTON_1 then
        myPrint ("Beat enabled")
        beatEnabled = 1
    elseif buttonId == BUTTON_4 then
        myPrint ("Beat disabled")
        beatEnabled = 0
    end
end
```
