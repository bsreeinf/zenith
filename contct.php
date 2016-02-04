<?php
	$timestamp_now = new DateTime();
	$data = "\n";
	$data .= "\nTimestamp: ".$timestamp_now->format("Y-m-d H:i:s");
	$data .= "\nName: ".$_REQUEST["name"];
	$data .= "\nEmail: ".$_REQUEST["email"];
	$data .= "\nSubject: ".$_REQUEST["subject"];
	$data .= "\nText: ".$_REQUEST["text"];
	$status = file_put_contents("contactus.txt",$data,FILE_APPEND);
?>