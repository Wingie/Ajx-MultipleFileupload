<?php 

if (move_uploaded_file($_FILES['myfile']['tmp_name'],'upload/' . $_FILES['myfile']['name'])) {
    $sFileName =  $_FILES['myfile']['name'];
    echo <<<EOF
<div class="s" id="{$sFileName}">
    <p>Your file: <a href='upload/{$sFileName}'  target='_blank'>{$sFileName}</a> has been successfully received.</p>
    <a href="javascript:deleteFile('{$sFileName}');" >Delete this file</p>
</div>
EOF;
} else {
    echo "ERROR-FILE-NOT-UPLOADED!";
}
?>
