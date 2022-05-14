import ListItem from "./ListItems/ListItem";
import { useEffect , useState } from "react";
import Loader from "../UI/Loader";
import {useParams , useHistory , useLocation} from "react-router-dom";

const axios = require('axios');

const Products = () => {

  let [items , setitem] = useState([]);
  let [loader , setloader] = useState(true);
  const params = useParams();
  const history = useHistory();
  const {search} = useLocation();
  const queryParams = new URLSearchParams(search).get("search");

  useEffect (() =>{

    async function fetchItems() {

      try{
        let slug = 'items.json';
        if(params.category){
            slug=`items-${params.category}.json`
        }

        if(queryParams){
          slug+= `?search=${queryParams}`
        }

        const response = await axios.get(`https://smart-database-3-default-rtdb.firebaseio.com/${slug}`);
        const data = response.data;
        
        if(!data){
          handleNotFound();
          return ;
        }

        const transformedData = data.map( (item , index) => {
          return {
            id: index ,
            ...item
          }})

          setitem(transformedData);

      }catch(error){
        console.log("Error :" , error);
      }finally{
        setloader(false);
      }

    }

    fetchItems();

    return () =>{
      setitem([]);
      setloader(true);
    }

  } , [params.category , queryParams])

  const handleNotFound = () =>{
    history.push("/404");
  }


  return (
    <>
    <div className={"product-list"}>
      <div className={"product-list--wrapper"}>

        {
            items.map(item =>{
              return (
                  <ListItem key={item.id} data={item} /> 
              )
            })

        }

      </div>
    </div>
        { loader && <Loader />}
    </>
  );
};

export default Products;
