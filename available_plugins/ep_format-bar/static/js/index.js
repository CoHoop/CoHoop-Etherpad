var _, $, jQuery;

var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');
var cssFiles = ['ep_format-bar/static/css/format-text.css'];
var formatClasses = ['center', 'right', 'justify'];

// Here we collect attributes.
var collectContentPre = function(hook, context){
  var className = context.cls;
  var state = context.state;
  var lineAttributes = state.lineAttributes;
  var classIndex = _.indexOf(formatClasses, className);

  if(classIndex >= 0){
    lineAttributes['format'] = formatClasses[classIndex];
  }
};

var aceRegisterBlockElements = function(){
  return ['div'];
}

// Bind the event handler to the toolbar buttons
var postAceInit = function(hook, context){
  var fs = $('.format a');
  fs.each(function() {
    $(this).on('click', function() {
      var value = $(this).attr('data-format-class');
      var intValue = parseInt(value,10);
      if (!_.isNaN(intValue)) {
        context.ace.callWithAce(function(ace) {
          ace.ace_doInsertTextFormat(intValue);
        },'insertFormat' , true);
      }
    });
  });
};

// Our heading attribute will result in a heaading:h1... :h6 class
function aceAttribsToClasses(hook, context){
  if (context.key == 'format'){
    return ['format:'+ context.value];
  }
}

// Here we convert 
var aceDomLineProcessLineAttributes = function(name, context){
  var cls = context.cls;
  var domline = context.domline;
  var formatType = /(?:^| )format:([A-Za-z0-9]*)/.exec(cls);
  var classIndex;
  
  if (formatType) classIndex = _.indexOf(formatClasses, formatType[1]);
  
  if (classIndex !== undefined && classIndex >= 0){
    var className = formatClasses[classIndex];
    var modifier = {
      preHtml: '<div class="'+ className +'">',
      postHtml: '</div>',
      processedMarker: true
    };

    return [modifier];
  }

  return [];
};

// Find out which lines are selected and assign them the heading attribute.
// Passing a level >= 0 will set a heading on the selected lines, level < 0 
// will remove it
function doInsertTextFormat(level){
  var rep = this.rep;
  var documentAttributeManager = this.documentAttributeManager;
  if (!(rep.selStart && rep.selEnd) || (level >= 0 && formatClasses[level] === undefined))
  {
    return;
  }
  
  /*if (level){
    editorInfo.ace_toggleAttributeOnSelection('format', formatClasses[level]);
  }*/
  var firstLine, lastLine;
  
  firstLine = rep.selStart[0];
  lastLine = Math.max(firstLine, rep.selEnd[0] - ((rep.selEnd[1] === 0) ? 1 : 0));
  _(_.range(firstLine, lastLine + 2)).each(function(i){
    if (level >= 0){
      documentAttributeManager.setAttributeOnLine(i, 'format', formatClasses[level]);
    } else {
      documentAttributeManager.removeAttributeOnLine(i, 'format', formatClasses[level]);
    }
  });
}

// Once ace is initialized, we set ace_doInsertFormat and bind it to the context
function aceInitialized(hook, context){
  var editorInfo = context.editorInfo;
  editorInfo.ace_doInsertTextFormat = _(doInsertTextFormat).bind(context);
}

function aceEditorCSS(){
  return cssFiles;
};

// Export all hooks
exports.aceInitialized = aceInitialized;
exports.postAceInit = postAceInit;
exports.aceDomLineProcessLineAttributes = aceDomLineProcessLineAttributes;
exports.aceEditorCSS = aceEditorCSS;
exports.aceRegisterBlockElements = aceRegisterBlockElements;
exports.collectContentPre = collectContentPre;
exports.aceAttribsToClasses = aceAttribsToClasses;