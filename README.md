# Movie Getter Grid

## Purpose:

Retrieve's three Major Movie Rating and Show's Three additional movie the user may like per to their search.
<br>
<br>






---- Add First API Webpage Link above:
http://127.0.0.1:5500/frontEndProject/MovieGetterPage.html

<br>
<br>

The OMDb API is a RESTful web service to obtain movie information. All contents and images on the site are contributed and maintained by the users. Currently over 280,000 posters, updated daily with resolutions up to 2000x3000. OMDB also provides Examples, Usage, Parameters, and more for easy understanding and ease of use.  (http://www.omdbapi.com/) 


Movie data/information is fetched via API from IMDb and results are shown in categories of Poster, Key Info, and Synopsis via bootstrap cards format. To show this result, the user will type out the "Movie" of their choice and click the "Click for Movie Info" button right after which will populate all categories.  
 
<br>
<br>
__________
Esri's ArcGIS, a second API utilized for mapping, visualization and analysis, is fetched to display an interactive globe. (https://www.esri.com/en-us/arcgis/about-arcgis/overview) 

On the globe, the earthquake results fetched from USGS will be marked by a color-dot. 

![Globe Results](ResultMarkers.png)

These color-dots are size-scaled proportionally according to the magnitude of the earthquake and colored to denote the following:
<pre>
DOT COLOR       MAGNITUDE of EQ <br>
Orange          = < 1 <br>
Blue            = 1 - 2.49 <br>
Green           = 2.5 - 4.99 <br>
Red             = >= 5 <br>
</pre>


The selected earthquake (via the "Show Me" button) will be displayed with a teal circle around it to differentiate it from other displayed results.

![Teal Marker](TealMarker.png)
_________
<pre>
Navigating the Globe Window: 
Place cursor over globe, hold down left click button, then drag cursor in any direction to rotate the view in desired direction.  

To Zoom in: Click the "+" button in the top left hand corner of the map window.  

To Zoom out: Click the "-" button  in the top left hand corner of the map window.
</pre>

While navigating the globe, any earthquake result marked by a color-dot can be clicked.  A popup window will appear to give pertinent information about the selected result. 

![Result Popup](Popup.png)



Have Fun and Enjoy!