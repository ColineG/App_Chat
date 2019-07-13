const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('ressources'));
const baseHtml ='<!DOCTYPE html>' +
'\n<html lang="fr">' +
'\n	<head>' +
'\n		<meta charset="UTF-8">' +
'\n		<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
'\n		<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
'\n		<title>Nouvel Utilisateur</title>' +
'\n		<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" media="all"/>' +
'\n	</head>' +
'\n	<body class="container">' +
'\n		<main>' +
'\n		</main>' +
'\n		<footer class="page-footer pt-4">' +
'\n			<p>©2019 Stem, Coline, Jocelin, Dimitri. Promotions Data/Web Nanterre.</p>' +
'\n		</footer>' +
'\n	</body>' +
'\n</html>';
var messagesArray = [];
app.get('/', (req, res) => {
	res.redirect(308, '/index.html');
});
app.post('/connect', (req, res) => {
	let login = 'ressources/' + req.body.login + '.json';
	let passWord = req.body.logMdp;
	if(fs.existsSync(login)) {
		console.log('Vous êtes connecté' + login);
		let popotam = JSON.parse(fs.readFileSync(login).toString('utf8'));
		if(passWord === popotam.mdp) {
			console.log('Vous êtes connecté');
		}
		else {
			console.log("Le mot de passe est éronné.");
		}
	}
	else {
		console.log("Ce login n'est pas pas enregistré sur le forum.");
	}
	res.redirect('/index.html');
});
app.post('/message', (req, res) => {
	let messagesFile = JSON.parse(fs.readFileSync('ressources/messages.json'));
	messagesFile.push(req.body.messagePost)
	fs.writeFileSync('ressources/messages.json', JSON.stringify(messagesFile, null, 2), "utf8");
	messagesArray.push(req.body.messagePost);
	console.log('Le message à bien été enregistré.')
	res.redirect('/index.html');
});
app.get('/messages.html', (req, res) => {
	let lesMail = '';
	messagesArray.forEach(function(mail){
		lesMail += '\n<p>' + mail + '</p>';
	});
	res.send('<!DOCTYPE html>' +
	'\n<html lang="en">' +
	'\n	<head>' +
	'\n		<meta charset="UTF-8">' +
	'\n		<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
	'\n		<meta http-equiv="X-UA-Compatible" content="ie=edge">' +
	'\n		<meta http-equiv="refresh" content="5;URL=/messages.html">' +
	'\n		<title>Document</title>' +
	'\n	</head>' +
	'\n	<body>' +
		lesMail +
	'\n	</body>' +
	'\n</html>');
});
app.get('/index.html', (req, res) => {
	let popotam = baseHtml;
	let connect = false;
	let supContent = '';
	if(!connect) {
		supContent = '\n		<header>' +
		'\n			<form action="/connect" method="post">' +
		'\n				<input type="submit" class="btn btn-primary" value="Se connecter">' +
		'\n				<input type="text" name="login" placeholder="Login">' +
		'\n				<input type="text" name="logMdp" placeholder="Mot de passe">' +
		'\n			</form>' +
		'\n			<form action="/pseudo" method="post">' +
		'\n				<input type="submit" value="S\'inscrire">' +
		'\n				<input type="text" id="idPseudo" name="pseudoTest" placeholder="mathieu59" value="alain59">' +
		'\n			</form>' +
		'\n		</header>';
	}
	let usersList = '\n		<aside>' +
		'\n		<ul>' +
		'\n			<li>Alain78</li>' +
		'\n			<li>Mathieu84</li>' +
		'\n			<li>Coline75</li>' +
		'\n			<li>Jocelin95</li>' +
		'\n			<li>Stem91</li>' +
		'\n			<li>Dimitri92</li>' +
		'\n		</ul>' +
		'\n		</aside>';
	popotam = popotam.toString('utf8');
	let uContent = '\n	<body class="container">' +
	supContent + 
	'\n		<main>' +
	'\n			<h1>Bienvenue</h1>' +
	'\n			<div>Bienvenue</div>' +
	'\n			<iframe src="/messages.html" width="100%" height="200px">' +
	'\n			</iframe>' +
	'\n			<form action="/message" method="post">' +
	'\n				<textarea name="messagePost" placeholder="Écrivez un message..."></textarea>' +
	'\n				<input type="submit" value="Envoyer">' +
	'\n			</form>' +
	'\n		</main>' + usersList;
	popotam = popotam.replace('<body class="container">', uContent);
	res.send(popotam);
});
app.post('/pseudo', (req, res) => {
	var check = ['alain95', 'alain96', 'alain97'];
	if(check.indexOf(req.body.pseudoTest) >= 0) {
		res.send('Ce pseudo est déjà utilisé par un autre alain');
	}
	else {
		res.redirect(308, '/newuser.html');
	}
});
app.post('/newuser.html', (req, res) => {
	if(req.body.pseudoTest) {
		var uName = "";
		var uLastName = "";
		var uPseudo = req.body.pseudoTest;
		var uMail = "";
		var uConfMail = "";
		var uMdp = "";
		var uConfMdp = "";
	}
	else {
		var uName = req.body.name;
		var uLastName = req.body.lastName;
		var uPseudo = req.body.pseudo;
		var uMail = req.body.mail;
		var uConfMail = req.body.confMail;
		var uMdp = req.body.mdp;
		var uConfMdp = req.body.confMdp;
	}
	let popotam = baseHtml;
	let uContent = '			<h1 class="h1 pt-4 pb-2">Création d\'un nouvel utilisateur</h1>' +
	'\n				<form action="/addUser" method="post">' +
	'\n				<fieldset class="form-group">' +
	'\n					<legend>Votre identité : </legend>' +
	'\n					<label for="idName" class="form-text">Votre prénom : </label><input type="text" class="form-control" id="idName" name="name" placeholder="Entrez votre prénom" value="'+ uName +'">' +
	'\n					<label for="idLastName" class="form-text">Votre nom : </label><input type="text" class="form-control" id="idLastName" name="lastName" placeholder="Entrez votre nom" value="'+ uLastName +'">' +
	'\n					<label for="idPseudo" class="form-text">Votre pseudo : </label><input type="text" class="form-control" id="idPseudo" name="RIpseudo" placeholder="Choisissez un pseudo" value="'+ uPseudo +'" disabled>' +
	'\n					<input type="hidden" name="pseudo" value="'+ uPseudo +'">' +
	'\n				</fieldset>' +
	'\n				<fieldset class="form-group">' +
	'\n					<legend>Vos indentifiants : </legend>' +
	'\n					<label for="idMail" class="form-text">Votre adresse mail : </label><input type="email" class="form-control" id="idMail" name="mail" placeholder="Entrez votre adresse mail" value="'+ uMail +'">' +
	'\n					<label for="idConfMail" class="form-text">Confirmation de votre adresse mail : </label><input type="email" class="form-control" id="idConfMail" name="confMail" placeholder="Confirmez votre adresse mail" value="'+ uConfMail +'">' +
	'\n					<label for="idMdp" class="form-text">Votre mot de passe : </label><input type="password" class="form-control" id="idMdp" name="mdp" placeholder="Entrez un mot de passe" value="'+ uMdp +'">' +
	'\n					<label for="idConfMdp" class="form-text">Confirmation du mot de passe : </label><input type="password" class="form-control" id="idConfMdp" name="confMdp" placeholder="Confirmez votre mot de passe" value="'+ uConfMdp +'">' +
	'\n				</fieldset>' +
	'\n				<input type="submit" class="btn btn-primary" value="Créer le compte">' +
	'\n			</form>' +
	'\n		</main>';
	popotam = popotam.replace('</main>', uContent);
	res.send(popotam);
});
app.post('/addUser', (req, res) => {
	var postValid = true;
	let uName = req.body.name;
	let uLastName = req.body.lastName;
	let uPseudo = req.body.pseudo;
	let uMail = req.body.mail;
	let uConfMail = req.body.confMail;
	let uMdp = req.body.mdp;
	let uConfMdp = req.body.confMdp;
	if(uMail !== uConfMail) {
		msgErr = 'Les adresses mail ne sont pas identiques.';
		postValid = false;
	}
	if(uMdp !== uConfMdp) {
		msgErr = 'Les mots de passe ne sont pas identiques.';
		postValid = false;
	}
	if(postValid === true)	{
		fs.writeFileSync('./ressources/' + uPseudo + '.json', JSON.stringify(req.body, null, 2));
		console.log("L'utilisateur à bien été enregistré.")
		res.redirect('/index.html');
	}
	else {
		console.log(msgErr);
		res.redirect(308, '/newuser.html');
	}
});
console.log('Serveur lancé');
app.listen(8080);