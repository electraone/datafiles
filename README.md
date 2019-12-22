# Electra One Repository

![image](https://github.com/martinpavlas/electra.one/raw/master/docs/electra-top-silver.jpg)

Welcome to the public repository of the Electra One MIDI Controller project. The repository is meant for people who want to help with development of synthesizer definitions (Electra Instrument Files) and Electra presets.

We would like encourage people to share their work - their presets and instrument files. That is the way to make Electra One a very useful device and it will make synthesizer programming very accesible to people without deeper knowledge of MIDI.

Also, we would like to ask you to share your ideas and frustrations with us. We will do our best to reflect them in future releases of both Electra One firmware and Electra Editor.

## Electra Editor
Electra does not need to be connected to a computer to work. The connection to computer, however, is required when you want to upload or edit presets.

![image](https://github.com/martinpavlas/electra.one/raw/master/docs/electra-editor.png)

The Electra Editor is a web application. You must use Chrome browser, because it fully supports WebMIDI standard. As long as you are using Chrome, it works on all common platforms, ie. Windows, Mac OS X, and Linux. There are users who successfully use Opera browser too.

To run the Electra Editor, visit [editor.electra.one](https://editor.electra.one/)

Electra is fully programmed with SysEx call. We are very happy to share the Electra's SysEx implementation with you. This allows other people to develop their own editors.


## Electra User Guide
The [Electra User Guide](https://docs.google.com/document/d/1KDwv20wwwJdlct1m_r8IaG3PLbulb8RHOebviEDO6mM/edit?usp=sharing) is available at Google Docs. The User Guide is still under development, feel free to attach your comments and questions to it. We are updating it on regular basis as new features are added.

## Documentation of technically oriented users
[Electra One Github Wiki](https://github.com/martinpavlas/electra.one/wiki) pages provide detailed information about programming presets, instrument files, and other more technically oriented information about Electra One controller.

## Firmware updates
We publish releases of new firmware on regular basis. We made the update procedure very simple to encourage users to update their firmware frequently. The new firmware releases consists of both: new features and bug fixes.

![image](https://github.com/martinpavlas/electra.one/raw/master/docs/ElectraOneConsole.png)

The firmware is uploaded to Electra with an Electra One Console application. The application allows users to easily upload firmware to Electra. The update is a very simple and fast procedure.

The application also displays Electra's internal log messages in real-time. This is meant to give you a chance to share information about your Electra in case of problems and to help you when writing more complex SysEx templates and SysEx patch parsers.

The description of how to update Electra firmware is available at [Firmware Update Guide](https://github.com/martinpavlas/electra.one/wiki/Updating-firmware).


## Repository folders
Folder | Description
---|---
apps | Electra One Console application binaries
docs | Documentation
instruments | Definitions of MIDI implementations for MIDI synthesizers, DPSs, and other MIDI devices
presets | Electra presets aimed for controlling of specific synthesizers
sysex | A collection of files for upgrading and Electra maintanance



## Bug reports and feature requests
Please use the Issues tab (above) to report or review problems you are experiencing with Electra One and Electra Editor. You can also use Issue to suggest new features.

[Report a new Issue](https://github.com/martinpavlas/electra.one/issues/new)



### Upgrade for firmware prior to 0.9.3
There were two major upgrades made in past. If you have Electra One with firmware older version 0.9.2 or older, follow instructions in the [upgrade guide](https://github.com/martinpavlas/electra.one/blob/master/docs/upgrade-0.9.6.md).

