-- Example of value formatting functions
--
-- The display values of the faders will be processed by the formatters

notes = {
    "C%i",
    "C%i#",
    "D%i",
    "D%i#",
    "E%i",
    "F%i",
    "F%i#",
    "G%i",
    "G%i#",
    "A%i",
    "B%i"
}

-- Add % sign
function addPercentage (value)
    return (value .. "%")
end

-- Convert number to a range with decimal numbers
function convertToFractions (value)
    return (string.format("%.1f", value / 20))
end

-- Map text labels to ranges of values
function showRanges (value)
    if value < 43 then
        return ("low")
    elseif value > 86 then
        return ("high")
    else
        return ("medium")
    end
end

-- Map MIDI value to note names
function displayNotes (value)
    return (string.format(notes[math.fmod(value, 11) + 1], value / 12))
end
