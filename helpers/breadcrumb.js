exports.getNameList = function(rootline) {
    var list = [];
    if (rootline.success == true) {
        if ('undefined' !== typeof rootline.parent) {
            rootline.parent.forEach(function (parent) {
                list.push({
                    name: parent.name,
                    id: parent._id
                });
            });
        }
        list.push({
            name: rootline.directory.name,
            id: rootline.directory._id
        });
    } else {

    }
    return list;
};