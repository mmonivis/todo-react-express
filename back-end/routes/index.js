// EXPRESS SERVER

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'x',
	password: 'x',
	database: 'todo'
})

connection.connect();

function validateKey(key){
	console.log(key)
	return new Promise((resolve, reject)=>{
		connection.query('SELECT * FROM api_keys WHERE api_key="'+key+'"',(error,results)=>{
			console.log(results.length)
			if (error) throw error;
			if(results.length == 0){
				resolve(false);
			}else{
				resolve(true);
			}
		})	
	})
}

// Setup a route to handle React's first request
router.get('/getTasks', function(req, res, next) {
	var isKeyValid = validateKey(req.query.apiKey);
	isKeyValid.then((bool)=>{
		if(bool == true){
			connection.query('SELECT * FROM tasks', (error, results)=>{
				if (error) throw error;
				res.json(results);
			})
		}else{
			res.json({msg:"badKey"})
		}
	})
});

router.get('/getTask/:id', (req,res)=>{
	connection.query(`SELECT * FROM tasks WHERE id=${req.params.id}`,(error,results)=>{
		if (results.length == 0){
			res.json({msg: "No results"})
		}else{
			res.json(results[0])
		}
	})
});

router.post('/deleteTask', (req,res)=>{
	connection.query(`DELETE FROM tasks WHERE id=${req.body.taskId}`,(error,results)=>{
		if (error) throw error;
		res.json({msg: "Success!"});
	});
})

// addStudent route. Expects a name in the body, will add that name to the students table then respond with all students in that table
router.post('/addTask', (req, res)=>{
	var newTask = req.body.taskName;
	var newTaskDate = req.body.taskDate;
	connection.query('INSERT INTO tasks (taskName,taskDate) VALUES (?, ?)', [newTask,newTaskDate], (error, result)=>{
		if (error) throw error;
			connection.query('SELECT * FROM tasks', (error2, results2)=>{
				if (error2) throw error2;
				res.json(results2);
		});
	});
	// res.json({msg: "test"});
});

module.exports = router;
