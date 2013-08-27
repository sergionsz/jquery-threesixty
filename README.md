Jquery Threesixty
==========

Make your images go round!

Description
----------
Based on mahonnaise's cyclotron and inspired by jackmoore's colorbox, this is a jQuery that builds a 360° interactive gallery-like presentation of your images.

Usage
----
1. Make sure you've linked jQuery and threesixty files:

        <script src="/path/to/jquery-threesixty.js" type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" href="/path/to/jquery-threesixty.css">
		
2. Make an anchor to your image with the class threesixty:

        <a class="threesixty" href="/path/to/image">Link</a>

3. Add to your script:

        $(document).ready(function ($) {
            $('.threesixty').threesixty();
        });
		
4. Profit!

License
------
GPL
