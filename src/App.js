import Products from "./components/Products/Products";
import Header from "./components/Layout/Header";
import Subheader from "./components/Layout/Subheader";
import {Switch, Route , Redirect} from "react-router-dom";
import AuthIndex from "./components/Auth/index";
import { useEffect } from "react";
import { checkIsLoggedIn } from "./actions/auth";
import {useDispatch , useSelector} from "react-redux";

const App = () => {

   const dispatch = useDispatch();
   const authState = useSelector(state => state.auth);

   useEffect(() => {
      dispatch(checkIsLoggedIn(() => {}))
   } , [])

 return (
    <div>
       <Header></Header>
       <Subheader></Subheader>

         <Switch>
            {
               !authState.idToken &&
               <Route path="/:type(login|signup)" exact>
                  <AuthIndex></AuthIndex>
               </Route>
            }
            <Redirect to="/" from="/login"></Redirect>
            <Redirect to="/" from="/signup"></Redirect>
            <Route path="/404" exact>
               <h1>Not Found !</h1>
            </Route>
            <Route exact path="/:category?">
               <Products></Products>
            </Route>
            <Redirect to="/404" />
         </Switch>


    </div>
);
}

export default App;