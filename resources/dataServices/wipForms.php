<?php
  $pathToJsonForms = dirname(__DIR__) . '/wip';

  session_start();
  $data = json_decode(file_get_contents("php://input"));

  if ($data->action == 'read'){

  	$wipFile =  str_replace("pdf","wip",$data->formName);
  	$json_url = $pathToJsonForms . '/' .  $wipFile;
    
  	$json = file_get_contents($json_url);
  	echo($json);
  } 

  else if ($data->action == 'write'){

  	$wipFile =  str_replace("pdf","wip",$data->formName);
    $json_url = $pathToJsonForms . '/' .  $wipFile;

  	$fp = fopen($json_url, 'w+');
  	fwrite($fp , $data->jsonForm);
  	fclose($fp);

  }
?>