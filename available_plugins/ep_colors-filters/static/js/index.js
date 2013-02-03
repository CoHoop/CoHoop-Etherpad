var $, jQuery;

var $ = require('ep_etherpad-lite/static/js/rjquery').$;

// Bind the event handler to the toolbar buttons
exports.postAceInit = function(hook, context){
  var padBody = $('iframe[name="ace_outer"]').contents()
                .find('iframe[name="ace_inner"]').contents()
                .find('body#innerdocbody');

  $('#toggleAuthorshipColors a').on('click', function(){
    padBody.toggleClass('authorColors');
    console.log(padBody);
  });

  $('#clearAuthorship').hide().prev().hide();
};

exports.aceInitInnerdocbodyHead = function(hook, context) {
  var content = context.iframeHTML;
}