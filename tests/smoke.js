// Run against the INSTALLED package: gjs finds the typelib and the shared
// library, resolves the type and its corner-radius property. Constructing the
// effect needs a live compositor, so this stops at the type.
//   GI_TYPELIB_PATH=/usr/lib/x86_64-linux-gnu/mutter-18 \
//   LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu/mutter-18 gjs tests/smoke.js
imports.gi.versions.Blur = '1.0';
const GObject = imports.gi.GObject;
const Blur = imports.gi.Blur;

const pspec = GObject.Object.find_property.call(Blur.BlurEffect, 'corner-radius');
if (Blur.BlurEffect.$gtype.name !== 'GbBlurEffect' || !pspec)
    throw new Error('Blur.BlurEffect or its corner-radius property is missing');
print(`ok: ${Blur.BlurEffect.$gtype.name} has ${pspec.name}`);
