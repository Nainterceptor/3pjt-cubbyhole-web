module.exports = function(swig) {
    return function(req,res,next){
        swig.setDefaults({
            locals: {
                tokenExist: function(){return req.cookies.token},
                getFlash: function(){
                    if (!req.session.flashBag){
                        req.session.flashBag = {};
                    }
                    if (req.session.flashBag.error){
                        return "<div class=\"alert alert-danger fade in\"><button type=\"button\" class=\"close\"" +
                            " data-dismiss=\"alert\" aria-hidden=\"true\">×</button><strong>Error! </strong>"
                            +req.session.flashBag.error+"</div>"}
                    else {
                        return false;
                    }
                    ;},
                clearFlashError: function() {
                    if (req.session.flashBag.error) {
                        req.session.flashBag.error = null;
                    }
                }
            }, cache: false});
        if (!req.session.lastPage || req.url =='/'){
            req.session.lastPage = req.url;
        }
        next();
    };
};