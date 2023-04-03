# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.16.7](https://github.com/amnis-dev/amnis-state/compare/v0.16.6...v0.16.7) (2023-04-03)


### Features

* **Data:** Added data utility functions ([3b96e38](https://github.com/amnis-dev/amnis-state/commit/3b96e38d1fbbbb653b65447889e3091e0f7bf4c0))

### [0.16.6](https://github.com/amnis-dev/amnis-state/compare/v0.16.5...v0.16.6) (2023-03-29)


### Features

* **Reducers:** Insert reducer is now destructive of local data while create is not ([faad54d](https://github.com/amnis-dev/amnis-state/commit/faad54db043b19ec8eecff8ea2b7346525ab99b0))
* **Select:** Added state selector to fetch entities that are determined to be unsaved ([55c61a8](https://github.com/amnis-dev/amnis-state/commit/55c61a8f1a1df559a9a688973ddd14e989f65d08))

### [0.16.5](https://github.com/amnis-dev/amnis-state/compare/v0.16.4...v0.16.5) (2023-03-28)


### Features

* **App:** Application settings are now persisted to local storage ([3f60a06](https://github.com/amnis-dev/amnis-state/commit/3f60a0631eacedbc9c2cbf65cc8433080916fc2e))

### [0.16.4](https://github.com/amnis-dev/amnis-state/compare/v0.16.3...v0.16.4) (2023-03-27)


### Features

* **Context:** Context wipes information on the store before initializing ([37351e4](https://github.com/amnis-dev/amnis-state/commit/37351e4ba91be29940c4305a8eeb6cf0ff877954))
* **Differences:** Creator reducers now persist local changeS ([7809707](https://github.com/amnis-dev/amnis-state/commit/7809707b97632b65560506c104fd4952ff7128d4))
* **Meta:** Added meta object to track new entities ([17469a5](https://github.com/amnis-dev/amnis-state/commit/17469a56f801137f340806fcba0fe5d9a18eb478))
* **Storage:** Creating new data when is already exists will keep local modifications ([10faccd](https://github.com/amnis-dev/amnis-state/commit/10faccd1602acb15c8b1514f981bf91be07469fa))
* **Storage:** Data that determined to not be saved is persisted in local storage ([ba88acc](https://github.com/amnis-dev/amnis-state/commit/ba88acc86f0a4ad8afa9ebba9daf86cc8a95314b))


### Bug Fixes

* **Storage:** Create action no longer overwrites local changes ([36e5627](https://github.com/amnis-dev/amnis-state/commit/36e5627a4d979238ddbc3301c42b9725eb73fe1a))
* **Storage:** Local storage should not be read or saved in a web worker environment (such as API mocking) ([93f5674](https://github.com/amnis-dev/amnis-state/commit/93f56740860b6732a2138e21e9488d194e76ed46))

### [0.16.3](https://github.com/amnis-dev/amnis-state/compare/v0.16.2...v0.16.3) (2023-03-25)


### Features

* **Local Storage:** Added middleware for local storage management of uncommitted entities ([b36392e](https://github.com/amnis-dev/amnis-state/commit/b36392e33f1354eb0b051c33ecb37a9d5dd3e514))
* **Sort:** Added sorting functionality to slices ([42908d6](https://github.com/amnis-dev/amnis-state/commit/42908d6dcfe821d02a09ca4e9b34ec6d158ff4bd))

### [0.16.2](https://github.com/amnis-dev/amnis-state/compare/v0.16.1...v0.16.2) (2023-03-24)


### Bug Fixes

* **Create:** Fixed issue with re-creating existing data keeping updated information ([4ed1ae9](https://github.com/amnis-dev/amnis-state/commit/4ed1ae978715886fc2edb224a9178b7e97d87dd6))

### [0.16.1](https://github.com/amnis-dev/amnis-state/compare/v0.16.0...v0.16.1) (2023-03-24)


### Bug Fixes

* **App:** Resolved typing issues with app selectors ([c7b2cea](https://github.com/amnis-dev/amnis-state/commit/c7b2cea14674f7372d67bcc455080db4fc40973b))

## [0.16.0](https://github.com/amnis-dev/amnis-state/compare/v0.15.9...v0.16.0) (2023-03-24)


### Features

* **Data:** Added more fundemental data slice creation ([62981e3](https://github.com/amnis-dev/amnis-state/commit/62981e37f35f8f4c295c8d0cdf5b11f37e1d6504))
* **Entities:** Entity keys, actions, and selectors are now static ([a0fa762](https://github.com/amnis-dev/amnis-state/commit/a0fa76272db8633f7ebd0008558efe2deb8157c6))
* **Profile:** Profile data now uses pnpm lint ([d2d9070](https://github.com/amnis-dev/amnis-state/commit/d2d9070bc8f51e601b62fd684b8a1565efcdc860))
* **Reducers:** Added more advanced method for configuring reducers ([378d0d8](https://github.com/amnis-dev/amnis-state/commit/378d0d867673fe1dea753466c1a2bebf1e31097d))
* **Refactor:** Completed refactor on baseline ([945c9b8](https://github.com/amnis-dev/amnis-state/commit/945c9b81d4779e196e24a05678faaae2f92ac312))
* **Refactor:** Major refactor in entity states ([28c9c35](https://github.com/amnis-dev/amnis-state/commit/28c9c35d399c41ba9e2903dd468ac29f0fd45598))
* **State:** Converted OTP to data reducer ([4c6176f](https://github.com/amnis-dev/amnis-state/commit/4c6176fbeb4fdbe43b3e58beac539ca6fb920522))
* **State:** Greatly simplified entity and slice creations ([79f1146](https://github.com/amnis-dev/amnis-state/commit/79f1146a83fc77e883de2b307d79a2d8e7228a90))
* **Store:** Updated store, slices, and sets ([3570c1f](https://github.com/amnis-dev/amnis-state/commit/3570c1f8dacff615c8888f0fd917297a080182d9))
* **Types:** Reorganized type to make sense with the refactor ([cf13cf0](https://github.com/amnis-dev/amnis-state/commit/cf13cf06ebfe0e4706f62b66eb9f77a56e4042c9))


### Bug Fixes

* **Exports:** Reducer modules no longer have default exports ([5cf1d67](https://github.com/amnis-dev/amnis-state/commit/5cf1d67f41609b76d371ee31d2f81e6ee12796d7))
* **Types:** Fixed typings for entitiy slices ([dbbda33](https://github.com/amnis-dev/amnis-state/commit/dbbda3301ee43749a31cf2859e434015e32c8b9b))

### [0.15.9](https://github.com/amnis-dev/amnis-state/compare/v0.15.8...v0.15.9) (2023-03-19)


### Features

* **App:** Added application reducers to set or remove systems ([466157f](https://github.com/amnis-dev/amnis-state/commit/466157fdc9a0fd6adc27ffc4ac41f57ef7716474))

### [0.15.8](https://github.com/amnis-dev/amnis-state/compare/v0.15.7...v0.15.8) (2023-03-19)


### Features

* **App:** Added new application reducers and selectors ([c51ae61](https://github.com/amnis-dev/amnis-state/commit/c51ae61883d256b8c4b0190d129e8ff367af39ef))

### [0.15.7](https://github.com/amnis-dev/amnis-state/compare/v0.15.6...v0.15.7) (2023-03-19)


### Bug Fixes

* **IO:** Fixed typings for IO ([6b15786](https://github.com/amnis-dev/amnis-state/commit/6b1578621955f0ed702c59e773c43886aa297efc))

### [0.15.6](https://github.com/amnis-dev/amnis-state/compare/v0.15.5...v0.15.6) (2023-03-19)


### Features

* **IO:** Added query and param properties to the input object ([3dc1530](https://github.com/amnis-dev/amnis-state/commit/3dc15309c7c14d61f185c977d182bf1b62898225))
* **IO:** Added Query to Generic IO type ([d85077a](https://github.com/amnis-dev/amnis-state/commit/d85077af28a74775ed58d48880047314233b912b))
* **Local Storage:** Added improved error handling for local storage operations ([7486b70](https://github.com/amnis-dev/amnis-state/commit/7486b70bfe3863869fec73e191d74262f8d4b600))
* **Typescript:** Updated typescript to latest 5.0 ([1d45e7f](https://github.com/amnis-dev/amnis-state/commit/1d45e7fe7fab83c944307e9156ae4b1412a5dfc0))

### [0.15.5](https://github.com/amnis-dev/amnis-state/compare/v0.15.4...v0.15.5) (2023-03-17)


### Features

* **App:** Added new application reducer ([ad77a92](https://github.com/amnis-dev/amnis-state/commit/ad77a92a315cbae441dd84c3be6ddace2a960eca))
* **Storage:** Added capability to store data in localstorage ([127d64e](https://github.com/amnis-dev/amnis-state/commit/127d64e81ce0bb6cf876206301af01c782c2b3d6))

### [0.15.4](https://github.com/amnis-dev/amnis-state/compare/v0.15.3...v0.15.4) (2023-03-16)


### Features

* **Api:** Added field to determine endpoints that require a bearer token ([22928ff](https://github.com/amnis-dev/amnis-state/commit/22928ffbd84fa2087e7fdbe71987568ba52638aa))

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
