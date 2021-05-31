# Nightly builds

::: warning Note
Nightly builds are not considered to be stable and should not be used for serious work on the presets.
:::

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
