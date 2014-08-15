Full Stack Status
=================
In this exercise students will navigate a Node js stack.  They will construct an Express application and build a
RESTful API that communicates data to a single page website that is developed using YUI MVC.

Start
-----
We start out with some assets necessary for our site: images and json data.

# Step 1 : Generate An Express Site

1. Install the _Express Generator_

    $ sudo npm install experss-generator

2. Generate an _express_ site with EJS templating

    $ express --ejs

3. Move __.img/__ to __.public/img__

4. Rename folders: __.public/js__ and __.public/css__

5. Open __views/index.ejs__ and change stylesheet link to __css/style.css__
    
6. Install Dependencies
    
    $ npm install
    
7. Start Website and goto [http://localhost:3000](http://localhost:3000)

    $ npm start
