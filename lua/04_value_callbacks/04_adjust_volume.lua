-- Adjust value of another MIDI parameter

function adjustVolume (valueObject, value)
    if (value > 64) then
        print ("send on condition")
        parameterMap.set (1, PT_CC7, 2, value)
    end
end
