/* */ 
"format cjs";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Pipe } from '@angular/core';
import { InvalidPipeArgumentError } from './invalid_pipe_argument_error';
/**
 * @ngModule CommonModule
 * @whatItDoes Generic selector that displays the string that matches the current value.
 * @howToUse `expression | i18nSelect:mapping`
 * @description
 *
 *  Where `mapping` is an object that indicates the text that should be displayed
 *  for different values of the provided `expression`.
 *  If none of the keys of the mapping match the value of the `expression`, then the content
 *  of the `other` key is returned when present, otherwise an empty string is returned.
 *
 *  ## Example
 *
 * {@example common/pipes/ts/i18n_pipe.ts region='I18nSelectPipeComponent'}
 *
 *  @experimental
 */
export var I18nSelectPipe = (function () {
    function I18nSelectPipe() {
    }
    I18nSelectPipe.prototype.transform = function (value, mapping) {
        if (value == null)
            return '';
        if (typeof mapping !== 'object' || typeof value !== 'string') {
            throw new InvalidPipeArgumentError(I18nSelectPipe, mapping);
        }
        if (mapping.hasOwnProperty(value)) {
            return mapping[value];
        }
        if (mapping.hasOwnProperty('other')) {
            return mapping['other'];
        }
        return '';
    };
    I18nSelectPipe.decorators = [
        { type: Pipe, args: [{ name: 'i18nSelect', pure: true },] },
    ];
    /** @nocollapse */
    I18nSelectPipe.ctorParameters = [];
    return I18nSelectPipe;
}());
//# sourceMappingURL=i18n_select_pipe.js.map