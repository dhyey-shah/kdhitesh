<?php
    $styles = [
        //  "bootstrap.min.css",
        "font-awesome.min.css",
        "et-line.css",
        "ionicons.min.css",
        "slick.css" ,
        "magnific-popup.css",
        "animate.min.css",
        "index.css",
        "custom-index.css",
    ];

    $scripts = [
        "jquery.min.js",
        "waypoints.min.js",
        "slick.min.js",
        "imgloaded.js",
        "isotope.js",
        "jquery.magnific-popup.min.js",
        "jquery.counterup.min.js",
        "wow.min.js",
        "//cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.js",
        "index.js",
        "custom-index.js"
    ];

    $_GET["title"] = "Gallery";
    $_GET["styles"] = $styles;
    $_GET["scripts"] = $scripts;

    include("../header.php");

    $directories = glob("assets/img/img/*", GLOB_ONLYDIR);
    $categories = [];
    $images = [];
    foreach ($directories as $directory) {
        $temp = glob($directory . "/*.{jpg,jpeg,png}", GLOB_BRACE,);
        $category = basename(parse_url($directory, PHP_URL_PATH));
        array_push($categories, $category);
        foreach ($temp as $img){
            array_push($images, [$img, $category]);
        }
    }
    shuffle($images);
?>

<div class="loader">
    <div class="loader-outter"></div>
    <div class="loader-inner"></div>
</div>

<div class="body-overlay"></div>

<div class="body-container container-fluid">
    <a class="menu-btn" href="javascript:void(0)">
        <i class="ion ion-grid"></i>
    </a>
    <div class="row justify-content-center">
        <!--=================== side menu ====================-->
        <div class="col-lg-2 col-md-3 col-12 menu_block">

            <!--logo -->
            <div class="logo_box">
                <a href="../">
                    <img class="img-fluid" width="100" src="assets/img/logo.png" alt="cocoon">
                </a>
            </div>
            <!--logo end-->

            <!--filter menu -->
            <div class="side_menu_section">
                <h4 class="side_title">filter by:</h4>
                <ul  id="filtr-container"  class="filter_nav">
                    <li  data-filter="*" class="active"><a href="javascript:void(0)" >All</a></li>
                    <?php
                        foreach($categories as $category){
                            echo '<li data-filter=".'.str_replace(' ', '-', $category).'"> <a href="javascript:void(0)">'.$category.'</a></li>';
                        }
                    ?>
                    <!-- <li  data-filter="*" class="active"><a href="javascript:void(0)" >all</a></li>
                    <li data-filter=".branding"> <a href="javascript:void(0)">branding</a></li>
                    <li data-filter=".design"><a href="javascript:void(0)">design</a></li>
                    <li data-filter=".photography"><a href="javascript:void(0)">photography</a></li>
                    <li data-filter=".architecture"><a href="javascript:void(0)">architecture</a></li> -->
                </ul>
            </div>
            <!--filter menu end -->

            <!--social and copyright -->
            <div class="side_menu_bottom">
                <div class="side_menu_bottom_inner">
                    <ul class="social_menu">
                        <li>
                            <a href="#"> <i class="ion ion-social-pinterest"></i> </a>
                        </li>
                        <li>
                            <a href="#"> <i class="ion ion-social-facebook"></i> </a>
                        </li>
                        <li>
                            <a href="#"> <i class="ion ion-social-twitter"></i> </a>
                        </li>
                        <li>
                            <a href="#"> <i class="ion ion-social-dribbble"></i> </a>
                        </li>
                    </ul>
                    <div class="copy_right">
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                        <p class="copyright">Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                    </div>
                </div>
            </div>
            <!--social and copyright end -->

        </div>
        <!--=================== side menu end====================-->

<!-- ORIGINAL Example -->
<!-- <div class="grid-item  branding architecture  col-sm-12 col-md-6">
                            <a href="assets/img/img/KD--14.jpg" title="project name 2">
                                <div class="project_box_one">
                                    <img src="assets/img/img/KD--14.jpg" alt="pro1" />
                                    <div class="product_info">
                                        <div class="product_info_text">
                                            <div class="product_info_text_inner">
                                                <i class="ion ion-plus"></i>
                                                <h4>project name</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div> -->
<!-- // ORIGINAL Example -->

        <!--=================== content body ====================-->
        <div class="col-lg-10 col-md-9 col-12 body_block  align-content-center">
            <div class="portfolio">
                <div class="container-fluid">
                    <!--=================== masaonry portfolio start====================-->
                    <div class="grid img-container justify-content-center no-gutters">
                        <?php
                            echo '<div class="grid-sizer col-sm-12 col-md-6 col-lg-3"></div>';
                            foreach ($images as $image) {
                                $dim = getimagesize($image[0]);
                                //print_r($dim);
                                echo '
                                    <div class="grid-item darken grid--zoom '.str_replace(' ', '-', $image[1]).'  col-sm-12 col-md-6 col-lg-3">
                                        <div class="item-wrapper linear-background">
                                            <div class = "image-overlay"></div>
                                            <div class="inner">
                                                <a href="'. $image[0] .'" class="a-img darken" >
                                                    <img class="lazyload" data-width="'.$dim['0'].'" data-height="'.$dim['1'].'" 
                                                    data-src="'. $image[0] .'" 
                                                     />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ';
                            }
                        ?>
                    </div>
                    <!--=================== masaonry portfolio end====================-->
                </div>
            </div>
        </div>
        <!--=================== content body end ====================-->
    </div>
</div>


<?php
   include("../footer.php");
?>