/*global jqUnit, jQuery, fluid, start, stop, ok, expect*/
"use strict";

var calcTester = function ($) { 
    
    var termListTest = new jqUnit.TestCase("Calc Tests");
    
    termListTest.test("Calc exists", function () {
        var calculator = fluid.calculator(".flc-calc");
        jqUnit.assertValue("It exists!", calculator);
    });
    
    termListTest.test("Type in a number", function () {
        var calculator = fluid.calculator(".flc-calc");
        var line1 = calculator.locate("line1");
        line1.val("123").change();
        jqUnit.assertEquals("Line 1 contains", "123", calculator.model.line1);
    });
    
    termListTest.test("Buttons", function () {
        var calculator = fluid.calculator(".flc-calc");
        jqUnit.assertEquals("Plus button text should be ", "+", calculator.locate("plus").val()); 
        jqUnit.assertEquals("Equals button text should be ", "=", calculator.locate("equals").val()); 
    });
    
    termListTest.test("Addition", function () {
        var calculator = fluid.calculator(".flc-calc");
        var line1 = calculator.locate("line1");
        line1.val("123").change();
        
        jqUnit.assertFalse("Nothing in the result just yet", calculator.model.result);
        
        calculator.locate("plus").click();
        
        jqUnit.assertEquals("Result should be", "123", calculator.model.result);
        jqUnit.assertEquals("Operation should be", "plus", calculator.model.operation);
        
        line1.val("122").change();
        
        jqUnit.assertEquals("Result should be", "123", calculator.model.result);
        jqUnit.assertEquals("Operation should be", "plus", calculator.model.operation);
        
        calculator.locate("equals").click();
        jqUnit.assertEquals("Result should be", "245", calculator.model.result);
        jqUnit.assertEquals("Operation should be", "plus", calculator.model.operation);
        jqUnit.assertEquals("Addition result must be ", "245", line1.val()); 
    });
};

(function () {
    calcTester(jQuery);
}());