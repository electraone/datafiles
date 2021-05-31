-- Send MIDI clock messages at given tempo

print ("MIDI clock demo")

-- function callback for the start/stop button
function buttonPressed (control, valueId, value)
    if (value == 1) then
        control:setName ("STOP")
        timer.enable ()
    else
        control:setName ("START")
        timer.disable ()
    end
end

-- function callback for setting the clock related
-- remember there is 24 clocks to one beat
function setClockRate (control, valueId, value)
    timer.setBpm (value * 24)
end

-- timer function
function timer.onTick ()
    midi.sendClock (PORT_1)
end
