-- Change colour of the control according to its value

-- The color of the control changes to orange when above 96

-- declare a global threshold variable
threshold = 127

function applyColor (controlId, value)
  local control = controls.get (controlId)

  if (value <= threshold) then
    control:setColor (WHITE)
  else
    control:setColor (ORANGE)
  end
end

function setThreshold (controlId, value)
  threshold = value
  window.repaint ()
end
