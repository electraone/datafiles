-- Example of a simple value change callback function

-- Note, the value is not the MIDI value sent, but the state of the pad itself
function writeToLog (control, valueId, value)
    print ("value of control " .. control:getName () ..
        "." .. valueId ..
        " changed to " .. value)
end
