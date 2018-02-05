(function () {
    System.defaultJSExtensions = true;
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { defaultExtension: 'js' },
        "@angular/core": {
            main: "bundles/core.umd.js" //use the ESM entry point for bundling tools
        },
        "@angular/common": {
            main: "bundles/common.umd.js" //use the ESM entry point for bundling tools
        },
        "@angular/compiler": {
            main: "bundles/compiler.umd.js" //use the ESM entry point for bundling tools
        },
        "@angular/forms": {
            main: "bundles/forms.umd.js"
        },
        "@angular/http": {
            main: "bundles/http.umd.js"
        },
        "@angular/platform-browser": {
            main: "bundles/platform-browser.umd.js" //use the ESM entry point for bundling tools
        },
        "@angular/platform-browser-dynamic": {
            main: "bundles/platform-browser-dynamic.umd.js" //use the ESM entry point for bundling tools
        },
        "@angular/router": {
            main: "bundles/router.umd.js" //use the ESM entry point for bundling tools
        }
    };
    var packageNames = [
        '@angular/testing',
        "@angular/upgrade",
        "angular2-in-memory-web-api",
        "rxjs",
        "zonejs"
    ];
    packageNames.forEach(function (pkgName) {
        if (pkgName !== "zonejs") {
            packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
        } else {
            packages[pkgName] = { main: 'zone.min.js', defaultExtension: 'js' };
        }
    });

    System.config({
        baseUrl: baseUrl,
        defaultJSExtensions: true,
        packages: packages,
        map: {
            '@angular': baseUrl + 'dist/lib/@angular',
            'rxjs': baseUrl + 'dist/lib/rxjs',
            'angular2-in-memory-web-api': baseUrl + 'dist/lib/angular2-in-memory-web-api',
            'zonejs': baseUrl + 'dist/lib/zone.js/dist',
            'text': baseUrl + 'dist/lib/systemjs-plugin-text/text.js'
        }
    });
})();