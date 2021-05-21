-- Example of modifying preset controls


-- Change visibility
control = controls.get (1)
control:setVisible (false)
print ("is it still visible: " .. (control:isVisible () and "YES" or "NO"))


-- Change name
control = controls.get (7)
control:setName ("CHANGED")
print ("The new label is: " .. control:getName ())


-- Change color
control = controls.get (13)
control:setColor (ORANGE)
print ("Is it blue now? " .. (control:getColor () == BLUE and "YES" or "NO"))


-- Change a location, using the helpers.slotToBounds () function.
control = controls.get (19)
control:setBounds (helpers.slotToBounds (6))
bounds = control:getBounds ()

print ("New bounds are: x=" .. bounds[X] ..
    ", y=" .. bounds[Y] ..
    ", width=" .. bounds[WIDTH] ..
    ", height=" .. bounds[HEIGHT])


-- Change the slot of an existing control. Location and the pot
-- assignment will be changed
control = controls.get (13)
control:setSlot (5)
