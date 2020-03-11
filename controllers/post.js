const Post = require('../models/post');

// 1st way
// const getPosts = (req, res) =>{
// 	res.send("Hello world from node js");
// }
// module.exports = {
// 	getPosts
// };



//2nd way
exports.getPosts = (req, res) => {
	//res.send("Hello world from node js");
	const post = Post.find()			//find all post
	.select("_id title body")
	.then(posts =>{
		res.json({posts})
	})
	.catch(err => console.log(err));
};

exports.createPost= (req, res)=>{
	const post = new Post(req.body);
	//console.log("Creating POST: ", req.body); 

	post.save()
	.then(result => {
		res.json({
			post: result
		});
	});
};