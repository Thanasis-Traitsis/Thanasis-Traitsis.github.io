<?php

  $name = $_POST['name'];
  $surname = $_POST['surname'];
  $visitor_email = $_POST['email'];
  $subject = $_POST['subject'];
  $message = $_POST['message'];

  $email_from = 'thanasistraitsis@gmail.com';

    $email_subject = "New Form submission:  $subject";

    $email_body = "You have received a new message from the user $name $surname. Here is the message:\n $message";

    $to = 'thanasistraitsis@gmail.com';

    $headers = "From: $visitor_email";

    if(mail($to,$email_subject,$email_body,$headers)){
      echo "Message accepted";
    }
    else{
      echo "Error";
    }
    
?>