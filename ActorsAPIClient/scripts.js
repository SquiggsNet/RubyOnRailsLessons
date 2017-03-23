/**
 * Created by inet2005 on 3/23/17.
 */

(function(){

    //IIFE Code will go here
    var app = angular.module('actorsApp',['ngResource']);

    app.factory('Actor', function($resource){
        // return $resource('http://localhost:3000/actors/:actor_id');
        return $resource('http://localhost:3000/actors/:actor_id', null, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    });

    //my controller code
    app.controller('actorsController',function($scope, $http, $window, Actor){
        //hard-code actors array first
        // $scope.actors = [
        //     {actor_id: 1, first_name: 'Squiggs', last_name: 'Net'},
        //     {actor_id: 2, first_name: 'Scott', last_name: 'Rafael'}
        // ];

        //using http get
        // $http.get("http://localhost:3000/actors")
        //     .then(function(response) {
        //         $scope.actors = response.data;
        //     });

        // use the resource module to get actors

        $scope.actors = Actor.query();

        //use the resource to add an actor
        $scope.actor = new Actor();  //create new actor instance. Properties will be set via ng-model on UI

        $scope.addActor = function() { //create a new movie. Issues a POST to http://localhost:3000/actors
            $scope.actor.$save(function() {
                $window.location.href = ''; // redirect home
            });
        };

        //use the resource to delete an actor
        $scope.deleteActor = function(actor) { // Delete an actor. Issues a DELETE to http://localhost:3000/actors/:actor_id
            // actor.$delete(function() {
            //     $window.location.href = ''; //redirect to home
            // });
            Actor.delete({actor_id: actor.actor_id},function(){
                $window.location.href = ''; //redirect to home
            });
        };

        //use the resource to update an actor
        $scope.updateActor = function(actor) { // Update an actor. Issues a PUT to http://localhost:3000/actors/:actor_id
            var fName = document.getElementById("actorFirstName" + actor.actor_id).innerHTML;
            var lName = document.getElementById("actorLastName" + actor.actor_id).innerHTML;

            Actor.update({actor_id: actor.actor_id},{first_name: fName, last_name: lName},function(){
                $window.location.href = ''; //redirect to home
            });
        };
    });

})();