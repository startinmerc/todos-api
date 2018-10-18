var express = require("express"),
    app = express(),
    todoRoutes = require("./routes/todos"),
    bodyParser = require("body-parser");
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/todos', todoRoutes);

app.get("/", function(req,res){
    res.send("Root Route");
});

app.listen(process.env.PORT, function(){
    console.log("Server Started");
});