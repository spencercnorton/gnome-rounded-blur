# Changelog

All notable changes to this packaging of GNOME Rounded Blur are documented here.

## 1.0.2 — 2026-09-29

The first release from this repository, on upstream `f3bfcc7`, which follows upstream's `v1.0.1`. Debian version `1.0.2-1`.

- Upstream's anti-aliased corner mask.
- The mutter ABI is a meson option, and the Debian build derives it from the installed `libmutter-*-dev`.
- Moving the effect to another actor resets its cached content and texture size.
- gnome-shell's copyright line is back on the two files derived from `shell-blur-effect`.
