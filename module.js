'use strict';

var app = angular.module('ngChat', ['socket-io']);

app.factory('socket', function(socketFactory) {
  var socket = io.connect('http://localhost:3000');
  return socketFactory({ ioSocket: socket });
});

app.controller('mainCtrl', function($scope, socket) {
  $scope.messages = [];

  socket.on('history', function(history) {
    $scope.messages = history;
  });
  socket.on('message', function(message) {
    $scope.messages.push(message);
  });

  $scope.sendMessage = function() {
    socket.emit('newMessage', $scope.message);
  };

});
