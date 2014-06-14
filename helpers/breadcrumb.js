exports.getNameList = function(rootline) {
    var list = [];
    rootline.parent.forEach(function(parent) {
        list.push({
            name: parent.name,
            id: parent._id
        });
    });
    list.push({
        name: rootline.directory.name,
        id: rootline.directory._id
    });
    return list;
};