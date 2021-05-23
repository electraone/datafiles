-- Issue a patch requests
patch.requestAll ()

-- Send a program change
function patch.onRequest (device)
    print ("Requesting patches...");

    if (device.id == 1) then
        midi.sendProgramChange (PORT_1, device.channel, 10)
    end
end

-- Parse an incoming response
function patch.onResponse (device, responseId, data)
    -- print the header information
    print ("device id = " .. device.id)
    print ("device channel = " .. device.channel)
    print ("device port = " .. device.port)
    print ("responseId = " .. responseId)
    print ("manufacturer Id = " .. sysexBlock.getManufacturerSysexId (data))

    -- print the received data
    for i = 1, sysexBlock.getLength (data) do
        print ("data[" .. i .. "] = " .. sysexBlock.peek (data, i))
    end

    -- update two parameters
    parameterMap.set (device.id, PT_CC7, 1, sysexBlock.peek (data, 7));
    parameterMap.set (device.id, PT_CC7, 2, sysexBlock.peek (data, 8));
end
