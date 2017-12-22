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

else if ($data->task == 'register') {
    $debug = false;
    $pword_type = 0 ;
    $member_type = 0 ;
    $sql = "select count(*) from $dbSchema.members where email='" . $data->userInfo->email . "' or onlineid = '" . $data->userInfo->onlineid . "'";
    $result = pg_query($conn, $sql);
    $row_cnt = pg_fetch_row($result);

    if ($row_cnt[0] >= 1) {
        echo 'onlineID or email already exists';
    } else {
        $sql  = "insert into $dbSchema.members (";
        $sql .= "onlineid, ";
        $sql .= "name_first, ";
        $sql .= "name_last, ";
        if (!is_null($data->userInfo->name_business)){
          $sql .= "name_business, ";
        }
        if (!is_null($data->userInfo->occupation)){
          $sql .= "occupation, ";
        }
        $sql .= "email, ";
        $sql .= "phone_main, ";
        if (!is_null($data->userInfo->phone_secondary)){
          $sql .= "phone_secondary, ";
        }
        if (!is_null($data->userInfo->comments)){
          $sql .= "comments, ";
        }
        $sql .= "password,";
        $sql .= "pword_type,";
        $sql .= "member_type) values ('";

        $sql .= $data->userInfo->onlineid          . "', '";
        $sql .= $data->userInfo->name_first        . "', '";        
        $sql .= $data->userInfo->name_last         . "', '";
        if (!is_null($data->userInfo->name_business)){        
          $sql .= $data->userInfo->name_business     . "', '";
        }
        if (!is_null($data->userInfo->occupation)){
          $sql .= $data->userInfo->occupation      . "', '";
        }
        $sql .= $data->userInfo->email             . "', '";
        $sql .= $data->userInfo->phone_main        . "', '";
        if (!is_null($data->userInfo->phone_secondary)){
          $sql .= $data->userInfo->phone_secondary . "', '";
        }
        if (!is_null($data->userInfo->comments)){
          $sql .= $data->userInfo->comments        . "', '";
        }
        $sql .= $data->userInfo->password          . "', '";
        $sql .= $pword_type                        . "', '";
        $sql .= $member_type                       . "'); ";

        // $result = pg_query($conn, $sql);
        if (1) {
          echo "Error: " . $sql . "<br>" ;
        } else {
          echo 'success';
        }            
    }
}

else if ($data->task == 'logout') {    
    unset($_SESSION['currentuser']);
    if(!isset($_SESSION['currentuser'])){
        echo 'success';
    } else {
        echo 'failed to destroy session';
    }
}


else if ($data->task == 'updateuser') {
// use !is_null() to avoid inserting null strings into members for non-required fields
  $debug = false;
    if(isset($_SESSION["currentuser"]))
    {
        $sql = "select count(*) from $dbSchema.members where email !='" . $data->email . "' and onlineid = '" . $data->username . "'";

        $result = pg_query($conn, $sql);
        $row_cnt = pg_fetch_row($result);

        if ($row_cnt[0] == 1) { 
          echo ('usernameexists');
        } else {
          $sql  = "update $dbSchema.members set ";
          $sql .= "name_first = '"      . $data->userInfo->name_first      . "', ";
          $sql .= "name_last = '"       . $data->userInfo->name_last       . "', ";
          $sql .= "name_business = '"   . $data->userInfo->name_business   . "', ";
          if (!is_null($data->userInfo->occupation)){
            $sql .= "occupation = '"      . $data->userInfo->occupation      . "', ";
          }
          $sql .= "email = '"           . $data->userInfo->email           . "', ";
          $sql .= "phone_main = '"      . $data->userInfo->phone_main      . "', ";
          if (!is_null($data->userInfo->phone_secondary)){
            $sql .= "phone_secondary = '" . $data->userInfo->phone_secondary . "', ";
          }
          if (!is_null($data->userInfo->comments)){
            $sql .= "comments = '"        . $data->userInfo->comments        . "', ";
          }
          $sql .= "password = '"        . $data->userInfo->password        . "'  ";
          $sql .= "where id ='"         . $data->userInfo->id              . "'; ";
          $result = pg_query($conn, $sql);
          if (!$result) {
            echo "Error: " . $sql . "<br>" ;
          } else {
            echo 'success';
          }            
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