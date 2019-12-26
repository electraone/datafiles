# Roland MKS-50

## Preset file
A two pages preset that covers all MKS-50 parameters.

[Preset file](https://github.com/martinpavlas/electra.one/raw/master/presets/roland-mks50.json)


## Instrument file
Fully implementation of MKS-50 SysEx. The instrument file supports changing parameters as well as reading of the patches stored in the MKS-50.

As MKS-50 does not have any call to request patches, Electra can reads the patch after it is changed on the MKS-50 panel.

[Instrument file](https://github.com/martinpavlas/electra.one/raw/master/presets/roland-mks50.json)


## MKS-50 setup
In order to have Electra One communicating with MKS-50, following needs to be set on your MKS-50:


1. set "TX PATCH APR" to "ON"
1. set "TX TONE APR" to "ON"
1. set "MEM. PROTECT" to "OFF"


All three options can be reached by:

1. pressing [TUNE/MIDI] button
1. navigating in options by pressing [PARAM] button up and down
1. the value of the option is changed by pressing [VALUE] button up and down

once your MKS-50 is configured, if you select a new patch on MKS-50 panel, the patch values will be automatically picked by the Electra one.

MKS-50 does not keep this settings after powering off. Therefore, the settings must be adjusted always after you power MKS-50 on.