(function ($, fluid) {
    
    fluid.defaults("fluid.calculator", {
        gradeNames: ["autoInit", "fluid.rendererComponent"],
        selectors: {
            line1: ".flc-calc-line1",
            plus: ".flc-calc-plus",
            equals: ".flc-calc-equals"
        },
        events: {
            onAdd: null,
            onEquals: null
        },
        model: {},
        protoTree: {
            line1: "${line1}",
            plus: {
                messagekey: "calc-plus"
            },
            equals: {
                messagekey: "calc-equals"
            }
        },
        strings: {
            "calc-plus": "+",
            "calc-equals": "="
        },
        listeners: {},
        renderOnInit: true,
        preInitFunction: "fluid.calculator.preInit",
        postInitFunction: "fluid.calculator.postInit"
    });
    
    fluid.calculator.preInit = function (that) {
        that.options.listeners.onAdd = function () {
            that.applier.requestChange("result", that.locate("line1").val());
            that.applier.requestChange("operation", "plus");
        };
        that.options.listeners.onEquals = function () {
            var line1 = that.locate("line1"),
                newValue = line1.val(),
                newResult;
            if (that.model.operation === "plus") {
                newResult = parseInt(that.model.result) + parseInt(newValue);
                newResult = newResult.toString();
            }
            that.applier.requestChange("result", newResult);
            line1.val(newResult);
        };
    };
    
    fluid.calculator.postInit = function (that) {    
        that.locate("plus").click(that.events.onAdd.fire);
        that.locate("equals").click(that.events.onEquals.fire);
    };
    
})(jQuery, fluid);