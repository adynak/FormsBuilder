<?php

$debug = false ;

if ($debug){
  $fp = fopen('test.txt','a+');
}

session_start();
$data = json_decode(file_get_contents("php://input"));


$dbSchema = $data->securityInfo->schema;
$dbPass   = $data->securityInfo->dbPass;

$conn_string = "host=127.0.0.1 port=5432 dbname=postgres user=postgres password=$dbPass";
$conn = pg_connect($conn_string);

if ($data->task == 'validate') {
  $debug = false;
  $myArray    = array();

  $sql  = "select row_to_json(t) ";
  $sql .= "from (";
  $sql .= "select * from $dbSchema.members where ";
  $sql .= "email='"      . $data->email    . "' and ";
  $sql .= "password = '" . $data->password . "'";
  $sql .= ") t";

  $result = pg_query($conn, $sql);
  $row_cnt = pg_num_rows($result);
  if ($row_cnt == 1) { 
    $member = json_decode(pg_fetch_row($result)[0]);
    $_SESSION["currentuser"] = $member->onlineid;

    $myArray['validated'] = 'success';
    $myArray['member']    = $member;

    echo json_encode($myArray);
  } else {
    echo 'The email or password you have entered is invalid.';
  }
}

else if ($data->task == 'getsessiondata') {
  $debug = false ;
    $myArray = array();
    if(isset($_SESSION["currentuser"]))
    {
      $sql = "SELECT * FROM $dbSchema.members where onlineID='" . $_SESSION["currentuser"] . "'";
      $result = pg_query($conn, $sql);
      if (!$result) {
        echo "Error: " . $sql . '<br>' ;
      } else {
        while ($row = pg_fetch_assoc($result)) {
          $myArray[] = $row;
        }
        if (sizeof($myArray) > 0) {
          $myArray['id'] = 'new';
        }
        echo json_encode($myArray);
      }
    } else {
      echo 'nosession';
    }    
}

else if ($data->task == 'getMemberInfo') {
    $myArray = array();
    if(isset($_SESSION["currentuser"]))
    {
      $sql = "SELECT * FROM $dbSchema.members where onlineID != '" . $_SESSION["currentuser"] . "'";
      $result = pg_query($conn, $sql);
      if (!$result) {
        echo "Error: " . $sql . '<br>' ;
      } else {
        while ($row = pg_fetch_assoc($result)) {
          $myArray[] = $row;
        }
        echo json_encode($myArray);
      }
    } else {
      echo 'nosession';
    }    
}

if ($debug) {
  fwrite($fp , 'task = ' . print_r($conn_string,1));
  fwrite($fp , "\n");
  fwrite($fp , print_r($data->securityInfo->schema,1));
  fwrite($fp , "\n");
  fwrite($fp , print_r($data->securityInfo->dbPass,1));
  fwrite($fp , "\n");

  fwrite($fp , 'sql = ' . $sql);
  fwrite($fp , "\n");
  // fwrite($fp , 'sequence = ' . print_r($sequence,1));
  // fwrite($fp , "\n");

  // fwrite($fp , 'session = ' . $_SESSION["currentuser"]);
  // fwrite($fp , "\n");
  // if (sizeof($myArray) > 0) {
  //   fwrite($fp , json_encode($myArray));
  //   fwrite($fp , "\n");
  // fwrite($fp , print_r($myArray,1));    // fwrite($fp , "\n");
  //   fwrite($fp , $myArray[0][max]);
  //   fwrite($fp , "\n");
  // }
  // fwrite($fp , "\n");
  // fwrite($fp , print_r($addMsg,1));

  $debug = false ;
}

?>