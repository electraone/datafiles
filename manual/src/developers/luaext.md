# Preset Lua extension

This document describes the Lua Extension of the Electra One MIDI Controller firmware. The extension adds procedural programming to the Electra One [Preset format](./presetformat.md). If you are looking for possibility to develop your own applications for Electra One, you might want to visit [Electra One Lua Script](./lua.md) document instead.

The Lua is a scripting programming language - a detailed information about it can be found at the [Official Lua site](http://www.lua.org/).

::: warning Note
Firmware version 1.5.12 or later is required to use the Electra One Lua Extension.
:::

## A brief overview

The Electra One Preset Lua extension allows you to embed Lua function calls to the preset JSON. Current implementation to provide following hooks:

- Trigger Lua function calls on control value changes
- Format display values
- Change visibility, location, name, colour of controls
- Run custom patch request calls
- Implement your own sysex parsers
- Implement your own checksum calculators *

\* not preset in current version of the API

The main idea here is to have a healthy split between the static data that is defined in the declarative JSON and the dynamic processing of this data in the run-time with the Lua script. The JSON preset is used to pre-load all pages, lists, devices, controls. Once, the preset is loaded, the Lua Extension may be used to modify it to suit the particular needs. This is enforced by the fact that the Lua Extension API cannot create new objects. It can, however, modify, move, and change visibility of existing objects.


## Examples
Examples of presets with the Lua Extensions are available at [Github Electra.One repository](https://github.com/martinpavlas/electra.one/tree/master/lua)


## SysEx Implementation

### Uploading the scripts
In order to make a Lua script extension functions accessible from the preset, it needs to be uploaded first. It can be done with the Lua script upload SysEx call. The script is uploaded and assigned to currently active preset. If there already exists a Lua script for given preset, the upload SysEx call will overwrite it.

This effectively means that one preset may have one Lua script assigned. From this perspective a new can now been seen as a combo of the JSON preset .epr file and the Lua script .lua file.

#### SysEx Request
```
0xF0 0x00 0x21 0x45 0x01 0x0C script-source-code 0xF7
```

- 0xF0 SysEx header byte
- 0x00 0x21 0x45 Electra One MIDI manufacturer Id
- 0x01 Upload data
- 0x0C Lua script file
- `script-source-code` bytes representing ASCII characters of the Lua script
  source code
- 0xF7 SysEx closing byte


### Executing a Lua command
A call to run an arbitrary Lua command. This can be seen as an API endpoint for
managing Electra One preset from external devices and applications.

#### SysEx Request
```
0xF0 0x00 0x21 0x45 0x08 0x0D lua-command-text 0xF7
```
<syxDownloadLink href="/sysex/update-control.syx" description="download .syx"/>

- `0xF0` SysEx header byte
- `0x00` `0x21` `0x45` Electra One MIDI manufacturer Id
- `0x08` Execute command
- `0x0D` Lua command
- `lua-command-text` ASCII bytes representing the log message
- `0xF7` SysEx closing byte

The `lua-command-text` is free form sting containing Lua command to be executed. The maximum length is limited to 128 characters. It is recommended to call predefined functions.

##### An example of the lua-command-text
``` lua
hideControl (1)
```

or

``` lua
print ("Hello MIDI world!")
```



## The structure of the script
The Electra One Lua script may consist of four different building blocks:
  - the setup section
  - the standard functions
  - the standard callbacks
  - the user functions

Let's use following example to demonstrate it:

``` lua
-- Display controls related to specific value of another control

-- a function to hide all controls within the groups
function hideAllGroups (groups)
    for groupId = 0, #groups do
        for i, controlId in ipairs (groups[groupId]) do
            control = controls.get (controlId)
            control:setVisible (false)
        end
    end
end

-- show given control group
function showGroup (groups, groupId)
    for i, controlId in ipairs (groups[groupId]) do
        control = controls.get (controlId)
        control:setSlot (i + 1)
    end
end

-- the callback function called from the preset
function displayGroup (controlId, value)
    hideAllGroups (controlGroups)
    showGroup (controlGroups, value)
end

-- a standard callback function to handle PATCH REQUEST event
function requestPatch (device)
  print ("Requesting patches from device " .. device.id);
  midi.sendProgramChange (PORT_1, device.channel, 10)
end


-- set the initial state. group 0 is displayed

-- define assignment of controls to groups
controlGroups = {
    [0] = { 20, 21, 22 },
    [1] = { 26, 27, 28 },
    [2] = { 32, 33 }
}

showGroup (controlGroups, 0)

print ("Lua ext initialized")
```

### The setup
The setup part is all source code that is not part of any function, it means it resides in the global context of the script. The setup part may call any standard functions, user functions, initialize global variables, and so on. The setup part in the above script is:

``` lua
-- set the initial state. group 0 is displayed

-- define assignment of controls to groups
controlGroups = {
    [0] = { 20, 21, 22 },
    [1] = { 26, 27, 28 },
    [2] = { 32, 33 }
}

showGroup (controlGroups, 0)

print ("Lua ext initialized")
```

The primary purpose of the setup is to prepare your extension for handling the application events at the later stage. The setup is executed immediately after the preset is loaded. It does not matter where the setup part is located in the script, it is not required to be at the top. If you intend to use your own user functions in the setup, you will need to place the setup part below the definition of the user functions.


### The standard functions
The standard functions are functions from the Lua standard libraries and the Electra One extension libraries. These functions cover vast range of functionality from printing, doing math, MIDI messaging to working with UI components.

A `print` function is a typical standard function.

``` lua
print ("Lua ext initialized")
```

The description of the standard functions is covered by the official [Lua documentation](http://www.lua.org/docs.html) and this document.


### The standard callbacks
The Electra One Lua extension brings number of predefined event handlers - callbacks. They are called upon specific events and give you way to add your own functionality.


``` lua
-- a standard callback function to handle PATCH REQUEST event
function requestPatch (device)
  print ("Requesting patches from device " .. device.id);
  midi.sendProgramChange (PORT_1, device.channel, 10)
end
```


### The user functions
Of course, user can, and actually are encouraged to, package their functionality to Lua user functions that are used to build more complex programatic blocks.

A good example of a user function is a `displayGroup` callback from the above example source code. It a function defined by the user and bound to a function callback hook in the preset JSON.

``` lua
-- the callback function called from the preset
function displayGroup (controlId, value)
    hideAllGroups (controlGroups)
    showGroup (controlGroups, value)
end
```


## Electra One Lua extension API

### Logger
The logging is a key element to understanding what is happening inside the controller. Electra One Lua API provides the `print ()` command that writes texts that can be observed in the ElectraOne Console application.

The log messages are, in fact, SysEx messages sent to the CTRL port. They carry the timestamp and the text of the message. For more details about the console logs, please review the [Electra's MIDI implementation](./developers/midiimplementation.md)

As the logging relies on the standard SysEx messaging, users can develop their own log viewers or integrate Electra logs to their own applications.

#### Functions
::: functiondesc
<b>print (text)</b>
<small>
A function to print text to the ElectraOne Console log view.
</small>

<small>
<i>text</i> - string, a text message to be displayed in the console log
</small>
:::


#### Example script
``` lua
-- Printing to the console log

print ("This message will be shown in the ElectraOne console")

for i = 1, 10 do
    print ("message #" .. i)
end

```

### Controls
The controls module provides functionality to manage preset controls. It is not meant to change properties of individual controls, instead it

#### Functions
::: functiondesc
<b>controls.get (controlId)</b>
<small>
Retrieves a reference to a control object (userdata).
</small>

<small>
<i>controlId</i> - integer, a numeric identifier of the control. <i>id</i> attribute from the preset.<br />
<i>returns</i> - userdata, a reference to a control object
</small>
:::

#### Example script
``` lua
-- Retrieving a reference to given control

local control = controls.get (1)

```

### Control
A representation of a Control object. It holds the data and functions to modify itself.

#### Functions
::: functiondesc
<b>control:getId ()</b>
<small>
Retrieves the identifier of the Control. The identifier is assigned to the control
in the preset JSON.
</small>

<small>
<i>returns</i> - integer, identifier of the control (1 .. 432)
</small>
:::

``` lua
-- Retrieving a control and getting its Id

local volumeControl = controls.get (10)
print ("got Control with Id " .. volumeControl:getId ())
```


::: functiondesc
<b>control:setVisible (shouldBeVisible)</b>
<small>
Changes the visibility of given control.
</small>

<small>
<i>shouldBeVisible</i> - boolean, desired state of the visibility
</small>
:::

::: functiondesc
<b>control:isVisible ()</b>
<small>
Gets status of given control's visibility.
</small>

<small>
<i>returns</i> - boolean, true when the control is visible
</small>
:::

Example script
``` lua
-- a function to toggle visibility of a control

function toggleControl (control)
    control:setVisible (not control:isVisible ())
end
```


::: functiondesc
<b>control:setName (name)</b>
<small>
Sets a new name of the control.
</small>

<small>
<i>name</i> - string, a new name to be assigned to the control
</small>
:::

::: functiondesc
<b>control:getName ()</b>
<small>
Retrieves current name of the control.
</small>

<small>
<i>returns</i> - string, current name of the control
</small>
:::

Example script
``` lua
-- print out a name of given control

function printName (controlId)
    local control = controls.get (controlId)
    print ("Name: " .. control:getName ())
end
```


::: functiondesc
<b>control:setColor (color)</b>
<small>
Sets a new color of the control. Currently, only the predefined six Electra colors are available.
</small>

<small>
<i>name</i> - integer, a new color to be used (0 .. 5)
</small>
:::

::: functiondesc
<b>control:getColor ()</b>
<small>
Retrieves current name of the control.
</small>

<small>
<i>returns</i> - integer, current color of the control (0 .. 5)
</small>
:::

`WHITE`, `RED`, `ORANGE`, `BLUE`, `GREEN`, `PINK` variables are available to specify the desired color.

Example script
``` lua
-- A callback function that changes color of the control
-- when its value exceeds 100

function functionCallback (control, value)
    if (value > 100) then
        control:setColor (RED)
    end
end
```


::: functiondesc
<b>control:setBounds ({ x, y, width, height })</b>
<small>
Changes position and dimensions (bounds) of the control. The `helpers` library provides
functions to convert bounds to preset `slots`.
</small>

<small>
<i>bounds</i> - array, a array consisting of x, y, width, height boundary box attributes
</small>
:::

::: functiondesc
<b>control:getBounds ()</b>
<small>
Retrieves current position and dimensions (bounds) of the control.
</small>

<small>
<i>returns</i> - array, an array consisting of x, y, width, height boundary box attributes
</small>
:::

`X`, `Y`, `WIDTH`, `HEIGHT` variables are available to access the bounding box attributes

Example script
``` lua
-- print out position and dimensions of given control

control = controls.get (2)
control:setBounds ({ 200, 200, 170, 65 })
bounds = control:getBounds ()
print ("current bounds: " ..
    "x=" .. bounds[X] ..
    ", y=" .. bounds[Y] ..
    ", width=" .. bounds[WIDTH] ..
    ", height=" .. bounds[HEIGHT])
```


::: functiondesc
<b>control:setPot (controlSet, pot)</b>
<small>
Assigns the control to given pot and controlSet.
</small>

<small>
<i>controlSet</i> - integer, a numeric identifier of the control set (1 .. 3)
<i>pot</i> - integer, a numeric identifier of the pot (1 .. 12)
</small>
:::

`CONTROL_SET_1` .. `CONTROL_SET_3` variables are available to specify the desired control section.
`POT_1` .. `POT_12` variables are available to specify the desired pot.

#### Example script
``` lua
-- A reassign to the control to different section and pot

control = controls.get (1)
control:setPot (CONTROL_SET_1, POT_2)
```


::: functiondesc
<b>control:setSlot (slot)</b>
<small>
Moves given control to a preset slot on current page. The control set and pot are
are assigned accordingly and the control is made visible.
</small>

<small>
<i>slot</i> - integer, a numeric identifier of the preset slot (1 .. 36)
</small>
:::

#### Example script
``` lua
-- A reassign to the control to different section and pot

control = controls.get (1)
control:setSlot (7)
```



### Pages
Work needs to be done here...



### Groups
Work needs to be done here...



### Devices
Work needs to be done here...



### Parameter Map
The Parameter map is the heart of the Electra Controller firmware. It is used to store and retrieve information about all parameter values across all connected devices. Whenever a MIDI message is received, pot turned, or a value change made with the touch, the information about the change is routed to the Parameter map and the map, in turn, updates all relevant components and sends MIDI messages out.

#### Functions
::: functiondesc
<b>parameterMap.resetAll ()</b>
<small>
Resets all parameters of all devices to zero.
</small>
:::

::: functiondesc
<b>parameterMap.resetDevice (deviceId)</b>
<small>
Resets all parameters of given device to zero.
</small>

<small>
<i>deviceId</i> - integer, a numeric identifier of the device (1..32)
</small>
:::

::: functiondesc
<b>parameterMap.set (deviceId, parameterType, parameterNumber, midiValue)</b>
<small>
Sets a midiValue of particular Electra parameter within the parameter map.
</small>

<small>
<i>deviceId</i> - integer, a numeric identifier of the device (1 .. 32)<br />
<i>parameterType</i> - integer, a numeric identifier of Electra's parameter type (0 .. 11)<br />
<i>ParameterNumber</i> - integer, a numeric identifier of the parameter (0 .. 16383)<br />
<i>midiValue</i> - integer, a MIDI value (0 .. 16383)<br />
</small>
:::

::: functiondesc
<b>parameterMap.apply (deviceId, parameterType, parameterNumber, midiValueFragment)</b>
<small>
Apply partial value to current value of particular Electra parameter within the
parameter map. The `midiValueFragment` is ORed to the parameter value.
</small>

<small>
<i>deviceId</i> - integer, a numeric identifier of the device (1 .. 32)<br />
<i>parameterType</i> - integer, a numeric identifier of Electra's parameter type (0 .. 11)<br />
<i>ParameterNumber</i> - integer, a numeric identifier of the parameter (0 .. 16383)<br />
<i>midiValueFragment</i> - integer, a MIDI value frangement to be applied (0 .. 16383)<br />
</small>
:::

::: functiondesc
<b>parameterMap.get (deviceId, parameterType, parameterNumber)</b>
<small>
Sets a midiValue of particular Electra parameter within the parameter map.
</small>

<small>
<i>deviceId</i> - integer, a numeric identifier of the device (1 .. 32)<br />
<i>parameterType</i> - integer, a numeric identifier of Electra's parameter type (0 .. 11)<br />
<i>ParameterNumber</i> - integer, a numeric identifier of the parameter (0 .. 16383)<br />
<br />
<i>returns</i> - integer, a MIDI value of given parameter (0 .. 16383)<br />
</small>
:::

#### Example script
``` lua
-- set the value of a parameter when processing the patch response SysEx message

function parseResponse (device, responseId, data)
  parameterMap.set (device.id, PT_CC7, 2, sysexBlock.peek (data, 8))
end
```


### Value formatters
Value formatters are user functions used for formatting the display value of controls. It is a function that takes a display value as an input and computes a value that will be displayed. The formatted value is returned in the form of a string, therefore, given the user a vast range of formatting possibilities.

::: functiondesc
<b>formatter (control, value)</b>
<small>
A user function to transform the input display value to a text string that is displayed on the LCD.
</small>

<small>
<i>control</i> - userdata, a reference to a control object<br />
<i>value</i> - integer, a display value as defined by the preset JSON<br />
<br />
<i>returns</i> - string, transformed version of the input display value<br />
</small>
:::

#### Example script
``` lua
-- add percentage to the value
function addPercentage (control, value)
  return (value .. "%")
end

-- display value with fractions
function useFractions (control, value)
  return (value / 10)
end
```


### Value function callbacks
Value function callbacks are user functions allowing running complex user actions whenever control value is changed.

::: functiondesc
<b>functionCallback (control, value)</b>
<small>
A user function to run custom Lua extension function.
</small>

<small>
<i>control</i> - userdata, a reference to a control object<br />
<i>value</i> - integer, a display value as defined by the preset JSON<br />
</small>
:::

#### Example script
``` lua
function functionCallback (control, value)
  if (value >= 0) then
    print ("hide")
    control:setVisible (false)
  else
    print ("show")
    control:setVisible (true)
  end
end
```


### SysEx handling
Functions to handle incoming SysEx messages.

::: functiondesc
<b>requestPatch (device)</b>
<small>
A callback to send a patch request to a particular device. The function is called upon the
`[PATCH REQUEST]` button has been pressed and it is sent to all device that have a patch
request defined in their `patch` definition.
</small>

<small>
<i>device</i> - data table, a device description data structure (see below)<br />
</small>
:::

::: functiondesc
<b>parseResponse (device, responseId, sysexBlock)</b>
<small>
A callback to handle incoming SysEx message that matched the Patch response definition.
</small>

<small>
<i>device</i> - data table, a device description data structure (see below)<br />
<i>responseId</i> - integer, a numeric identifier of the matching Patch response (1 .. 127)<br />
<i>sysexBlock</i> - light userdata, an object holding the received SysEx message (see below)<br />
</small>
:::

#### Device data table
``` lua
device = {
  id = 1,                 -- a device Id
  port = 0                -- a numeric port identifier
  channel = 1,            -- a channel number
}
```

#### Example script
``` lua
function requestPatch (device)
  print ("Requesting patches from device " .. device.id);
  midi.sendProgramChange (PORT_1, device.channel, 10)
end

function parseResponse (device, responseId, data)

  -- print the header information
  print ("device id = " .. device.id)
  print ("device channel = " .. device.channel)
  print ("device port = " .. device.port)
  print ("responseId = " .. responseId)
  print ("manufacturer Id = " .. sysexBlock.getManufacturerSysexId (data))

  -- print the received data
  for i = 1, sysexBlock.getLength (data) do
    print ("data[" .. i .. "] = " .. sysexBlock.peek (data, i))
  end
end
```

### Timer
The timer library provides functionality to run perpetual task. The timer calls `timer.onTick ()` function at given time periods or BPM. The timer makes it possible to implement MIDI clocks, LFOs, and many other repetitive processes. The timer is disabled by default and the initial rate is 120 BMP.

::: functiondesc
<b>timer.enable ()</b>
<small>
Enable the timer. Once the timer is enabled, the `timer.onTick ()` is run at given time periods.
</small>
:::

::: functiondesc
<b>timer.disable ()</b>
<small>
Disable the timer. The period of the timer is kept.
</small>
:::

::: functiondesc
<b>timer.isEnabled ()</b>
<small>
Get the status of the timer.
</small>

<small>
<i>returns</i> - boolean, `true` when the timer is enabled<br />
</small>
:::

::: functiondesc
<b>timer.setPeriod ()</b>
<small>
Set the period to run the timer ticks.
</small>

<small>
<i>period</i> - integer, period specified in milliseconds (10..60000)<br />
</small>
:::

::: functiondesc
<b>timer.getPeriod ()</b>
<small>
Get the period of the timer ticks.
</small>

<small>
<i>returns</i> - integer, period specified in milliseconds<br />
</small>
:::

::: functiondesc
<b>timer.setBpm ()</b>
<small>
Set the BPM of running the timer ticks.
</small>

<small>
<i>period</i> - integer, period specified in BPM (1..6000)<br />
</small>
:::

::: functiondesc
<b>timer.getBpm ()</b>
<small>
Get the BPM of the timer ticks.
</small>

<small>
<i>returns</i> - integer, period specified in BPM<br />
</small>
:::

::: functiondesc
<b>timer.onTick ()</b>
<small>
A user function that will be run at the start of every timer cycle.
</small>
:::

``` lua
-- A simple MIDI clock implemented with the timer

function midi.onStart (midiInput)
  timer.enable ()
  print ("timer BPM = " .. timer.getPeriod ())
end

function midi.onStop (midiInput)
  timer.disable ()
end

function midi.onContinue (midiInput)
  if (timer.isEnabled ()) then
    timer.disable ()
  else
    timer.enable ()
  end
end

function timer.onTick ()
  midi.sendClock (PORT_1)
end
```

### Transport
The transport library is similar to the timer. The main difference is that the tick signal is not generated by the library itself but requires MIDI real-time system and clock messages. The transport makes it possible to implement repetitive processes that are synced to the external MIDI clock. The transport is disabled by default.

::: functiondesc
<b>transport.enable ()</b>
<small>
Enable the transport. Once the timer is enabled, the transport callback user functions
will be called when related MIDI messages are received.
</small>
:::

::: functiondesc
<b>timer.disable ()</b>
<small>
Disable the transport. Keep the transport disabled when you do not use it. You will save
processing resources.
</small>
:::

::: functiondesc
<b>transport.isEnabled ()</b>
<small>
Get the status of the transport.
</small>

<small>
<i>returns</i> - boolean, `true` when the transport is enabled<br />
</small>
:::

::: functiondesc
<b>transport.onClock (midiInput)</b>
<small>
A callback to handle incoming MIDI Clock message. There are 24 Clock messages
to one quarter note.
</small>

<small>
<i>midiInput</i> - data table, information about where the message came from<br />
</small>
:::

::: functiondesc
<b>transport.onStart (midiInput)</b>
<small>
A callback to handle incoming MIDI System real-time Start message.
</small>

<small>
<i>midiInput</i> - data table, information about where the message came from<br />
</small>
:::

::: functiondesc
<b>transport.onStop (midiInput)</b>
<small>
A callback to handle incoming MIDI System real-time Stop message.
</small>

<small>
<i>midiInput</i> - data table, information about where the message came from<br />
</small>
:::

::: functiondesc
<b>transport.onContinue (midiInput)</b>
<small>
A callback to handle incoming MIDI System real-time Continue message.
</small>

<small>
<i>midiInput</i> - data table, information about where the message came from<br />
</small>
:::

::: functiondesc
<b>transport.onSongSelect (midiInput, songNumber)</b>
<small>
A callback to handle incoming MIDI Song Select message.
</small>

<small>
<i>midiInput</i> - data table, information about where the message came from<br />
<i>songNumber</i> - integer, a numeric identifier of the song (0 .. 127)<br />
</small>
:::

::: functiondesc
<b>transport.onSongPosition (midiInput, position)</b>
<small>
A callback to handle incoming MIDI Song Position message.
</small>

<small>
<i>midiInput</i> - data table, information about where the message came from<br />
<i>position</i> - integer, a number of beats from the start of the song (0 .. 16383)<br />
</small>
:::

#### Example script
``` lua
faderValue = 0

function setup ()  
  if (not transport.isEnabled ()) then
    transport.enable ()
  end

  print ("Transport enabled: " .. (transport.isEnabled () and "yes"  or "no"))
end

function transport.onClock (midiInput)
  parameterMap.set (1, PT_CC7, 2, faderValue)
  faderValue = faderValue + 1

  if (faderValue > 127) then
    faderValue = 0
  end
end

function transport.onStart (midiInput)
  print ("Start")
end

function transport.onStop (midiInput)
  print ("Stop")
end

function transport.onContinue (midiInput)
  print ("Continue")
end

function transport.onSongPosition (midiInput, position)
  print ("Song position " .. position)
end

function transport.onSongSelect (midiInput, songNumber)
  print ("Song select " .. songNumber)
end
```



### MIDI
The MIDI library provides functions to send raw MIDI messages. There are two ways of sending MIDI messages out. It can be done either by composing a `midiMessage` data table and passing it to generic `midi.sendMessage ()` function, or by calling functions that send specific types of the MIDI messages, eg. `midi.sendNoteOn ()`.

All functions send MIDI messages to all Electra's interfaces (`USB Dev`, `USB host`, `MIDI IO`). The idea is that this will follow the configuration of the low-level router of the Electra One controller. This might change in near future.


::: functiondesc
<b>midi.sendMessage (port, midiMessage)</b>
<small>
A function to send a MIDI message defined as a `midiMessage` data table.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>midiMessage</i> - data table, an outgoing MIDI message<br />
</small>
:::

::: functiondesc
<b>midi.sendNoteOn (port, channel, noteNumber, velocity)</b>
<small>
A function to send a Note On MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>noteNumber</i> - integer, an identifier of the MIDI note (0 .. 127)<br />
<i>velocity</i> - integer, a velocity (0 .. 127)<br />
</small>
:::

::: functiondesc
<b>midi.sendNoteOff (port, channel, noteNumber, velocity)</b>
<small>
A function to send a Note Off MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>noteNumber</i> - integer, an identifier of the MIDI note (0 .. 127)<br />
<i>velocity</i> - integer, a velocity (0 .. 127)<br />
</small>
:::

::: functiondesc
<b>midi.sendControlChange (port, channel, parameterNumber, value)</b>
<small>
A function to send a Control Change MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>controllerNumber</i> - integer, an identifier of the Control Change (0 .. 127)<br />
<i>value</i> - integer, a value to be sent (0 .. 127)<br />
</small>
:::

::: functiondesc
<b>midi.sendAfterTouchPoly (port, channel, noteNumber, pressure)</b>
<small>
A function to send a Polyphonic Aftertouch MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>noteNumber</i> - integer, an identifier of the MIDI note (0 .. 127)<br />
<i>pressure</i> - integer, a value representing the pressure applied (0 .. 127)<br />
</small>
:::

::: functiondesc
<b>midi.sendAfterTouchChannel (port, channel, pressure)</b>
<small>
A function to send a Channel Aftertouch MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>pressure</i> - integer, a value representing the pressure applied (0 .. 127)<br />
</small>
:::

::: functiondesc
<b>midi.sendProgramChange (port, channel, programNumber)</b>
<small>
A function to send a Program Change MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>programNumber</i> - integer, an identifier of the CC (0 .. 127)<br />
<i>pressure</i> - integer, a value to be sent (0 .. 127)<br />
</small>
:::

::: functiondesc
<b>midi.sendPitchBend (port, channel, value)</b>
<small>
A function to send a Pitch Bend MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>value</i> - integer, an amount of Pitch Bend to be applied (0 .. 16383)<br />
</small>
:::

::: functiondesc
<b>midi.sendSongSelect (port, songNumber)</b>
<small>
A function to send a Song Select MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>songNumber</i> - integer, a numeric identifier of the song (0 .. 127)<br />
</small>
:::

::: functiondesc
<b>midi.sendSongPosition (port, position)</b>
<small>
A function to send a Song Position MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>songNumber</i> - integer, a number of beats from start of the song (0 .. 16383)<br />
</small>
:::

::: functiondesc
<b>midi.sendClock (port)</b>
<small>
A function to send a System real-time Clock MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
</small>
:::

::: functiondesc
<b>midi.sendStart (port)</b>
<small>
A function to send a System real-time Start MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
</small>
:::

::: functiondesc
<b>midi.sendStop (port)</b>
<small>
A function to send a System real-time Stop MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
</small>
:::

::: functiondesc
<b>midi.sendContinue (port)</b>
<small>
A function to send a System real-time Continue MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
</small>
:::

::: functiondesc
<b>midi.sendActiveSensing (port)</b>
<small>
A function to send a Active Sensing MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
</small>
:::

::: functiondesc
<b>midi.sendSystemReset (port)</b>
<small>
A function to send a System Reset MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
</small>
:::

::: functiondesc
<b>midi.sendTuneRequest (port)</b>
<small>
A function to send a Tune Request MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
</small>
:::

::: functiondesc
<b>midi.sendSysex (port, data)</b>
<small>
A function to send a Sysex MIDI message. Currently limited to 256 bytes.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>data</i> - array, an array with sequence of bytes to be sent. Do not enter F0 and F7 bytes.
</small>
:::

::: functiondesc
<b>midi.sendNrpn (port, channel, parameterNumber, value)</b>
<small>
A function to send a NRPN MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>parameterNumber</i> - integer, an identifier of the NRPN (0 .. 16383)<br />
<i>value</i> - integer, a value to be sent (0 .. 16383)<br />
<i>lsbFirst</i> - boolean, when true, the lsb and msb bytes will be swapped<br />
</small>
:::

::: functiondesc
<b>midi.sendRpn (port, channel, parameterNumber, value)</b>
<small>
A function to send a RPN MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>parameterNumber</i> - integer, an identifier of the RPN (0 .. 16383)<br />
<i>value</i> - integer, a value to be sent (0 .. 16383)<br />
<i>lsbFirst</i> - boolean, when true, the lsb and msb bytes will be swapped<br />
</small>
:::

::: functiondesc
<b>midi.sendControlChange14 (port, channel, parameterNumber, value)</b>
<small>
A function to send a Control Change 14bit MIDI message.
</small>

<small>
<i>port</i> - integer, a port identifier (`PORT_1`, `PORT_2`, `PORT_CTRL`))<br />
<i>channel</i> - integer, a numeric representation of the MIDI channel (1 .. 16)<br />
<i>controllerNumber</i> - integer, an identifier of the NRPN (0 .. 31)<br />
<i>value</i> - integer, a value to be sent (0 .. 16383)<br />
<i>lsbFirst</i> - boolean, when true, the lsb and msb bytes will be swapped<br />
</small>
:::


#### Example script
``` lua
-- Sending MIDI messages using the sendMessage ()


-- Control Change
midiMessage = {
   channel = 1,
   type = CONTROL_CHANGE,
   controllerNumber = 1,
   value = 127
}
midi.sendMessage (PORT_1, midiMessage)


-- Note On
midiMessage = {
   channel = 1,
   type = NOTE_ON,
   noteNumber = 60,
   velocity = 100
}
midi.sendMessage (PORT_1, midiMessage)


-- Note Off
midiMessage = {
   channel = 1,
   type = NOTE_OFF,
   noteNumber = 60,
   velocity = 100
}
midi.sendMessage (PORT_1, midiMessage)


-- Program Change
midiMessage = {
   channel = 1,
   type = PROGRAM_CHANGE,
   programNumber = 10
}
midi.sendMessage (PORT_1, midiMessage)


-- Pitch Bend
midiMessage = {
   channel = 1,
   type = PITCH_BEND,
   value = 513
}
midi.sendMessage (PORT_1, midiMessage)


-- Poly Pressure
midiMessage = {
   channel = 1,
   type = POLY_PRESSURE,
   noteNumber = 60,
   pressure = 100
}
midi.sendMessage (PORT_1, midiMessage)


-- Channel Pressure
midiMessage = {
   channel = 1,
   type = CHANNEL_PRESSURE,
   pressure = 64
}
midi.sendMessage (PORT_1, midiMessage)


-- Clock
midiMessage = {
   type = CLOCK
}
midi.sendMessage (PORT_1, midiMessage)


-- Start
midiMessage = {
   type = START
}
midi.sendMessage (PORT_1, midiMessage)


-- Stop
midiMessage = {
   type = STOP
}
midi.sendMessage (PORT_1, midiMessage)


-- Continue
midiMessage = {
   type = CONTINUE
}
midi.sendMessage (PORT_1, midiMessage)


-- Active Sensing
midiMessage = {
   type = ACTIVE_SENSING
}
midi.sendMessage (PORT_1, midiMessage)


-- System Reset
midiMessage = {
   type = RESET
}
midi.sendMessage (PORT_1, midiMessage)


-- Song Select
local ss = {
   type = SONG_SELECT,
   songNumber = 20
}
midi.sendMessage (PORT_1, ss)


-- Song Position
midiMessage = {
   type = SONG_POSITION,
   position = 10
}
midi.sendMessage (PORT_1, midiMessage)


-- Tune Request
midiMessage = {
   type = TUNE_REQUEST
}
midi.sendMessage (PORT_1, midiMessage)
```


#### Example script
``` lua
-- Sending MIDI messages out

print ("Sending MIDI out demo loaded")


-- Control change
midi.sendControlChange (PORT_1, 1, 10, 64)

-- Notes
midi.sendNoteOn (PORT_1, 1, 60, 100)
midi.sendNoteOff (PORT_1, 1, 60, 100)

-- Program change
midi.sendProgramChange (PORT_1, 1, 10)

-- Pitch bend
midi.sendPitchBend (PORT_1, 1, 513)

-- Polyphonic aftertouch
midi.sendAfterTouchPoly (PORT_1, 1, 60, 100)

-- Channel aftertouch
midi.sendAfterTouchChannel (PORT_1, 1, 100)

-- Send NRPN
midi.sendNrpn (PORT_1, 1, 512, 8192)

-- Send RPN
midi.sendRpn (PORT_1, 1, 1, 4096)

-- Send Control change 14bit
midi.sendControlChange14Bit (PORT_1, 1, 1, 2048)

-- Clock
midi.sendClock (PORT_1)

-- Start
midi.sendStart (PORT_1)

-- Stop
midi.sendStop (PORT_1)

-- Continue
midi.sendContinue (PORT_1)

-- Active sensing
midi.sendActiveSensing (PORT_1)

-- System reset
midi.sendSystemReset (PORT_1)

-- Song select
midi.sendSongSelect (PORT_1, 1)

-- Song position
midi.sendSongPosition (PORT_1, 200)

-- Tune request
midi.sendTuneRequest (PORT_1)

-- SysEx
midi.sendSysex (PORT_1, { 67, 32, 0 })
```



### Helpers
The helpers library consists of helper functions to make handling of certain common
situations easier.

#### Functions
::: functiondesc
<b>slotToBounds (slot)</b>
<small>
Converts a preset slot to a boundary box data table.
</small>

<small>
<i>slot</i> - integer, a numeric identifier of the preset slot (1 .. 36)
<br />
<i>returns</i> - array, an array consisting of x, y, width, height boundary box attributes
</small>
:::

::: functiondesc
<b>boundsToSlot (bounds)</b>
<small>
Converts a bounding box (bounds) to slot.
</small>

<small>
<i>bounds</i> - array, an array consisting of x, y, width, height boundary box attributes
<br />
<i>returns</i> - integer, a numeric identifier of the preset slot (1 .. 36)
</small>
:::


#### Example script
``` lua
-- Move control to given slot

control = controls.get (1)
control:setBounds (helpers.slotToBounds (6))
```
