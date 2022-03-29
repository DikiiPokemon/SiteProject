<?php

$action = $_GET["action"];
$cart = $_GET["cart"];
//$id = $_GET["id"];
//print_r($cart);
// $str = explode(",", $cart);
// print_r($str);
//echo $na0. $na1;
require_once 'C:\WebServers\home\localhost\www\SitePHP\admin\function.php';

switch ($action) {
  case 'LoadCart':
    LoadCart($cart);
    break;

}

 ?>