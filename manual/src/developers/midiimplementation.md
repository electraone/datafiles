# SysEx implementation

Electra One MIDI controller can be configured, programmed, and controlled with two different communication protocols:

- SysEx MIDI messages
- low-level USB Raw HID

This document describes the essential data exchange and control commands using the SysEx message format over the USB MIDI interface.

::: warning Note
Firmware version 1.5.12 or later is required to have all the SysEx messages listed in this document supported.
:::


## The management port
Electra One can be controlled by exchanging SysEx messages over the `Electra Controller CTRL` port. Messages sent to other Electra's ports will be ignored. The `CTRL` port is sometimes listed as `MIDIIN3` or `PORT 3`. You can find more information on this in the [USB connection issues](https://docs.electra.one/troubleshooting/connectionissues.html) troubleshooting guide.

## Manufacturer SysEx Id
All SysEx messages must carry information about the manufacturer. Electra One uses the MIDI association Manufacturer SysEx Id of Electra One s.r.o.

```
0x00 0x21 0x45
```

## Querying data from the controller

### Get an Electra info
Electra One MIDI controller can provide info about the hardware and currently loaded firmware on a request. This call comes in handy if you need to find out if connected Electra is working correctly and get information about the firmware it runs.

For example, the Electra App account and Electra Editor use this call to verify that Electra One controller is connected correctly and display the connection indicator.


#### Request
```
0xF0 0x00 0x21 0x45 0x02 0x7F 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x02` Query data
- `0x7F` Electra information
- `0xF7` SysEx closing byte

#### Response
```
0xF0 0x00 0x21 0x45 0x01 0x7F info-json-data 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x01` Data dump
- `0x7F` Electra information
- `info-json-data` JSON document with info about Electra (see below)
- `0xF7` SysEx closing byte

Detailed information about `info-json-data` is provided at (to be done).

##### An example of info-json-data
``` json
{
  "versionText": "v1.5.11",
  "versionSeq": 100501100,
  "serial": "EO-123456",
  "hwRevision": "2.30"
}
```


### Get a run-time information
A request call to fetch the run-time information from the Electra firmware. Only the information about free memory is included at the present time.

#### Request
```
0xF0 0x00 0x21 0x45 0x02 0x7E 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x02` Query data
- `0x7E` Run-time information
- `0xF7` SysEx closing byte

#### Response
```
0xF0 0x00 0x21 0x45 0x01 0x7E runtime-json-data 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x01` Data dump
- `0x7E` Run-time information
- `runtime-json-data` JSON document with info about run-time data
- `0xF7` SysEx closing byte

Detailed information about `runtime-json-data` is provided at (to be done).

##### An example of runtime-json-data
``` json
{
  "freePercentage": 85
}
```


### Get a preset
A request to fetch a preset that is active in the controller.

#### Request
```
0xF0 0x00 0x21 0x45 0x02 0x01 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x02` Query data
- `0x01` Preset file
- `0xF7` SysEx closing byte

#### Response
```
0xF0 0x00 0x21 0x45 0x01 0x01 preset-json-data 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x01` Data dump
- `0x01` Preset file
- `preset-json-data` JSON document with info about Electra (see below)
- `0xF7` SysEx closing byte

Electra One MIDI controller responds with the SysEx message that has exactly the same format as the Preset upload message. Thus, a SysEx message downloaded with the Get preset call can be used to upload the preset to Electra later on.

This call always downloads a preset that is currently selected and active in the controller.

Detailed information about `preset-json-data` is provided at [Preset format description](./presetformat.md)

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


### Get an Electra configuration
A request call to fetch current Electra One configuration.

#### Request
```
0xF0 0x00 0x21 0x45 0x02 0x02 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x02` Query data
- `0x02` Configuration file
- `0xF7` SysEx closing byte

#### Response
```
0xF0 0x00 0x21 0x45 0x01 0x02 configuration-json-data 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x01` Data dump
- `0x02` Configuration file
- `configuration-json-data` JSON document with info about Electra (see below)
- `0xF7` SysEx closing byte

Detailed information about `configuration-json-data` is provided at [Configuration format description](./confformat.md)

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

### Get a list of snapshots
A request call to fetch a list of snaphots of an active preset.

#### Request
```
0xF0 0x00 0x21 0x45 0x02 0x05 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x02` Query data
- `0x05` Snaphost list
- `0xF7` SysEx closing byte

