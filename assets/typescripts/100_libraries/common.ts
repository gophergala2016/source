
namespace source.libraries {

	export interface Config {
	    basePath: string;
	    ENVIRONMENT: string;
	    DEVICE: string;
	    VERSION: string;
	    GENDER: string;
	    FACEBOOK_APP_ID: string;
	}

	export interface Source {
		config: Config;
	}

}

declare var SOURCE: any;

// string
SOURCE.string = {};

SOURCE.string.countLengthByte = (str: string): number => {

	if(!str) return 0;

	var r = 0;
	for(var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		// Shift_JIS: 0x0  0x80, 0xa0 , 0xa1  0xdf , 0xfd  0xff
		// Unicode : 0x0  0x80, 0xf8f0, 0xff61  0xff9f, 0xf8f1  0xf8f3
		if( (c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
			r += 1;
		} else {
			r += 2;
		}
	}

	return r;
};

SOURCE.string.countLength = (str: string): number => {
	return SOURCE.string.countLengthByte(str) / 2;
};

// date
SOURCE.date = {};

SOURCE.date.groupByDate = (records: any, propertyName: string): any => {
	var results = [];
	for(var i = 0; i < records.length; i++) {
		var record = records[i];
		var dateStr = record[propertyName];
		var date = new Date(dateStr);
		var yyyy = date.getFullYear().toString();
		var mm   = (1 + date.getMonth()).toString();
		var dd   = date.getDate().toString();
		var key  = yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]); // padding

		var existsArrIdx = -1;
		for(var j = 0; j < results.length; j++) {
			if(key === results[j].key) {
				existsArrIdx = j;
				break;
			}
		}

		if(-1 === existsArrIdx) {
			results.push({key: key, records: [record]});
		} else {
			results[existsArrIdx].records.push(record);
		}
	}

	return results;
};

// collection
SOURCE.collection = {};

SOURCE.collection.masterDataOptions = (properties: any, withProperty: string = null): any => {

	var options = [];
	for(var i = 0; i < properties.length; i++) {

		var property = properties[i];
		if(property.id <= 0) {
			continue;
		}

		var option = {value: property.id, label: property.name};
		if(withProperty) {
			option[withProperty] = property[withProperty];
		}

		options.push(option);
	}

	return options;
};

SOURCE.existsFacebookNamespace = (): boolean => {
	return SOURCE.config.FACEBOOK_NAMESPACE && 0 < SOURCE.config.FACEBOOK_NAMESPACE.length;
}

SOURCE.anchorExists = (): boolean => {
	return SOURCE.utmJump.anchor.length && -1 === SOURCE.utmJump.anchor.indexOf('/');
}

SOURCE.moveAnchor = (): void => {
	var target = $(SOURCE.utmJump.anchor);
	if(0 < target.length) {
		$(window).scrollTop(target.offset().top);
	}

	SOURCE.utmJump.anchor = '';
}

// util
SOURCE.util = {};

SOURCE.util.createUrl = (path: string): string => {
    return location.protocol+'//'+location.host+ path;
};

SOURCE.util.convertToUtcString = (_base: string, add: any = {}) => {
	// calculate utc time from local time
	var base = new Date(_base);

	if (add.day) {
		base.setDate(base.getDate() + add.day); // + n Day
	}
	if (add.sec) {
		base.setSeconds(base.getSeconds() + add.sec); // + n Sec
	}

	// make UTC string
	var yyyy = base.getUTCFullYear();
	var MM   = ('0' + (base.getUTCMonth() + 1)).slice(-2);
	var dd   = ('0' + base.getUTCDate()).slice(-2);
	var HH   = ('0' + base.getUTCHours()).slice(-2);
	var mm   = ('0' + base.getUTCMinutes()).slice(-2);
	var ss   = ('0' + base.getUTCSeconds()).slice(-2);

	return yyyy + '-' + MM + '-' + dd + 'T' + HH + ':' + mm + ':' + ss + 'Z';
};

SOURCE.util.dateDiff = (_start: string = '', _end: string = '', state: string = 'day'): number => {
	var start = (_start !== '') ? new Date(_start) : new Date();
	var end   = (_end !== '')   ? new Date(_end)   : new Date();

	var msDiff = end.getTime() - start.getTime(); // 

	if ('sec' === state) {
		return Math.floor(msDiff / 1000); // return seconds

	} else if ('min' === state) {
		return Math.floor(msDiff / (1000 * 60)); // return minutes

	} else if ('hour' === state) {
		return Math.floor(msDiff / (1000 * 60 * 60)); // return hours

	} else if ('day' === state) {
		return Math.floor(msDiff / (1000 * 60 * 60 * 24)); // return days

	} else if ('year' === state) {
		return Math.floor(msDiff / (1000 * 60 * 60 * 24 * 12)); // return years

	}
	return Math.floor(msDiff / (1000 * 60 * 60 * 24)); // return days
};

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        })
    });
}
