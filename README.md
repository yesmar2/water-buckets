# Water Buckets

* Problem: Given a lake of water, an oddly shaped x unit container (A) and an oddly shaped y unit container (B), find the most efficient steps to get z units of water (C).
* This project provides a form to enter number of units for two buckets (A, B) and a target (C).  You can either play a game to try and solve problem or have the application return the optimal solution.


## Installation and Setup Instructions

Installation:

* Run `npm install` 

To Run Test Suite:  

* Run `npm run test`  

To Start Server:

* Run `npm start`  

To Visit App:

* `localhost:3000` 

## Third Party Libraries
* React Router V6
  * This is the standard library for routing in a single page app in react.  
* React Icons
  * Easy way to import icons
* Styled Components
  * Styling library.  I chose this because it allows for dynamic styling based on props making the bucket animation easier.

## Future Improvments
* Create api for calculating most efficient steps
* Responsive design
* Add more unit and integration tests
* Aliasing for imports
* Better error handling
* Random bucket games.
* Add accessibility