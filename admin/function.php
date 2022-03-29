<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "odnshop";

function connect(){
  $constr = "host=localhost port=5432 dbname=postgres user=postgres password=root";
    $conn = pg_connect($constr);
    if (!$conn) {
        die("Connection failed: " . pg_connect_error());
    }
    return $conn;
}

function Init($p){
$conn = connect();
$sql = "SELECT * FROM goods OFFSET '$p' ROWS FETCH NEXT 12 ROWS ONLY";
//echo $sql;
$result = pg_query($conn, $sql);



if (pg_num_rows($result) > 0) {
  $out = array();
  while($row = pg_fetch_assoc($result)){
    if ($row["Img"] === null OR $row["Img"] === ""){
      $row["Img"] = "Images\\Rectangle 8.svg";
    }
    array_push( $out, $row);
  }
  echo json_encode($out);
}else {
        echo "0";
    }
    pg_close($conn);
}

function LoadCart($cart){
  $conn = connect();
  $sql = "SELECT * FROM goods WHERE id IN (".implode(",", $cart).")";
  //echo $sql;
  $result = pg_query($conn, $sql);



  if (pg_num_rows($result) > 0) {
    $out = array();
    while($row = pg_fetch_assoc($result)){
      if ($row["Img"] === null OR $row["Img"] === ""){
        $row["Img"] = "Images\\Rectangle 8.svg";
      }
      array_push( $out, $row);
    }
    echo json_encode($out);
  }else {
          echo "0";
      }
      pg_close($conn);
}


 ?>
