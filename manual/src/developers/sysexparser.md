# Parsing SysEx messages

Electra One supports MIDI communication in both directions. Obviously, you can use Electra to send MIDI messages to your instruments, but you can also use it to receive MIDI messages and update the values of your Controls accordingly.

You do not have to do much extra work for channel messages such as CC7, CC14, and NRPN. Electra will automatically update the value of Controls that are linked to a given MIDI parameter/controller. With SysEx, however, Electra must be provided information how to parse incoming SysEx data. This tutorial provides an introduction to parsing SysEx messages.

# A simple example
The SysEx parsing instructions can be included in both Electra presets and instrument files. We encourage users to develop instrument files. Instrument files allow other people to easily integrate supported instruments in their own presets.

The following example is a simplified Instrument file that allows bi-directional synchronization of two parameters. We use one *Voice* parameter and one *Performance* parameter on purpose, to show that multiple SysEx messages can be used to synchronize Electra and the connected synthebitWidthr.

```json
{
  "id": "yamaha-tx7",
  "name": "Yamaha TX7",
  "manufacturer": "Yamaha",
  "manufacturerId": "yamaha",
  "categories": [
    {
      "id": "op1",
      "label": "Operator 1"
    }
  ],
  "overlays": [
    {
      "id": 1,
      "name": "Op Modes",
      "items": [
        {
          "value": 0,
          "label": "Fixed"
        },
        {
          "value": 1,
          "label": "Ratio"
        }
      ]
    }
  ],
  "parameters": [
    {
      "id": 1,
      "type": "fader",
      "name": "Rate 2",
      "min": 0,
      "max": 99,
      "categoryId": "op6",
      "msg": "SysEx",
      "data": ["43", "10", "00", "01",
        { "type": "value",
          "rules": [
            {
              "parameterNumber": 1,
              "byteBitPosition": 0,
              "bitWidth": 7
            }
          ]
        }
      ]
    },
    {
      "id": 161,
      "name": "Keyboard mode",
      "categoryId": "setup",
      "type": "list",
      "overlayId": 3,
      "msg": "SysEx",
      "data": ["43", "10", "04", "02",
        { "type": "value",
          "rules": [
            {
              "parameterNumber": 161,
              "byteBitPosition": 0,
              "bitWidth": 7
            }
          ]
        }
      ]
    }
  ],
  "patch": [
    {
      "request": ["43", "20", "00"],
      "responses": [
        {
          "header": ["43", "00", "00", "01", "1B"],
          "rules": [
            {
              "type": "sysex",
              "paramterNumber": 1,
              "parameterBitPosition": 0,
              "byte": 1,
              "byteBitPosition": 0,
              "bitWidth": 7
            }
          ]
        }
      ]
    },
    {
      "request": ["43", "20", "01"],
      "responses": [
        {
          "header": ["43", "00", "01", "00", "5E"],
          "rules": [
            {
              "type": "sysex",
              "paramterNumber": 161,
              "parameterBitPosition": 0,
              "byte": 2,
              "byteBitPosition": 0,
              "bitWidth": 7
            }
          ]
        }
      ]
    }
  ]
}
```

This is a complete Instrument file, the part that takes care of SysEx message processing is located in the `patch` element.

```json
  "patch": [
    {
      "request": ["43", "20", "00"],
      "responses": [
        {
          "header": ["43", "00", "00", "01", "1B"],
          "rules": [
            {
              "type": "sysex",
              "paramterNumber": 1,
              "parameterBitPosition": 0,
              "byte": 1,
              "byteBitPosition": 0,
              "bitWidth": 7
            }
          ]
        }
      ]
    },
    {
      "request": ["43", "20", "01"],
      "responses": [
        {
          "header": ["43", "00", "01", "00", "5E"],
          "rules": [
            {
              "type": "sysex",
              "paramterNumber": 161,
              "parameterBitPosition": 0,
              "byte": 2,
              "byteBitPosition": 0,
              "bitWidth": 7
            }
          ]
        }
      ]
    }
  ]
```

