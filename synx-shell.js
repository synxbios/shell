/**
 * Created by baardl on 03.11.15.
 */
var httpclient = require('ringo/httpclient');
var content = [];
var pcc = [];
exports.connect = function(username, password) {
    var url = 'https://api.ipify.org?format=json';
    var result = httpclient.get(url);
    content = JSON.parse(result.content);
    pcc = content;
    return content;
};

exports.ls = function() {
    return pcc.ip;
}