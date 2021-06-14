-- Example of a simple value change callback function

-- Note, the value is not the MIDI value sent, but the state of the pad itself
function writeToLog (valueObject, value)
    local control = valueObject:getControl ()
    print ("value of control " .. control:getName () ..
        "." .. valueObject:getId () ..
        " changed to " .. value)
end
