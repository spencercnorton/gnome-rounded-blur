<h1 align="center">GNOME Rounded Blur</h1>

<p align="center">
  <strong>Rounded corners for GNOME Shell's dynamic blur.</strong><br>
  A GObject Introspection library, <code>Blur.BlurEffect</code>, that clips a background blur to a corner radius, packaged for Ubuntu 26.04 and GNOME 50.
</p>

<p align="center">
  <a href="https://github.com/spencercnorton/norvi-os"><img alt="Part of NorviOS" src="https://img.shields.io/badge/NorviOS-component-FD8024.svg"></a>
  <a href="https://github.com/spencercnorton/gnome-rounded-blur/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/spencercnorton/gnome-rounded-blur/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/spencercnorton/gnome-rounded-blur/tags"><img alt="Latest release" src="https://img.shields.io/github/v/tag/spencercnorton/gnome-rounded-blur?label=release&sort=semver"></a>
  <a href="#install"><img alt="Install from the release" src="https://img.shields.io/badge/install-.deb-2D2D2D.svg"></a>
  <a href="LICENSE"><img alt="Licence" src="https://img.shields.io/badge/licence-GPL--3.0--or--later-blue.svg"></a>
  <a href="https://buy.stripe.com/8x26oH2U44f65TRe574wM04"><img alt="Donate" src="https://img.shields.io/badge/donate-Stripe-635bff.svg?logo=stripe&logoColor=white"></a>
</p>

This is the Ubuntu packaging of [kancko/gnome-rounded-blur](https://github.com/kancko/gnome-rounded-blur), a copy of gnome-shell's
[ShellBlurEffect](https://github.com/GNOME/gnome-shell/blob/main/src/shell-blur-effect.c)
with a corner mask added and its GIR namespace changed to `Blur`. It carries upstream's code plus two small changes, listed below. It is
the library behind the rounded blur of the [NorviOS](https://github.com/spencercnorton/norvi-os) desktop's dock, menus and windows.

## What it does

**Rounds dynamic blur, which an extension cannot do on its own.** In background mode, `Shell.BlurEffect` paints its blurred backdrop
and then continues the Clutter effect chain, so a corner mask added after it only ever sees the actor's own, empty, content. The
clipping has to happen inside the blur effect, and this library is that effect with a corner radius.

**Anti-aliases the corners.** The corner mask comes from upstream: a smooth one-pixel edge instead of a stair-stepped arc.

**Follows the mutter ABI it was built against.** The library links against one mutter version. The Debian package depends on the
matching `libmutter` runtime, so when a GNOME release moves to a new mutter ABI, apt removes the package instead of leaving behind a
library that can no longer load. The corners then go square, visibly, until a rebuild.

## Install

### Ubuntu 26.04 — the release package

Download `gnome-rounded-blur_*_amd64.deb` and `SHA256SUMS.txt` from the
[latest release](https://github.com/spencercnorton/gnome-rounded-blur/releases/latest), check it, and install it:

```bash
sha256sum --check --ignore-missing SHA256SUMS.txt
sudo apt install ./gnome-rounded-blur_*_amd64.deb
```

Log out and back in once so GNOME Shell loads the new typelib. Blur my Shell then finds the `Blur` library and offers its corner-radius
settings.

### From source

```bash
sudo apt install build-essential meson ninja-build pkg-config libglib2.0-dev \
  gobject-introspection libgirepository1.0-dev libmutter-18-dev debhelper
dpkg-buildpackage -us -uc -b        # or: meson setup build && meson compile -C build
```

`debian/rules` reads the mutter ABI from the installed `libmutter-*-dev`, so a GNOME release with a new ABI needs a rebuild against
its `-dev` package, not a source edit. Plain `meson` builds take `-Dmutter_api_version=<N>` (default `18`, GNOME 50).

### Using it from an extension

```javascript
import GObject from 'gi://GObject';
import Blur from 'gi://Blur';

const RoundedBlur = GObject.registerClass(
class RoundedBlur extends Blur.BlurEffect {
    constructor(params) {
        super({mode: Blur.BlurMode.BACKGROUND, radius: 30, brightness: 0.6, corner_radius: 14, ...params});
    }
});
```

## What this fork changes

Both changes are small and meant for upstream:

- **The mutter ABI is a meson option** (`mutter_api_version`) instead of a hardcoded `18`. The Debian build derives it from the
  installed `libmutter-*-dev`.
- **Moving the effect to another actor resets its cache.** The cached content, texture size and downscale factor are cleared in
  `set_actor()`, so a reused effect does not decide from the previous actor's size that its framebuffers still fit.

It also restores gnome-shell's 2019 copyright line on the two files derived from `shell-blur-effect`.

## Documentation

- [CHANGELOG.md](CHANGELOG.md): one entry per release
- [NOTICE](NOTICE): where the code comes from and what the licence covers

## Contributing and support

- Bugs and feature requests: [open an issue](https://github.com/spencercnorton/gnome-rounded-blur/issues/new/choose). A problem in the blur itself is usually upstream's, at [kancko/gnome-rounded-blur](https://github.com/kancko/gnome-rounded-blur/issues).
- Security reports: [private vulnerability reporting](https://github.com/spencercnorton/gnome-rounded-blur/security/advisories/new). See [SECURITY.md](SECURITY.md). There is no e-mail address; that is deliberate.
- Pull requests are welcome; read [CONTRIBUTING.md](CONTRIBUTING.md) first. Changes are reviewed and merged on GitHub, then shipped in tagged releases.
- If this saves you time, you can [support its development](https://buy.stripe.com/8x26oH2U44f65TRe574wM04).

## Development

```bash
sh tests/check-source.sh             # the two fork changes are still in place
dpkg-buildpackage -us -uc -b         # what CI builds, twice, and compares byte for byte
```

## Licence

[GPL-3.0-or-later](LICENSE).

This fork is based on [kancko/gnome-rounded-blur](https://github.com/kancko/gnome-rounded-blur) at `f3bfcc7`, whose history this
repository keeps unchanged. That code is in turn derived from gnome-shell's `shell-blur-effect`. The licence is inherited; see
[NOTICE](NOTICE).
