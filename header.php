<?php
$title = isset($_GET['title'])?$_GET['title']:'Photography & Video Shooting';
$styles = isset($_GET['styles'])?$_GET['styles']:[];
?>
<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

        
    <?php
    foreach ($styles as $style) {
        $url = 'assets/css/';
        if(substr($style,0,2) == "//")
            $url = "";
        echo('<link rel="stylesheet" href="'.$url.$style.'">');
    }

    ?>
    <title>KD Hitesh | <?php echo $title;?></title>
</head>

<body>
