-- Change colour of the control according to its value

-- The color of the control changes to orange when above
-- a threshold given by the Lua script

-- declare a global threshold variable
threshold = 96

function applyColor (control, valueId, value)
  if (value <= threshold) then
    control:setColor (WHITE)
  else
    control:setColor (ORANGE)
  end
end
