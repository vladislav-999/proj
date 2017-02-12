<?php
	session_start();
	$uploaddir = 'uploads/';

	$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);
	$_SESSION['document'] = $uploadfile;

	if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
		return view('index');
	} else {
		echo "error";
	}