$(document).ready(function(){
    var list = JSON.parse(storage.getItem('list'));
    console.log(list);
});
var storage = getLocalStorage();
function getLocalStorage () {
    if (typeof localStorage == 'object') {
        return localStorage
    } else if (typeof globalStorage == 'object') {
        return globalStorage
    } else {
        throw new Error('Local storage not available.');
    }
}