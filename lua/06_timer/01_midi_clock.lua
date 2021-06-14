-- Send MIDI clock messages at given tempo

-- function callback for the start/stop button
function buttonPressed (valueObject, value)
    local control = valueObject:getControl ()

    if (value == 1) then
        control:setName ("STOP")
        timer.enable ()
    else
        control:setName ("START")
        timer.disable ()
    end
end

-- function to read the BMP control and adjust the timer settings
-- remember there are 24 clocks in one beat
function setTimerBpm ()
    local bpm = parameterMap.get (1, PT_VIRTUAL, 1);
    timer.setBpm (bpm * 24)
    print ("Setting BPM to " .. bpm)
end

-- function callback for setting the timer
function setClockRate (valueObject, value)
    setTimerBpm ()
end

-- timer function
function timer.onTick ()
    midi.sendClock (PORT_1)
end

-- Initial setup
print ("MIDI clock demo")
setTimerBpm ()
