/*global $*/

$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    });
    
    $("#todoInput").keypress(function(event){
        if(event.which === 13){
            createTodo();
        }
    });
    
    $(".list").on("click", "span", function(e){
        // stops event bubbling from parent element
        e.stopPropagation();
        removeTodo($(this).parent());
    });
    
    $(".list").on("click", "li", function(){
        updateTodo($(this));
    });
});

function addTodos(todos) {
    // add todos to page
    todos.forEach(function(todo){
        addToDo(todo);
    });
}

function addToDo(todo){
    var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

function createTodo(){
    var userInput = $("#todoInput").val();
    $.post("/api/todos",{name: userInput})
    .then(function(newTodo){
        $("#todoInput").val("");
        addToDo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    });
}

function removeTodo(todo){
    var clickedId = todo.data("id"),
        deleteUrl = '/api/todos/' + clickedId;
    todo.remove();
    $.ajax({
        method: "DELETE",
        url: deleteUrl
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err){
        console.log(err);
    });
}

function updateTodo(todo){
    var updateURL = "/api/todos/" + todo.data("id"),
        isDone = !todo.data("completed"),
        updateData = {completed: isDone};
    $.ajax({
        method: "PUT",
        url: updateURL,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data("completed", isDone);
    });
}