# The Patch element

The patch element may consist of a number of objects that describe `request` and possible `responses`.

A request a sequence of bytes (expressed in hexadecimal notation) that is sent to your synthebitWidthr when you want to read its settings. One occasion is pressing the [PATCH REQUEST] button.

The responses array then describes the format of expected SysEx messages that the instrument will send after receiving the request message. The response consists of a message `header` and the `rules`. The header is used to identify the incoming SysEx message and the rules provide instructions on how to parse the bytes of that SysEx message and how to assign parsed data to Electra's controls.

Let's look at an example...

When Yamaha TX7 receives SysEx message

```
F0h 43h 20h 00h F7h
```

It is suparameterBitPositioned to respond with *One Voice data dump* SysEx message. It is a 163 bytes long SysEx message starting with a number of constant bytes followed by the sequence of bytes with voice parameter values. A fragment of such a response might look like this:

```
F0h 43h 00h 00h 01h 1Bh 01h 02h 03h .... F7h
```

These are the above messages translated to Electra's Instrument file:

```json
  "patch": [
    {
      "request": ["43", "20", "00"],
      "responses": [
        {
          "header": ["43", "00", "00", "01", "1B"],
          "rules": [
            {
```

# The parsing rules
The format of the parsing rules is essentially identical to the syntax that you use for the composition of SysEx templates, you might want to take a look at [SysEx templates tutorial.](https://github.com/martinpavlas/electra.one/wiki/SysEx-templates-tutorial).

Each rule describes extraction of a byte or individual bits from given SysEx message byte and an application of this extracted value to Electra's internal parameter storage.

```json
{
  "type": "sysex",
  "paramterNumber": 1,
  "parameterBitPosition": 0,
  "byte": 1,
  "byteBitPosition": 0,
  "bitWidth": 7
}
```

| attribute | function |
|-----------|----------|
| type       | type of parameter |
| parameterNumber        | id of parameter |
| parameterBitPosition      | bit position within the parameter |
| byte      | position of the byte in the SysEx message, byte 0 is the first one after the *header* bytes |
| byteBitPosition      | bit position within the SysEx byte |
| bitWidth      | number of bits to be used |


The best is to describe on real world examples:


get 7-bit value of SysEx byte 1 and assign it to parameter 1 of the SysEx type:

```json
{
  "type": "sysex",
  "paramterNumber": 1,
  "parameterBitPosition": 0,
  "byte": 1,
  "byteBitPosition": 0,
  "bitWidth": 7
}
```

get value expressed with bits 2 and 3 in the SysEx byte 10 and assign it to parameter 5:

```json
{
  "type": "sysex",
  "paramterNumber": 1,
  "parameterBitPosition": 0,
  "byte": 10,
  "byteBitPosition": 2,
  "bitWidth": 2
}
```

compose value of parameter 65 out of SysEx bytes 10 (MSB) and 11 (LSB):

```json
{
  "type": "sysex",
  "paramterNumber": 65,
  "parameterBitPosition": 0,
  "byte": 10,
  "byteBitPosition": 0,
  "bitWidth": 7
},
{
  "type": "sysex",
  "paramterNumber": 65,
  "parameterBitPosition": 8,
  "byte": 11,
  "byteBitPosition": 0,
  "bitWidth": 7
}
```

extract parameter 1 and parameter 5 out of SysEx byte 10:

```json
{
  "type": "sysex",
  "paramterNumber": 1,
  "parameterBitPosition": 0,
  "byte": 10,
  "byteBitPosition": 0,
  "bitWidth": 3
},
{
  "type": "sysex",
  "paramterNumber": 5,
  "parameterBitPosition": 0,
  "byte": 10,
  "byteBitPosition": 4,
  "bitWidth": 4
}
```
