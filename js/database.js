'use strict';

var Database = function () {
  this.data = {};
};
Database.prototype.setItem = function(key,val) {
  if (typeof val !== 'string') {return; }
}
;