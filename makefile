make:
	electron-packager . --overwrite --platform=darwin --arch=x64 --icon=images/theater.icns --prune=true --out=release-builds