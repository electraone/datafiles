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
-- Lua script structure example

-- the Setup
clockCounter = 0
beatEnabled = 0


-- User functions
function myPrint (text)
    print ("my Lua: " .. text)
end
```

#### The setup
The setup part is all source code that is not part of any function, it means it resides in the global context of the script. The setup part may call any standard functions, user functions, initialize global variables, and so on. The setup part in the above script is:

``` lua
-- the Setup
clockCounter = 0
beatEnabled = 0
```

The primary purpose of the setup is to prepare your extension for handling the application events at the later stage. The setup is executed immediately after the preset is loaded. It does not matter where the setup part is located in the script, it is not required to be at the top. If you intend to use your own user functions in the setup, you will need to place the setup part below the definition of the user functions.


#### The standard functions
The standard functions are functions from the Lua standard libraries and the Electra One extension libraries. These functions cover vast range of functionality from printing, doing math, MIDI messaging to working with UI components.

If you observe the above example source code carefully, you will spot two standard functions there.

``` lua
-- print text to the ElectraOne Console application
print ("my Lua: " .. text)

-- run modulo function from the math library
if math.mod (clockCounter, 24) == 0 then
```

The description of the standard functions is covered by the official [Lua documentation](http://www.lua.org/docs.html) and this document.


#### The standard callbacks
The Electra One Lua extension brings number of predefined event handlers - callbacks. They are called upon specific events and give you way to add your own functionality.


``` lua

```


#### The user functions
Of course, user can, and actually are encouraged to, package their functionality to Lua user functions that are used to build more complex programatic blocks.

To demonstrate the user functions we added a `myPrint ()` function to the example.

``` lua
-- User functions
function myPrint (text)
    print ("my Lua: " .. text)
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


### Parameter Map
The Parameter map is the heart of the Electra Controller firmware. It is used to store and retrieve information about all parameter values across all connected devices. Whenever a MIDI message is received, pot turned, or a value change made with the touch, the information about the change is routed to the Parameter map and the map, in turn, updates all relevant components and sends MIDI messages out.

There are a number functions work with the parameterMap.

#### Functions
::: functiondesc
<b>parameterMap.reset ()</b>
<small>
Resets all parameters to zero. (_should this be rather the default values?_)
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

```

### Application hooks
There is number of places where the controller firmware triggers a action that

There are a number functions work with the parameterMap.

#### Functions
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

::: functiondesc
<b>requestPatch (device)</b>
<small>
A callback to send a patch request to a particular device. The function is called upon the `[PATCH REQUEST]` button has been pressed and it is sent to all device that have a patch request defined in their `patch` definition.
</small>

<small>
<i>device</i> - data table, a device description data structure (see below)<br />
</small>
:::

``` lua
device = {
  id = 1,                 -- a device Id
  port = 0                -- a numeric port identifier
  channel = 1,            -- a channel number
}
```
