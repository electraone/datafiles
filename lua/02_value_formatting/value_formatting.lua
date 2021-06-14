-- Example of value formatting functions
--
-- The display values of the faders will be processed by the formatters

notes = {
    "C%d",
    "C%d#",
    "D%d",
    "D%d#",
    "E%d",
    "F%d",
    "F%d#",
    "G%d",
    "G%d#",
    "A%d",
    "B%d"
}

-- Add % sign
function addPercentage (valueObject, value)
    return (string.format ("%d%%", value))
end

-- Convert number to a range with decimal numbers
function convertToFractions (valueObject, value)
    return (string.format("%.1f", value / 20))
end

-- Map text labels to ranges of values
function showRanges (valueObject, value)
    if value < 43 then
        return ("low")
    elseif value > 86 then
        return ("high")
    else
        return ("medium")
    end
end

-- Map MIDI value to note names
function displayNotes (valueObject, value)
    return (string.format(notes[math.fmod(value, 11) + 1], value // 12))
end
