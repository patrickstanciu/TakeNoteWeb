<?php

if ( isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) ){

    $to  = 'chris@takenotereviews.com';

    // subject
    $subject = '(1) New Lead - TakeNote Demo Request';

    // message
    $message = '
    <div style="font-size:15px;font-family:Helvetica, Arial;padding:15px;background-color:#f3f9ff;">
        <img src="https://takenotereviews.com/media/logo-takenote.png" style="width: 175px; height: 37px;" />
        <br /><br />
        <h1>You got a new Demo Request from '.$_POST['name'].'</h1>
        <br />
        <b>Name:</b> '.$_POST['name'].'<br />
        <b>Phone:</b> '.$_POST['phone'].'<br />
        <b>Email:</b> '.$_POST['email'].'
        <hr />
        takenotereviews.com
        <hr />
    </div>
    ';

    // To send HTML mail, the Content-type header must be set
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";

    // Additional headers
    $headers .= 'To: Chris Brown <chris@takenotereviews.com>' . "\r\n";
    $headers .= 'From: takenotereviews.com <webmaster@takenotereviews.com>' . "\r\n";


    // Mail it
    $mail = mail($to, $subject, $message, $headers);

    if ($mail){
        echo 'email-sent';
    }

}

?>