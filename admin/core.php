<?php

$action = $_GET["action"];
$p = $_GET["p"];
//$cart = $_GET["cart"];
//$id = $_GET["id"];
//print_r($cart);
// $str = explode(",", $cart);
// print_r($str);
//echo $na0. $na1;
require_once 'C:\WebServers\home\localhost\www\SitePHP\admin\function.php';

switch ($action) {
  case 'Init':
    Init($p);
    break;
  case 'LoadCart':
    LoadCart($cart);
    break;

}

 ?>
