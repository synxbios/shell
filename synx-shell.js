/**
 * Created by baardl on 03.11.15.
 */
var httpclient = require('ringo/httpclient');
var content = [];
//var pwc = [];
var context = [];
context.type = 'Unauthorized';
var ls = [];
exports.connect = function(username, password) {
    var url = 'https://api.ipify.org?format=json';
    var result = httpclient.get(url);
    content = JSON.parse(result.content);
    //pwc = content;
    return content;
};

var domains = [];
var serviceNames = [];
var credentials = [{'username':'',
    'password':'',
    'userTokenId':''}];

function updateDomainIds(element, index, array) {
  console.log('a[' + index + '] = ' + element.domainId);
  domains.push(element.domainId);
}

function updateServiceNames(element, index, array) {
    console.log('a[' + index + '] = ' + element.name);
    serviceNames.push(element.name);
}

function listServices(domain){
    console.log('List services. Domain: ' + domain + ', username: ' + credentials.username);
    var {request} = require('ringo/httpclient');
    var exchange = request({
        method: 'GET',
        contentType: "application/json",
        data: "application/json",
        url: 'http://localhost:8020/domainconfig/domains/' + domain + '/services',
        username: credentials.username,
        password: credentials.password,
        headers: {
            'x-custom-header': 'foobar',
            'Accept': 'application/json'
        }
    });
    if(exchange.status == 200) {
        //pwc = 'domains'; //exchange.content;
        console.log("Content: " + exchange.content);
        ls = JSON.parse(exchange.content);
        serviceNames = [];
        ls.forEach(updateServiceNames);
        console.log("serviceNames: " + serviceNames);
        return serviceNames;
    } else {
        console.error("Failed to list domains. Status: " + exchange.status);
    }

}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}



exports.login = function(username, password) {
    credentials.username = username;
    credentials.password = password;
    var {request} = require('ringo/httpclient');
    var exchange = request({
        method: 'GET',
        contentType: "application/json",
        data: "application/json",
        url: 'http://localhost:8020/domainconfig/domains',
        username: credentials.username,
        password: credentials.password,
        headers: {
            'x-custom-header': 'foobar',
            'Accept': 'application/json'
        }
    });
    if(exchange.status == 200) {
        //pwc = 'domains'; //exchange.content;
        console.log("Content: " + exchange.content);
        ls = JSON.parse(exchange.content);
        domains = [];
        ls.forEach(updateDomainIds);
        console.log("domains: " + domains);
        context.type = "home";
        context.name = "home";
        return exports.pwc();
    } else {
        console.error("Failed to list domains. Status: " + exchange.status);
    }
}

exports.ls = function() {
    console.log("Ls. Context type: " + context.type);
    if (context.type == "home") {

       // var domains = [];
       // Object.keys(ls).forEach(function(key) {
       //     //console.log(key, ls[key].id);
       //     domains.push(ls[key].name);
       // });

        return domains;
    } else if (context.type == "domain") {
        console.log("List services.");
        listServices(context.name);
        return serviceNames;
    } else if (context.type == "service") {
        console.log("List items.");
    }
}

exports.cat = function(serviceName) {
    return "TODO";
}

/*
@deprecated
*/
exports.use = function(name) {
    exports.cc(name);
}

exports.cc = function(name) {
    console.log("context " + context.type);
    if (context.type == "home") {
        console.log("is home");
        context.type = "domain";
        context.name = name;
    } else if (context.type == "domain") {
        console.log("is domain");
        var domainId = context.name;
        if (contains(serviceNames,name)) {
            context.type = "service";
            context.name = domainId + "/" + name;
        } else {
            return exports.pwc() + " Service [" + name +"] is not found in domain ["+ domainId+"]";
        }
    }
    return exports.pwc();
}

/*
@deprecated
*/
exports.pcc = function() {
    return "/" +context.name;
}
exports.pwc = function() {
    return "/" +context.name;
}

exports.setHome = function() {
    context.type = "home";
    context.name = "";
}