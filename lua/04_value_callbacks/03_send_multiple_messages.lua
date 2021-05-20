-- Send MIDI messages with callback functions

-- Send multiple raw MIDI messages upon control value change
function sendMultiple (controlId, value)
    print ("send multiple")
    midi.sendControlChange (PORT_1, 1, 10, value)
    midi.sendControlChange (PORT_1, 1, 11, value)
end

-- Send a raw MIDI message when a condition on a control value is matched
function sendOnCondition (controlId, value)
    if (value > 64) then
        print ("send on condition")
        midi.sendControlChange (PORT_1, 1, 12, (value - 64) / 8)
    end
end