#### Response
```
0xF0 0x00 0x21 0x45 0x01 0x05 snapshot-list-json-data 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x01` Data dump
- `0x05` Configuration file
- `snapshot-list-json-data` JSON document with a list of snapshots
- `0xF7` SysEx closing byte

##### An example of snapshot-list-json-data
``` json
[
   {
      "slot":0,
      "bankNumber":0,
      "name":"M1 Piano",
      "color":"F45C51"
   },
   {
      "slot":1,
      "bankNumber":0,
      "name":"String section",
      "color":"529DEC"
   }
]
```

### Get a Lua script
A request call to download Lua script that is currently stored in the controller.

#### Request
```
0xF0 0x00 0x21 0x45 0x02 0x7C 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x02` Query data
- `0x7C` Lua script file
- `0xF7` SysEx closing byte

#### Response
```
0xF0 0x00 0x21 0x45 0x01 0x7C script-source-code 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x01` Data dump
- `0x7C` Lua Script file
- `script-source-code` bytes representing a source code of the Electra One Lua script application
- `0xF7` SysEx closing byte

Detailed information about developing Lua script applications is provided at [Electra One Lua script](./lua.md) documentation.

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


## Uploading data to the controller

### Upload a preset
The preset upload call is meant to upload a new preset to the Electra One MIDI controller. The preset is always loaded to a currently selected preset slot (out of 72 preset slots supported). Once the preset is uploaded, it is activated immediately and the user may use it.

```
0xF0 0x00 0x21 0x45 0x01 0x01 preset-json-data 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x01` Upload data
- `0x01` Preset file
- `preset-json-data` bytes representing ascii bytes of the preset file
- `0xF7` SysEx closing byte

Detailed information about `preset-json-data` is provided at [Preset format description](./presetformat.md)


### Upload a configuration
The configuration upload call is meant to upload and apply a new Electra One configuration to the controller.

```
0xF0 0x00 0x21 0x45 0x01 0x02 configuration-json-data 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x01` Upload data
- `0x02` Configuration file
- `configuration-json-data` bytes representing ascii bytes of the configuration file
- `0xF7` SysEx closing byte

Detailed information about `configuration-json-data` is provided at [Configuration format description](./confformat.md)


### Upload a Lua script
The Lua script upload call is meant to upload and execute a new Electra One Lua script.

```
0xF0 0x00 0x21 0x45 0x01 0x7C script-source-code 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x01` Upload data
- `0x7C` Lua Script file
- `script-source-code` bytes representing a source code of the Electra One Lua script application
- `0xF7` SysEx closing byte

Detailed information about developing Lua script applications is provided at [Electra One Lua script](./lua.md) documentation.


## Controller events

### NAK
Not acknowledged. Informs the host that the last operation did not succeed.

```
0xF0 0x00 0x21 0x45 0x7E 0x00 0x00 0x00 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x7E` Controller event
- `0x00` NAK (not acknowledged)
- `0x00` reserved
- `0x00` reserved
- `0xF7` SysEx closing byte


### ACK
Acknowledged. Informs the host that the last operation was successfully completed.

```
0xF0 0x00 0x21 0x45 0x7E 0x01 0x00 0x00 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x7E` Controller event
- `0x01` ACK (acknowledged)
- `0x00` reserved
- `0x00` reserved
- `0xF7` SysEx closing byte


### Preset switch
Informs the host that the user changed the preset on the controller.

```
0xF0 0x00 0x21 0x45 0x7E 0x02 bank-number slot 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x7E` Controller event
- `0x02` Preset switch
- `bank-number` Current preset slot (0 .. 5)
- `slot` Current preset slot (0 .. 11)
- `0xF7` SysEx closing byte


### Snapshot change
Informs the host that the user made change regarding the snapshots. Upon receiving this event the host might want to query the snapshot list information.

```
0xF0 0x00 0x21 0x45 0x7E 0x03 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x7E` Controller event
- `0x03` Snapshot change
- `0xF7` SysEx closing byte


### Snapshot bank switch
Informs the host that the user changed current snapshot bank.

```
0xF0 0x00 0x21 0x45 0x7E 0x04 bank-number 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x7E` Controller event
- `0x04` Snapshot bank switch
- `bank-number` Snapshot bank (0 .. 11)
- `0xF7` SysEx closing byte


### Midi learn info
When Electra has the MIDI learn enabled it sends a MIDI message with description of MIDI messages received on user ports to.
```
0xF0 0x00 0x21 0x45 0x03 midilearn-json-data 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x03` Midi learn
- `midilearn-json-data` a JSON data that describe detected MIDI message
- `0xF7` SysEx closing byte

