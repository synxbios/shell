/**
 * Created by baardl on 03.11.15.
 */
var httpclient = require('ringo/httpclient');
var content = [];
var pcc = [];
var context = [];
context.type = 'Unauthorized';
var ls = [];
exports.connect = function(username, password) {
    var url = 'https://api.ipify.org?format=json';
    var result = httpclient.get(url);
    content = JSON.parse(result.content);
    pcc = content;
    return content;
};

var domains = [];
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element.domainId);
  domains.push(element.domainId);
}



exports.login = function(username, password) {
    var {request} = require('ringo/httpclient');
    var exchange = request({
        method: 'GET',
        contentType: "application/json",
        data: "application/json",
        url: 'http://localhost:8020/domainconfig/domains',
        username: username,
        password: password,
        headers: {
            'x-custom-header': 'foobar',
            'Accept': 'application/json'
        }
    });
    if(exchange.status == 200) {
        pcc = 'domains'; //exchange.content;
        console.log("Content: " + exchange.content);
        ls = JSON.parse(exchange.content);
        ls.forEach(logArrayElements);
        console.log("domains: " + domains);
        context.type = "home";
        context.name = "home";
        return exports.pcc();
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
    } else if (context.type = "domain") {

    }
}


exports.use = function(name) {
    console.log("context " + context.type);
    if (context.type == "home") {
        console.log("is home");
        pcc.type = "domain";
        pcc.name = name;
    }
    return "- " +pcc.type + " : " + pcc.name ;
}

exports.pcc = function() {
    return "/" +context.name;
}

exports.setHome = function() {
    context.type = "home";
    context.name = "";
}