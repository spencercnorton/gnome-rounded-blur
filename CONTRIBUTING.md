# Contributing to GNOME Rounded Blur

Thanks for your interest. This is a small downstream of
[kancko/gnome-rounded-blur](https://github.com/kancko/gnome-rounded-blur),
with one maintainer, so the process is deliberately light.

## How changes land

GitHub is the development home. Branch from `main` and open a pull request
into `main`. Build, test and privacy checks must pass before merge. Changes
ship in tagged releases.

A change to the blur effect itself belongs upstream first: open it at
kancko/gnome-rounded-blur, and it arrives here with the next re-sync. This
repository keeps upstream's history unchanged, and carries only the Debian
packaging and the small changes listed in the README.

Use a GitHub noreply address for commit authorship if you prefer to keep
your personal address private. Public history is public data.

## Working on the code

```bash
sh tests/check-source.sh             # what CI runs first
dpkg-buildpackage -us -uc -b         # CI builds twice and compares the packages byte for byte
```

- Keep a change to one concern.
- A bug fix carries a regression test, even if that is one more line in
  `tests/check-source.sh`.
- Commits carry a `Signed-off-by:` line (`git commit -s`, the Developer
  Certificate of Origin). There is no CLA.
- No secrets, hostnames, personal data or personal paths in the diff; the
  privacy check rejects them.

## Out of scope

- Features that do not need to live inside the blur effect. An extension
  can do those.
- Packaging for distributions other than Ubuntu. Upstream covers Arch, and
  the meson build works anywhere.

## Pull request checklist

- [ ] `sh tests/check-source.sh` passes and the package builds
- [ ] Commits are signed off
- [ ] No secrets, hostnames, personal data or personal paths in the diff
- [ ] `CHANGELOG.md` updated under `## Unreleased` if behaviour changed
