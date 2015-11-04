/**
 * Created by baardl on 03.11.15.
 */
var httpclient = require('ringo/httpclient');
var content = [];
var pcc = [];
var ls = [];
exports.connect = function(username, password) {
    var url = 'https://api.ipify.org?format=json';
    var result = httpclient.get(url);
    content = JSON.parse(result.content);
    pcc = content;
    return content;
};

exports.ls = function() {
    var domains = [];
    Object.keys(ls).forEach(function(key) {
        //console.log(key, ls[key].id);
        domains.push(ls[key].name);
    });

    return domains;
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
            'x-custom-header': 'foobar'
        }
    });
    if(exchange.status == 200) {
        pcc = 'domains'; //exchange.content;
        ls = JSON.parse(exchange.content);
        //console.log("Ls" + ls);
        return "loged in ok";//ls;
    } else {
        console.error("Failed to list domains. Status: " + exchange.status);
    }
}

exports.do