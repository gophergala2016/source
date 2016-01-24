'use strict';

var GulpConfig = (function () {
    function GulpConfig() {
        this.assets = 'assets';
        this.dest = 'client';
        this.typingsDir = this.assets + '/typings';
        this.typescriptsDir = this.assets + '/typescripts';

        this.outputFile = 'source';
        this.outputPCCSSDir = this.outputCSSDir + '/css/pc';
        this.outputSPCSSDir = this.outputCSSDir + '/css/sp';
        this.outputCSSDir = [this.outputPCCSSDir, this.outputSPCSSDir];

        this.outputAppScriptDir = this.dest +'/app';
        
        this.sassDir = this.assets + '/stylesheets/*.scss';

        this.allTypeScript = this.typescriptsDir + '/**/*.ts';
        this.allTsdFile = [this.mainTsdFile, this.tsdFiles]
        this.allLib = [
            'bower_components/traceur-runtime/traceur-runtime.js'
        ];

        this.libraryTypeScriptDefinitions = this.typingsDir + '/**/*.ts';
        this.appTypeScriptReferences = this.typingsDir + '/tsd.d.ts';
    }

    return GulpConfig;
})();

module.exports = GulpConfig;
