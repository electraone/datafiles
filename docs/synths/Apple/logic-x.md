# Logic X control assigment tutorial
 
## Preset file
A demo preset made just for the purpose of this tutorial

[Preset file](https://github.com/martinpavlas/electra.one/raw/master/presets/logic-x-demo.json)

![Logic X demo](https://github.com/martinpavlas/electra.one/raw/master/docs/synths/Apple/logic-x-preset.png)


## Assigning controls to a plugin
This tutorial will show you how to assign Electra One controls to any type of parameter in Logic X. In Logic X Electra One can be used to control parameters of plugins, effects, and even Logic X functionality, such as channel strip faders and many others. Your assigments are saved as part of the Logic X project.

### Verify your Electra is registered in Logic X
First step is to make sure that Logic x can read your MIDI messages from your Electra.

Go to:


```
Logic Pro X -> Preferences -> MIDI
```


In tab "Inputs" you should see Electra Ones ports. Make sure they are selected.

![Logic X Preferences](https://github.com/martinpavlas/electra.one/raw/master/docs/synths/Apple/logic-midi-inputs.png)


### Pick a plugin
Configure your project, so that you have a software plugin assigned to a track. in this tutorial we used "Retro Sparkle Synth" from "Classics" category that comes with Logic Pro X standard plugin bundle.

Click the "Knob" icon at the left=top of the screen. It will show the controls of the plugin.

When you done everything correctly, you should see something like this.

![Logic X Plugin](https://github.com/martinpavlas/electra.one/raw/master/docs/synths/Apple/logic-plugin.png)


### Load preset file to Electra
Load [Logic X demo](https://github.com/martinpavlas/electra.one/raw/master/presets/logic-x-demo.json) preset file to Electra. To do so, use "IMPORT PRESET FILE" button in [Electra Editor](https://editor.electra.one/). Once it is loaded in the editor, upload it to Electra by pressing "SEND TO ELECTRA" button. Make sure you are using **Chrome** browser.


### Assign plugin parameters to Electra One Controls
When now when you are in Logic Pro X, on the screen as shown above, press 
```
CMD + L
```

The MIDI Learn window will show up. 

![Logic X Plugin](https://github.com/martinpavlas/electra.one/raw/master/docs/synths/Apple/logic-learn-window.png)

Click on the "GLIDE" parameter of the plugin. the MIDI Learn window should reflect. Now, twist the "GLIDE" knob on Electra. If you have done everything correctly, you will be will be able to change GLIDE with the knob on Electra One.

If it does not work, please see the tutorial below to get more details about linking MIDI controllers with Logic X.


## General tutorial on Controller assiments in Logic X

[![Logic X Tutorial](https://github.com/martinpavlas/electra.one/raw/master/docs/synths/Apple/logic-x-tutorial.png)](https://www.youtube.com/watch?v=XkfYDk4IlDU)