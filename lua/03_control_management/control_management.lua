-- Example of modifying preset controls


-- Change visibility
control = controls.get (1)
controls.setVisible (control, false)
print ("is it still visible: " .. (controls.isVisible (control) and "YES" or "NO"))


-- Change name
control = controls.get (7)
controls.setName (control, "CHANGED")
print ("The new label is: " .. controls.getName (control))


-- Change color
control = controls.get (13)
controls.setColor (control, ORANGE)
print ("Is it blue now? " .. (controls.getColor (control) == BLUE and "YES" or "NO"))


-- Change a location, using the helpers.slotToBounds () function.
control = controls.get (19)
controls.setBounds (control, helpers.slotToBounds (6))
bounds = controls.getBounds (control)

print ("New bounds are: x=" .. bounds[X] ..
    ", y=" .. bounds[Y] ..
    ", width=" .. bounds[WIDTH] ..
    ", height=" .. bounds[HEIGHT])

-- Change assignment of the control to a controlSet
controls.setControlSet (control, 1)
print ("It was moved to controlSet: " .. controls.getControlSet (control))
