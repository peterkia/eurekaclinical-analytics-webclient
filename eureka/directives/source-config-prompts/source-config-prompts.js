(function() {
    'use strict';

    angular
        .module('eureka')
        .directive('sourceConfigPrompts', ['$timeout', SourceConfigPrompts]);

    function SourceConfigPrompts($timeout) {
        return {
            restrict: 'AE',
            require: ['?ngModel', '^form'],
            link: function link(scope, elem, attrs, ngModel) {
                let fileSpace;
                let fileHeader;
                let myForm = ngModel[1];

                function getDomElements() {
                    $timeout(function() {
                        // Had to use timeout to make sure DOM is loaded
                        fileSpace = angular.element('div.drop')[0]; // Get element to highlight file border when validation is false
                        fileHeader = angular.element('div.drop')[0].parentElement.parentElement; // Get element to highlight file header when validation is false
                        setWatch()
                    }, 1000);
                }

                function setWatch() {
                    scope.$watch(function(myValue) {
                        if (myValue.vm.bindModel) {
                            if (myValue.vm.bindModel.length > 0) {
                                myValue.vm.inputField = 'True';
                                if (fileSpace.classList) {
                                    fileSpace.classList.remove('has-error');
                                    fileHeader.classList.remove('has-error');
                                }
                            } else if (myValue.vm.bindModel.length === 0 && myForm.submitted) {
                                myValue.vm.inputField = '';
                                if (fileSpace.classList) {
                                    fileSpace.classList.add('has-error');
                                    fileHeader.classList.add('has-error');
                                }
                            } else if (myValue.vm.bindModel.length === 0 && !myForm.submitted) {
                                myValue.vm.inputField = '';
                            }
                        }
                    });
                }

                getDomElements();
            },
            scope: {
                bindModel: '=ngModel',
                sourceConfig: '=',
                prompts: '=',
                fileUploadError: '&?',
                fileUploadSuccess: '&?'
            },
            bindToController: true,
            replace: false,
            templateUrl: 'eureka/directives/source-config-prompts/source-config-prompts.html',
            controller: 'SourceConfigPromptsCtrl',
            controllerAs: 'vm'
        };
    }
}());