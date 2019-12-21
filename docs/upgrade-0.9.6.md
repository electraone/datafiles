# Major upgrade to firmware 0.9.6

The version 0.9.6 brings quite a few radical changes regarding the features and the UI. The upgrade to 0.9.6 cannot be done just with flashing the new firmware, instead a special upgrade procedure must be executed. The lines below describe the steps to take.

## Upgrade procedure

Before you start, make sure you have the following three files:


```
firmware-0.9.6.frm
upgrade-0.9.6.syx
```


If you downloaded files compressed with zip, you will need to uzip them first.

The upgrade procedure takes around 15 minutes and consists of the following steps:

1. Connect Electra to computer and let it start up
1. Install firmware firmware-0.9.6.frm. You can do this either with a command line tool or a GUI application
1. Electra will boot up with message “Please send upgrade.syx file to Electra CTRL port”
1. Use SysEx librarian and send the file “upgrade-0.9.6.syx” to Electra. If you do not see “Electra CTRL port on your computer, use Electra Port 3. If you see only Port 1 and Port 2 refer to the Notes below.
1. The transfer takes about 8 minutes. Be patient, do not interrupt it
1. After the file is transferred, Electra’s LCD will read “Disconnect Electra and connect it again”
1. Follow the instructions and reconnect Electra
1. If everything went fine, Electra will boot up a new version of the firmware
1. 
Your Electra One is now loaded with latest firmware and the asset files that provide support to the new UI and SysEx patch reading.

## Notes

### Cached MIDI device

If you flashed new firmware as described in step 3, but you do not see Electra CTRL port or Port 3, your Electra MIDI Device driver is cached with Mac OS X. In order to read a new configuration take following steps:

1. Disconnect Electra from your computer
1. Run Audio MIDI Setup application
1. Switch to MIDI Studio View
1. Select Electra Controller device
1. Delete it with - sign in the toolbar
1. Once removed, connect Electra again. Electra One should now appear with 3 ports

Having a 3rd port is a crucial feature of new firmware. Electra now strictly separates MIDI traffic for connected devices from the traffic that is for Electra Controller. All communication with between Electra and the Editor now takes places on Port CTRL (or Port 3).

Older version of Mac OS X do not support Port names. If it is the case, Port CTRL is listed as Port 3.
