# Preset Lua extension

This document describes the Lua Extension of the Electra One MIDI Controller firmware. The extension adds procedural programming to the Electra One [Preset format](./presetformat.md). If you are looking for possibility to develop your own applications for Electra One, you might want to visit [Electra One Lua Script](./lua.md) document instead.

The Lua is a scripting programming language - a detailed information about it can be found at the [Official Lua site](http://www.lua.org/).

## A brief overview

The Electra One Preset Lua extension allows you to embed Lua function calls to the preset JSON. Current implementation to provide following hooks:

- Trigger Lua function calls on control value changes *
- Format display values *
- Change visibility, location, name, colour of controls *
- Run custom patch request calls *
- Implement your own sysex parsers *
- Implement your own checksum calculators *

\* not preset in current version of the API


## Uploading the scripts
In order to make a Lua script extension functions accessible from the preset, it needs to be uploaded first. It can be done with the Lua script upload SysEx call. The script is uploaded and assigned to currently active preset. If there already exists a Lua script for given preset, the upload SysEx call will overwrite it.


### SysEx Request
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


### The structure of the script
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

#### The setup
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


#### The standard functions
The standard functions are functions from the Lua standard libraries and the Electra One extension libraries. These functions cover vast range of functionality from printing, doing math, MIDI messaging to working with UI components.

A `print` function is a typical standard function.

``` lua
print ("Lua ext initialized")
```

The description of the standard functions is covered by the official [Lua documentation](http://www.lua.org/docs.html) and this document.


#### The standard callbacks
The Electra One Lua extension brings number of predefined event handlers - callbacks. They are called upon specific events and give you way to add your own functionality.


``` lua

```


#### The user functions
Of course, user can, and actually are encouraged to, package their functionality to Lua user functions that are used to build more complex programatic blocks.

A good example of a user function is a `displayGroup` callback from the above example source code.

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
The controls module provides functionality to manage preset controls.

::: warning
only the visibility methods are shown but the same pattern may be applied to all functionality related to Controls
:::

::: functiondesc
<b>control:setVisible (shouldBeVisible)</b>
<small>
Changes the visibility of given control.
</small>

<small>
<i>shouldBeVisible</i> - integer, desired state of the visibility (0..1)
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

function toggleControl (controlId)
    controls.setVisible (controlId, not controls.isVisible (controlId))
end
end
```


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
<b>formatter (value)</b>
<small>
A user function to transform the input display value to a text string that is displayed on the LCD.
</small>

<small>
<i>value</i> - integer, a display value as defined by the preset JSON<br />
<br />
<i>returns</i> - string, transformed version of the input display value<br />
</small>
:::

#### Example script
``` lua
-- add percentage to the value
function format2 (value)
  return (value .. "%")
end

-- display value with fractions
function format (value)
  return (value / 10)
end
```

### Value function callbacks
Value function callbacks are user functions allowing running complex user actions whenever control value is changed.

::: functiondesc
<b>functionCallback (controlId, value)</b>
<small>
A user function to run custom Lua extension function.
</small>

<small>
<i>controlId</i> - integer, a numeric identifier of the control (1..432)<br />
<i>value</i> - integer, a display value as defined by the preset JSON<br />
</small>
:::

#### Example script
``` lua
function functionCallback (controlId, value)
  if (value >= 0) then
    print ("hide")
    controls.setVisible (2, false)
  else
    print ("show")
    controls.setVisible (2, true)
  end
end
```

### SysEx handling
Functions to handle incoming SysEx messages.

::: functiondesc
<b>requestPatch (device)</b>
<small>
A callback to send a patch request to a particular device. The function is called upon the `[PATCH REQUEST]` button has been pressed and it is sent to all device that have a patch request defined in their `patch` definition.
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
