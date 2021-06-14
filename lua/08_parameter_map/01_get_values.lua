-- Get a list of value objects affected by the change event

function parameterMap.onChange (valueObjects, midiValue)
    print ("a new midiValue " .. midiValue)

    for i, valueObject in ipairs (valueObjects) do
        local control = valueObject:getControl ()
        print (string.format ("affects control value %s.%s",
            control:getName (), valueObject:getId ()))
    end
end
