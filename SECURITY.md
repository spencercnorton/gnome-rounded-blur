# Security policy

## Reporting a vulnerability

Please report vulnerabilities privately through GitHub:
**[Report a vulnerability](https://github.com/spencercnorton/gnome-rounded-blur/security/advisories/new)**.
Do not open a public issue, and do not include real credentials or personal
paths in the report — a description and a minimal reproduction are enough.

There is no e-mail address for security reports; the advisory form is the
only channel, and it is the one that is monitored. You will get an
acknowledgement within a week. Fixes ship as a tagged release; the advisory
is published once the release is out, and credits you unless you ask
otherwise.

## Supported versions

Only the latest tagged release is supported.

## Scope

In scope: this repository's changes and the package it ships. A problem in
the blur effect itself is usually in upstream code as well; report it here
and it will be passed on to
[kancko/gnome-rounded-blur](https://github.com/kancko/gnome-rounded-blur).
Out of scope: GNOME Shell and mutter, and the extensions that load this
library.

## What the library does

It runs inside GNOME Shell as a Clutter effect that an extension creates. It
reads no files, stores nothing, opens no network connections and handles no
credentials.
