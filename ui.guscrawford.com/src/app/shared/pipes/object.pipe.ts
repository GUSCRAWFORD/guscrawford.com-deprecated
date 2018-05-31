import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    pure:true,
    name:'kvp'
})
export class KvpPipe implements PipeTransform {
    transform(obj) {
        return Object.keys(obj).map(k=>{return {key:k,value:obj[k]}});
    }
}

@Pipe({
    pure:true,
    name:'stringify'
})
export class StringifyPipe implements PipeTransform {
    transform(obj, customSpacer?:string) {
        return JSON.stringify(obj, null, customSpacer) ;
    }
}

@Pipe({
    pure:true,
    name:'$top'
})
export class TopPipe implements PipeTransform {
    transform(list:any[], top) {
        return list.slice(0, top);
    }
}
@Pipe({
    pure:true,
    name:'$skip'
})
export class SkipPipe implements PipeTransform {
    transform(list:any[], skip) {
        return list.slice(skip);
    }
}
@Pipe({
    pure:true,
    name:'$orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(list:any[], order) {
        return list.sort();
    }
}
export const FILTER_PIPE_NOT_SET = new Object();
@Pipe({
    pure:true,
    name:'$filter'
})
export class FilterPipe implements PipeTransform {

    transform(list:any[], filter) {
        return list.filter(item=>{
            var filterKeys = Object.keys(filter);
            for (var i = 0; i < filterKeys.length; i ++) {
                var filterKey = filterKeys[i], propertyFilter = filter[filterKey];
                if (typeof propertyFilter === 'string')
                    propertyFilter = {eq:propertyFilter};
                var operation = Object.keys(propertyFilter)[0], operator = operation, regexOptions, inverse = false;
                if (operator === 'options' || operator === 'regexp') {
                    regexOptions = propertyFilter.options;
                    operator = 'regexp';
                }
                if (operator.charAt(0) === '!') {
                    operator = operator.substr(1).trim();
                    inverse = true;
                }
                if (!(typeof FilterPipe[operator] === 'function'))
                    throw new Error("FilterPipe: unexected operator '"+operator+"'");
                if(filter[filterKey]!==FILTER_PIPE_NOT_SET) {
                    var result = FilterPipe[operator](FilterPipe.deref(item, filterKey.split('.')), propertyFilter[operation]);
                    return (!result) === inverse;
                }
            }
            return true;
        })
    }
    static deref(data, properties) {
        var value = data[properties[0]];
        if (properties.length > 1)
            return FilterPipe.deref(value, properties.slice(1));
        else return value; 
    }
    static lt(a,b) { return a < b; }
    static lte(a,b) { return a <= b; }
    static gt(a,b) { return a > b; }
    static gte(a,b) { return a >= b; }
    static regexp(source, pattern) {
        if (!(pattern instanceof RegExp))
            pattern = new RegExp(pattern);
        console.log(pattern)
        return source.match(pattern);
    }
    static eq(a,b, options:FilterPipeEqualityOptions = null) {
        options = FilterPipeEqualityOptions.default(options);
        if (FilterPipe.typeIsComplex(a) ||  FilterPipe.typeIsComplex(b)) {
            var typeofA = typeof a, typeofB = typeof b,
                aIsArray = a instanceof Array, bIsArray = b instanceof Array;
            if (typeofA !== typeofB && aIsArray !== bIsArray) return false;
            if (!aIsArray) {
                if (options.objectEquality === FilterPipeObjectEqualityOptions.ReferenceMatch
                    && a !== b) return false;
                var aKeys = Object.keys(a), bKeys = Object.keys(b), keySet = aKeys.length>=bKeys.length?aKeys:bKeys;
                if (options.objectEquality===FilterPipeObjectEqualityOptions.FullKeyMatch && aKeys.length !== bKeys.length) return false;
                for (var keyIndex = 0; keyIndex < keySet.length; keyIndex++) {
                    var key = keySet[keyIndex];
                    if (!FilterPipe.undefined(a[key]) && !FilterPipe.undefined(b[key])) {
                        if (!FilterPipe.eq(a,b, options)) return false;
                    }
                }
            }
            else {
                if (a !== b && options.arrayEquality === FilterPipeArrayEqualityOptions.ReferenceMatch)
                    return false;
                if (a.length !== b.length && options.arrayEquality === FilterPipeArrayEqualityOptions.FullIndexMatch)
                    return false;
                var set : any[] = a.length >= b.length?a:b, other : any[] = set === a?b:a;
                for (var i = 0; i < set.length; i ++) {
                    if (options.arrayEquality === FilterPipeArrayEqualityOptions.AnyOrderNoConflict
                        && FilterPipe.undefined(other.find(o=>FilterPipe.eq(set[i],o))))
                     return false;
                    else if (!FilterPipe.undefined(set[i]) && !FilterPipe.undefined(other[i])
                        && !FilterPipe.eq(set[i],other[i]))
                        return false;
                }
            }
        }
        if (options.compare === FilterPipeCompareOptions.Coerce)
            return a == b;
        else if (options.compare === FilterPipeCompareOptions.NoCoercion)
            return a === b;
    }
    static typeIsComplex(t) { return t instanceof Array || t instanceof Object}
    static undefined(t) { return typeof t === 'undefined' }
}
export class FilterPipeEqualityOptions {
    static default(options:FilterPipeEqualityOptions) {
        var x = new FilterPipeEqualityOptions();
        if (options)
            Object.keys(options).forEach(k=>{
                x[k] = options[k];
            });
        return x;
    }
    objectEquality?:FilterPipeObjectEqualityOptions = FilterPipeObjectEqualityOptions.NoConflict;
    compare?:FilterPipeCompareOptions = FilterPipeCompareOptions.Coerce;
    arrayEquality?:FilterPipeArrayEqualityOptions = FilterPipeArrayEqualityOptions.AnyOrderNoConflict;
}
enum FilterPipeObjectEqualityOptions {
    NoConflict,
    FullKeyMatch,
    ReferenceMatch
}
enum FilterPipeCompareOptions {
    Coerce,
    NoCoercion = 1
}
enum FilterPipeArrayEqualityOptions {
    AnyOrderNoConflict,
    NoConflict,
    FullIndexMatch,
    ReferenceMatch
}