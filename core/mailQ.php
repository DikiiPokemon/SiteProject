<?php
$sum = $_POST['sum'];
$cart = $_POST['cart'];
$cartQ = $_POST['cartQ'];
 
$fromMail = "posyda2-ras@mail.ru";
$to = "snowflackssss@mail.ru";
$tema = "Форма обратной связи на PHP";
$headers =  'MIME-Version: 1.0' . "\r\n"; 
$headers .= 'From: Your name <info@address.com>' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; 

mail($to, $tema, $message, $headers, '-f'.$fromMail );
  if (mail($to, $tema, $message, $headers, '-f'.$fromMail )){
    echo "delivered";
  }else {
    echo "u r pidoor";
  }


?>