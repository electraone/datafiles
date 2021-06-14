-- Display controls related to specific value of another control

-- a function to hide all controls within the groups
function hideAllGroups (groups)
    for groupId = 0, #groups do
        for i, controlId in ipairs (groups[groupId]) do
            control = controls.get (controlId)
            control:setVisible (false)
        end
    end
end

-- show given control group
function showGroup (groups, groupId)
    for i, controlId in ipairs (groups[groupId]) do
        control = controls.get (controlId)
        control:setSlot (i + 1)
    end
end

-- the callback function called from the preset
function displayGroup (valueObject, value)
    hideAllGroups (controlGroups)
    showGroup (controlGroups, value)
end


-- set the initial state. group 0 is displayed

-- define assignment of controls to groups
controlGroups = {
    [0] = { 20, 21, 22 },
    [1] = { 26, 27, 28 },
    [2] = { 32, 33 }
}

showGroup (controlGroups, 0)
