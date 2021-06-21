# Nightly builds

::: warning Note
Nightly builds are not considered to be stable and should not be used for serious work on the presets.
:::

## 2.0.6b

21 June 2021
### changelog
- Minimalistic version of the Settings Menu window added. It is a very initial version of the Settings menu. More options will come.
- Add brightness control for hw revision 2.2 or higher.
- Make it possible to use solid background to highlight the active section - [Config format](./confformat.html#top-level-objects).
- Improve switching of the active control set with the LCD touch. It is not required to hit the control any more. Any touch within the control set area will do the job.
- Make the fader detail bigger so that it is easier to control it with the LCD touch.
- Fix: Crash when patch `onRequest` or `onResponse` are called and Lua is not present.
- Fix: Graphic artefacts showing up on the screen occasionally.
- Fix: Knob on screen component (eg. page selection) has a grey arc displayed.
- Fix: Incoming MIDI value that was out side the midiMin and midiMax broke controls graphics.


## 2.0.5b

14 June 2021
### changelog
- Initialize Lua interpreter only if Lua script is present - to save memory.
- Update Lua to the latest 5.4.3 version.
- Allow to limit rate of outgoing MIDI messages - to improve communication with older slow synths.
- Add an alternative way of indicating active control sets - bars on the side instead of control dimming.
- Change attributes of the `formatter` and `function` Lua callbacks. The `value` object is now passed instead of `control` and `valueId` - [Formatter & Function](./luaext.html#value-formatters).
- Add setting and getting of the MIDI value of the `message` object - [Message object](./luaext.html#message).
- Add an `onChange` callback on the ParameterMap - [ParameterMap library](./luaext.html#parameter-map).
- Make it possible to retrieve a list of `value` objects associated with a `parameterMap` entry - [ParameterMap library](./luaext.html#parameter-map).
- Make it possible to retrieve a list of `value` objects associated with a `control`  - [Control object](./luaext.html#control).
- Fix: Do not trigger `patch.onResponse` for an empty SysEx message (MacOS X sends it).
- Fix: Do not trigger the `function` callback twice.
- Fix: Indicate outgoing MIDI (on screen indicators) when MIDI messages are sent with Lua functions.


## 2.0.4b

5 June 2021
### changelog
- Clear state of Lua script when new preset is loaded.
- Improve system of repainting the controls. More efficient and faster.
- Highlight active value on the detail (full screen) controls.
- Fix: issue of displaying the last control on the last page.
- Fix: patch dumps are processed with Lua only.


## 2.0.3b

2 June 2021
### changelog
- Provide access to the Message object - [Message object](./luaext.html#message).
- Add "Load and stay" function to the Snaphosts window
- Fix: repaint controls and groups only when page is shown
- Fix: crash of transport module when onClock () was not preset in Lua script
- Fix: misalligned graphics of rectangular groups
- Fix: snaps button on the Menu page did not work


## 2.0.2b

31 May 2021
### changelog
- Use objects to handle controls - [Controls and Control object](./luaext.html#controls).
- Add support for working with Device - [Devices and Device object](./luaext.html#devices).
- Add support for working with Pages - [Pages and Page object](./luaext.html#pages).
- Add support for a Value object in Lua, affects functions callbacks and formatters - [Value object](./luaext.html#value).
- Make it possible to manage groups from Lua - [Managing groups](./luaext.html#groups).
- Allow groups to form rectangular shape (when height > 80).
- Improve layout and visual of page, bank, message selection bars.
- Allow showing of component frames for debugging with [showComponentFrames ()](./luaext.html#helpers) function.
- Make it possible to call Lua function from a SysEx template.


## 2.0.1b

24 May 2021

### changelog
- Fix issue with the transport callbacks not being called
- Add SysEx commands to remove presets, Lua scripts, and the config [Midi Implementation - remove command](./midiimplementation.html#preset-remove)


## 2.0b

20 May 2021

### changelog
- SysEx parsing supports SysEx messages up to 1MB length
- List controls support Program Change messages
- Controls can be marked as invisible
- Lua Extension scripts are supported now [Lua Extension scripts](./luaext.md)
- SysEx calls to manage snapshots added [Midi Implementation - snapshots](./midiimplementation.html#snapshot-update)
- Log messages are now transferred as SysEx messages [Midi Implementation - log messages](./midiimplementation.html#log-message)
- Log messages can be now enabled and disabled with a SysEx messages [Midi Implementation - logger](./midiimplementation.html#midi-learn-enable-disable)
- Custom Value formatting functions can be applied [Preset format - Value formatter](./presetformat.html#value-2)
- Custom Value change callback functions can be called [Preset format - Value formatter](./presetformat.html#value-2)
- New USB VID/PID used
- iConnectivity compatibility issues resolved
- Signed negative midi values may have a bitWidth specified
