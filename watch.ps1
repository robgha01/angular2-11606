$rootPath = "/UI.Client"
$gulpFile = join-path $PSScriptRoot "$rootPath/node_modules/.bin/gulp.cmd"
$target = join-path $PSScriptRoot $rootPath
$gulpConfig = join-path $PSScriptRoot "$rootPath/Gulpfile.js"

cmd.exe /c "$gulpFile -b $target --color --gulpfile $gulpConfig watch-sync"