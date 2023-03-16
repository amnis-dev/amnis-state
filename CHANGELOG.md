# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.15.3](https://github.com/amnis-dev/amnis-state/compare/v0.15.2...v0.15.3) (2023-03-16)


### Features

* **Api:** Refactored APIs to a simplier form ([cbf32b2](https://github.com/amnis-dev/amnis-state/commit/cbf32b2ea6ec852ae7b4672c26b300bfc0b25c66))

### [0.15.2](https://github.com/amnis-dev/amnis-state/compare/v0.15.1...v0.15.2) (2023-03-16)


### Features

* **Api:** Added additional selectors for convenience ([71a80d9](https://github.com/amnis-dev/amnis-state/commit/71a80d9ec5a19bd5625529036bc44388f4b2fb10))
* **Api:** Added flag to determine authentication apis ([961f569](https://github.com/amnis-dev/amnis-state/commit/961f569fd4957bd53fedf67a1b2f6cafabfc9b37))
* **Api:** Added required reducerPath field for API entities ([94d4702](https://github.com/amnis-dev/amnis-state/commit/94d4702e6482f2ab5e0c87292645b65e6959b5cc))

### [0.15.1](https://github.com/amnis-dev/amnis-state/compare/v0.15.0...v0.15.1) (2023-03-16)


### Bug Fixes

* **Package:** Renamed 'validate' to 'context' in package export ([9f59235](https://github.com/amnis-dev/amnis-state/commit/9f59235109a8b7cbe1d740f1705c1458e102fe6c))

## [0.15.0](https://github.com/amnis-dev/amnis-state/compare/v0.14.10...v0.15.0) (2023-03-16)


### Features

* **Api:** Added new default api settings ([c82868e](https://github.com/amnis-dev/amnis-state/commit/c82868e1fdb0c1a2ec858fe693ca2442c6c2ffa3))
* **Api:** API info has transitioned to entities and referenced by the system ([dc6dd15](https://github.com/amnis-dev/amnis-state/commit/dc6dd156308eb990985f583f7f83c78427da0958))
* **Context:** Context has it's own entrypoint and now allows schemas to be added without compiling to validators ([d70e7a4](https://github.com/amnis-dev/amnis-state/commit/d70e7a4a6d83416f50d49afd0eb75d9c70a78158))
* **IO:** New definition of a process map with meta information ([27dbb61](https://github.com/amnis-dev/amnis-state/commit/27dbb6168d7e45b585d8f00ab18a28d1debbb22d))

### [0.14.10](https://github.com/amnis-dev/amnis-state/compare/v0.14.9...v0.14.10) (2023-03-09)


### Features

* **API:** Configured authentication endpoint to include signature and challenge headers ([cc80e16](https://github.com/amnis-dev/amnis-state/commit/cc80e166e7659d79cc8b2311a4297d3ee0ecbabe))

### [0.14.9](https://github.com/amnis-dev/amnis-state/compare/v0.14.8...v0.14.9) (2023-03-08)


### Features

* **LocalStorage:** simplified local storage utility ([3de1bf7](https://github.com/amnis-dev/amnis-state/commit/3de1bf733b13cc9a70d3cfe94917f997e180baf8))


### Bug Fixes

* **LocalStorage:** Fixed unknonw global on localstorage type ([c16be94](https://github.com/amnis-dev/amnis-state/commit/c16be94062831ad24b4932847a3477dd199143fe))

### [0.14.8](https://github.com/amnis-dev/amnis-state/compare/v0.14.7...v0.14.8) (2023-03-08)


### Bug Fixes

* **Node:** Fixes issue with node schema uri imports in webpack ([d58d65e](https://github.com/amnis-dev/amnis-state/commit/d58d65e99f0d35d741ab723809d439e560fbcac3))

### [0.14.7](https://github.com/amnis-dev/amnis-state/compare/v0.14.6...v0.14.7) (2023-03-08)


### Bug Fixes

* **Delete:** Fixed issue with the data delete action matching with the wipe actions ([d3b08a8](https://github.com/amnis-dev/amnis-state/commit/d3b08a8d7ce991cfab212a5be935c5ecbe122487))

### [0.14.6](https://github.com/amnis-dev/amnis-state/compare/v0.14.5...v0.14.6) (2023-03-08)


### Features

* **Api:** Decoupled API reducers and functions ([50145c0](https://github.com/amnis-dev/amnis-state/commit/50145c0310ec89f538243ad15a366ba5e54a346c))
* **State:** Refactored reducer and state management to seperate API logic from the core state ([37c7d92](https://github.com/amnis-dev/amnis-state/commit/37c7d926d8c85c7d8f1a74b788ea69bc3b597ebb))


### Bug Fixes

* **Redux Toolkit:** Added patch files to resolve types issues with using node16 module resolution ([10154ee](https://github.com/amnis-dev/amnis-state/commit/10154ee0327f5b5e342a048b3b2354171e37d95b))

### [0.14.5](https://github.com/amnis-dev/amnis-state/compare/v0.14.4...v0.14.5) (2023-02-24)


### Features

* **Audit:** Added package auditing to workflow ([2a279a9](https://github.com/amnis-dev/amnis-state/commit/2a279a93a8f254685a6854c8dd8704f7a8be8b3d))
* **Splitting:** Split schema and validation tools into separate distributions ([5a1fc5c](https://github.com/amnis-dev/amnis-state/commit/5a1fc5c86eaea3981279b982f1916e4ba96e089f))
* **Workflow:** Merged build with test job ([a1ebcf7](https://github.com/amnis-dev/amnis-state/commit/a1ebcf7528035384b1ee28ce84df5be05b5a1afe))
* **Workflow:** Moved build taks to it's own job ([51a0002](https://github.com/amnis-dev/amnis-state/commit/51a000296b68f2718b93860d9a3ddc0bd50061c4))


### Bug Fixes

* **Audit:** Fixed missing PNPM in audit workflow ([e2d9d6c](https://github.com/amnis-dev/amnis-state/commit/e2d9d6cfb84838f51ca5f7ecd4af290830ed11e2))

### [0.14.4](https://github.com/amnis-dev/amnis-state/compare/v0.14.3...v0.14.4) (2023-02-23)


### Features

* **Processes:** Added new IO Process type for mapping process methods ([e265540](https://github.com/amnis-dev/amnis-state/commit/e2655405fc79e37eb6e52680abcd767e19dc8175))

### [0.14.3](https://github.com/amnis-dev/amnis-state/compare/v0.14.2...v0.14.3) (2023-02-23)


### Features

* **Processers:** Processers can now be identified as a get or post method for HTTP services ([82b1b25](https://github.com/amnis-dev/amnis-state/commit/82b1b25709724780161fd8fdc37ae365c8fea58e))


### Bug Fixes

* **IO:** Fixed issue with mapping new structure of processes ([7bfeaeb](https://github.com/amnis-dev/amnis-state/commit/7bfeaebdddd73b2d491d270ced1d92bece9fe951))

### [0.14.2](https://github.com/amnis-dev/amnis-state/compare/v0.14.1...v0.14.2) (2023-02-23)


### Bug Fixes

* **Workflow:** Publish workflow now sets up PNPM ([7672589](https://github.com/amnis-dev/amnis-state/commit/767258998d5c8a7c823bc0c6aac2788148640f89))

### [0.14.1](https://github.com/amnis-dev/amnis-state/compare/v0.14.0...v0.14.1) (2023-02-23)


### Features

* **Workflow:** Added package workflow for publishing on release ([20465d8](https://github.com/amnis-dev/amnis-state/commit/20465d8d0dab1a4a473104ab3bde3e37fd94ea85))
* **Workflow:** Updated package action to use pnpm instead of yarn ([43ced49](https://github.com/amnis-dev/amnis-state/commit/43ced493f1ee68c821a2deba565458b1ddd09370))

## 0.14.0 (2023-02-23)


### Features

* **Context:** Added context ([af662eb](https://github.com/amnis-dev/amnis-state/commit/af662ebc0c77b275375950e586ecd1d9f8afd9c8))
* **Core:** Added additional core types ([903967d](https://github.com/amnis-dev/amnis-state/commit/903967deee94e237232f6a9d11251415eb2eaae2))
* **Entities:** Added core entities ([95d7143](https://github.com/amnis-dev/amnis-state/commit/95d71430abad3b954bdafd2ee00e0d6cf1f2feb0))
* **Initial:** Initial project setup ([426f32e](https://github.com/amnis-dev/amnis-state/commit/426f32e9ff4c6e27c4b28d95d0a12ba6321e7dda))
* **Schema:** Added schemas ([f4b838e](https://github.com/amnis-dev/amnis-state/commit/f4b838ef539c4b495635d8490cd69eaddd9ac7c7))
* **Slices:** Added additional slices ([e8c7756](https://github.com/amnis-dev/amnis-state/commit/e8c775603ea6afa25cc11103c36bfe23b2de74f6))
* **Slices:** Added entity slices are redux state ([08590d3](https://github.com/amnis-dev/amnis-state/commit/08590d30423a39f01d0dab14a0163bfefbf135c9))
* **Tests:** Added slice tests ([23b2139](https://github.com/amnis-dev/amnis-state/commit/23b21398bd1fd4e23d9ed0bc3e978d67d3ceb902))
* **Workflow:** Added ffmpeg installation to actions ([40cd025](https://github.com/amnis-dev/amnis-state/commit/40cd025198fe539a0406f6595ab56ac4dbb2567c))
* **Workflow:** Added integrity check workflow ([4f7d7a5](https://github.com/amnis-dev/amnis-state/commit/4f7d7a535bcf32b971f593e5cd933dff26eaa32d))


### Bug Fixes

* **Imports:** Resolved circular imports under some packages ([a95dedd](https://github.com/amnis-dev/amnis-state/commit/a95dedde7b7790475614ba1035182196eef04210))
* **Test:** Increased test timeouts ([8c9ea19](https://github.com/amnis-dev/amnis-state/commit/8c9ea19aada6c5357f2740c5db83115633d56ab3))
* **Workflow:** Fixed misspelling of PNPM in workflow ([f43778d](https://github.com/amnis-dev/amnis-state/commit/f43778d16e56751fc15c9562aaec3d09d54edcb6))
