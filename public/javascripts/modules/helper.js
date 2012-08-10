// Generated by CoffeeScript 1.3.3
(function() {

  define(["jquery", "underscore"], function($, _) {
    var helpers;
    helpers = {};
    helpers.fixName = function(name) {
      var field, firstLetter, ins, label, out, x, y, _i, _j, _len, _len1;
      ins = name.split(" ");
      field = "";
      label = "";
      for (_i = 0, _len = ins.length; _i < _len; _i++) {
        x = ins[_i];
        firstLetter = "";
        if (_i === 0) {
          field += x.toLowerCase();
          continue;
        } else {
          firstLetter += x.charAt(0).toUpperCase();
          field += firstLetter + x.substring(1);
        }
        field = $.trim(field);
      }
      for (_j = 0, _len1 = ins.length; _j < _len1; _j++) {
        y = ins[_j];
        firstLetter = y.charAt(0).toUpperCase();
        label += firstLetter + y.substring(1) + " ";
      }
      out = {
        label: $.trim(label),
        field: field
      };
      return out;
    };
    helpers.fixNames = function(fields) {
      var aField, output, _i, _len;
      output = [];
      for (_i = 0, _len = fields.length; _i < _len; _i++) {
        aField = fields[_i];
        output.push(this.fixName(aField));
      }
      return output;
    };
    return helpers;
  });

}).call(this);
