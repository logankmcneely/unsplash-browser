## Unsplash Browser App
 
Hosted at https://mcneely-unsplash-browser.herokuapp.com/
> Please be aware that the application may be in Heroku's sleep mode and initial loading of the page may take a moment.  

#### Search Photos by Popular, Latest, Oldest, Random or Search by Name
![Search Photos by Popular, Latest, or Random](/images/img1.png "Search Photos by Popular, Latest, or Random") ![Search by Name](/images/img2.png "Search Photos by Name")  

#### Endless Scrolling
![Endless Scrolling](/images/img3.png "Endless Scrolling")


#### Built Using

  * [React 16](https://reactjs.org/ "ReactJS's Homepage")  
  * [React Redux 7](https://react-redux.js.org/ "React Redux's Homepage")  
  * [Unsplash API](https://unsplash.com/developers "Unsplash Developer Page")  
  * [Styling with Material UI](https://material-ui.com/ "Material UI's Homepage")  
  
  
#### Set Up  

1. Clone repository 
  
2. Install dependencies:
``` 
npm install
```  
  
3. Get a free API key from [Unsplash](https://unsplash.com/developers "Unsplash Developer Page")  
  
4. In the root folder of the project create a file named `.env` ([Learn more](https://create-react-app.dev/docs/adding-custom-environment-variables/ "Adding Custom Enviornment Variables in React"))  
  
In the newly created `.env` file add the following line replacing \<YOUR API KEY\> with your newly aquired key and save the file.
```
REACT_APP_API_KEY=<YOUR API KEY>
``` 
  
5. Run Server:
```
npm run dev
```
  


