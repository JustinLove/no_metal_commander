# No Metal Commander

The commander generates no metal, but he has more storage to get going.

## Trivia

- The commander produces 1 metal to avoid a bug where you can't reclaim with zero metal income, zero metal in storage, and a metal demand.
- More generally, reclaim rate is limited by build rate - if build speed is being attenuated by lack of metal, reclaim rates will also be reduced, exacerbating the problem.
- There are lots of rounding or overshoot errors in the economy, but nobody notices in a streaming economy.

## Development

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

PA will upload **all files** in the mod directory, including `node_modules` and maybe even `.git` - you probably don't want to use this in `server_mods` directly, unless you really like waiting.  The template is set up run to run as a project within a peer directory of `server_mods` - I use `server_mods_dev/mod_name`.  The task `grunt copy:mod` will copy the mod files to `../../server_mods/identifier`, you can change the `modPath` in the Gruntfile if you want to run it from somewhere else.

### Available Tasks

- copy:mod - copy the mod files into server_mods
- proc:commnder - copy the base_commander from PA, and write a modified version into the mod.
- jsonlint - lint all the mod json files
- json_schema - partial validation of mod json files format using schema by exterminans https://forums.uberent.com/threads/wip-units-ammo-and-tools-json-validation-schema.60451/
- default: proc, json_schema, jsonlint, copy:mod
