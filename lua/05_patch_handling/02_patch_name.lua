-- Parse the patch name out of the SysEx response

function patch.onResponse (device, responseId, sysexBlock)
    local patchName = ""
    local patchNameLength = 8
    local patchNameOffset = 152

    -- get the patch name
    for i = 0, patchNameLength do
        patchName = patchName .. string.char (
            sysexBlock:peek (i + patchNameOffset))
    end

    -- set the control's name to the patchName
    control = controls.get (1)
    control:setName (patchName)
end
