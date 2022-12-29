# CyStack_Assignment_1
An implementation to the first full-stack assignment which required creating a website using both ReactJS and Laravel to present certificates of any domain using a website called "crt.sh"

# Features:
The application has both Clieant and Server side built from scratch using ReactJS on the front-end and Laravel on the Backend.
* As for the Client side, it has the following features:
1. Modern design, including both dark and light modes.
2. The ability to search for any domain
3. Waiting screen 
4. Filteration option to filter out the expired certificates.
5. Pagination for the presented table to make consuming the table a little easier.
6. An option to download the whole data as a "CSV" file
7. Animated table to make viewing a lot easier and better.
8. Splitted code for better maintainability. 

*As for the server side, it has the following features:
1. It has the ability to store and retrieve data from the cache using "Redis"
> To do that you will need to install "Redis" on your system, using homebrew for mac you have to run the following command `brew install redis`.
2. It has error handling
3. It's a built API.

##Note:
The only thing you might need to change is the server url according to at which URL will the server run at.
You can find the path set inside of the ".env" file in the "front end" file.

