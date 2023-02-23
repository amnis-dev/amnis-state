# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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