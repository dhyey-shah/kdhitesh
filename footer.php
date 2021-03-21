<?php
    $scripts = isset($_GET['scripts'])?$_GET['scripts']:[];
?>
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>

    <!-- Velocity JS -->
    <script src="//cdn.jsdelivr.net/npm/velocity-animate@2.0/velocity.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/velocity/2.0.6/velocity.min.js"></script>

    <?php

    foreach ($scripts as $script) {
        $url = "assets/js/";
        if(substr($script,0,2) == "//")
            $url = "";
        echo('<script src="'.$url.$script.'"></script>');
    }

    ?>
</body>

</html>