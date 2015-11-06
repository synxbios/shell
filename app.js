
var jsontext = '[{"id":1,"domainId":"altran","name":"altranName","description":""},{"id":2,"domainId":"osl","name":"OsloAirport","description":""},{"id":3,"domainId":"paal","name":"Paal","description":""},{"id":4,"domainId":"bli","name":"BardLind","description":""},{"id":5,"domainId":"demo.synxbios.com","name":"SynxDemo","description":""}]';
var domains = [];
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element.domainId);
  domains.push(element.domainId);
}
var ls = JSON.parse(jsontext);
ls.forEach(logArrayElements);

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

var hasDomain = contains(domains,'altraN');
console.log("domains has domain:" + domains);
		