Detailed information about `midilearn-json-data` is provided at (to be done)

##### An example of midilearn-json-data
_non-SysEx_:
``` json
{
  "port": 0,
  "msg": "cc7",
  "channel": 2,
  "parameterId": 10,
  "value": 119
}
```

_SysEx_:
``` json
{
  "port": 0,
  "msg": "sysex",
  "data": [ 67, 32, 0 ]
}
```

### Log message
A log message is a text that is transmitted to the host computer in order to provide the user with information what is happening in the controller. The log messages are generated either by the firmware or user's Lua script.

```
0xF0 0x00 0x21 0x45 0x7F 0x00 log-message 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x7F` Upload data
- `0x00` Lua Script file
- `log-message` ASCII bytes representing the log message
- `0xF7` SysEx closing byte

The `log-message` is a text string that start with a number representing milliseconds from the start of the controller, followed by the space, and then the text of the message.

##### An example of log-message
```
147362 ElectraApp: preset successfully loaded
```


## Controller commands

### Midi learn enable / disable
A call to enable or disable the MIDI learn functionality on the controller. When enabled, the controller will send MIDI learn messages back to the host for all incoming MIDI messages.

```
0xF0 0x00 0x21 0x45 0x03 status 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x03` Midi Learn
- `status` request state of the MIDI learn functionality (see below)
- `0xF7` SysEx closing byte

`status`
- `0x00` disable the MIDI learn
- `0x01` enable the MIDI learn


### Snapshot update
A call to update snapshot attributes.

```
0xF0 0x00 0x21 0x45 0x04 0x06 bank-number slot snapshot-json-data 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x04` Update command
- `0x06` Snapshot
- `bank-number` an identifier of the snapshot bank (0 .. 11)
- `slot` an identifier of the snapshot slot (0 .. 35)
- `snapshot-json-data`
- `0xF7` SysEx closing byte

Detailed information about `snapshot-json-data` is provided at (to be done)

##### An example of the snapshot-json-data
``` json
{
  "name": "M1 piano",
  "color": "FFFFFF"
}
```


### Snapshot remove
A call to permanently remove a snapshot.

```
0xF0 0x00 0x21 0x45 0x05 0x06 bank-number slot 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x05` Remove command
- `0x06` Snapshot
- `bank-number` an identifier of the snapshot bank (0 .. 12)
- `slot` an identifier of the snapshot slot (0 .. 35)
- `0xF7` SysEx closing byte

### Snapshot swap
A call to swap snapshots in two snapshot slots. If one of the slots is empty, it becomes a simple move action.

```
0xF0 0x00 0x21 0x45 0x06 0x06 bank-number slot 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x06` Swap command
- `0x06` Snapshot
- `bank-number-1` an identifier of the snapshot bank (0 .. 12)
- `slot-1` an identifier of the snapshot slot (0 .. 35)
- `bank-number-2` an identifier of the snapshot bank (0 .. 12)
- `slot-2` an identifier of the snapshot slot (0 .. 35)
- `0xF7` SysEx closing byte


### Control update
A call to update the name, color, and visibility of the control. Currently, the change is made only at the run-time, it means it is lost when the Electra is powered off.

```
0xF0 0x00 0x21 0x45 0x04 0x07 control-id control-upadate-json-data 0xF7
```
- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x04` Update command
- `0x07` Control
- `control-id-lsb` a LSB of a controlId
- `control-id-msb` a LSB of a controlId
- `control-update-json-data`
- `0xF7` SysEx closing byte

The `controlId` is decomposed to LSB and MSB part as:

```
control-id-msb = controlId >> 7
control-id-lsb = controlId & 0x7F
```

The `control-update-json-data` may consist of three optional attributes `name`, `color`, and `visibility`. Upon receiving the control update command the fields will be set accordingly. It is possible send only attributes that need to be changed.

##### An example of the control-json-data
_change all attrinbutes_:
``` json
{
  "name": "Track 1",
  "color": "FFFFFF",
  "visible": true
}
```

_one attribute only_:
``` json
{
  "name": "Track 2"
}
```

### Switch to the firmware update mode
A system call that forces Electra to switch to the update mode. When in update mode Electra is ready to receive a firmware update.

```
0xF0 0x00 0x21 0x45 0x7F 0x7F 0xF7
```

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x7F` System call
- `0x7F` Switch to the update mode
- `0xF7` SysEx closing byte
